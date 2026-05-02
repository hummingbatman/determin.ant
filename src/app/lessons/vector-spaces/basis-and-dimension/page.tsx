import { LessonLayout } from "@/components/ui/LessonLayout";
import { BasisExplorer } from "@/components/canvas/BasisExplorer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every coordinate system you've ever used is
        secretly a basis. GPS uses latitude/longitude (one basis). A 3D game engine uses
        x/y/z world coordinates (another). Computer graphics constantly switches between
        bases — model space, world space, camera space, screen space.
      </div>

      <p>
        You've been working with vectors in terms of the standard axes: right and up.
        But those axes aren't special — they're just a convenient choice. Any two
        non-parallel vectors can serve as a basis.
      </p>

      <h2>What is a basis?</h2>

      <p>
        A <strong>basis</strong> for ℝ² is a set of two vectors where:
      </p>
      <ul>
        <li>They are <strong>linearly independent</strong> — neither is a scalar multiple of the other</li>
        <li>They <strong>span</strong> ℝ² — you can reach any point using linear combinations of them</li>
      </ul>

      <p>
        The standard basis is <Math tex="\mathbf{e}_1 = [1, 0]" /> and{" "}
        <Math tex="\mathbf{e}_2 = [0, 1]" />. But <Math tex="[2, 1]" /> and{" "}
        <Math tex="[0, 3]" /> also form a valid basis — just a tilted, stretched one.
      </p>

      <h2>Coordinates are relative</h2>

      <p>
        When we say a vector is <Math tex="[3, 2]" />, we mean: 3 steps in the e₁
        direction, 2 steps in the e₂ direction. Change the basis, and the same
        <em> physical arrow</em> gets different coordinates.
      </p>

      <div className="callout">
        The vector hasn't changed — only our ruler has. The coordinates are always
        relative to a basis.
      </div>

      <h2>Dimension</h2>

      <p>
        The <strong>dimension</strong> of a space is the number of vectors in any
        basis for it. ℝ² has dimension 2. ℝ³ has dimension 3. A line through
        the origin has dimension 1 — one vector spans it.
      </p>

      <p>
        A key fact: every basis for ℝ² has <em>exactly</em> 2 vectors. You can't
        span the plane with 1 vector, and 3 vectors are always redundant (one is
        a combination of the others).
      </p>

      <h2>Try it</h2>

      <p>
        Drag the blue and pink vectors to change the basis.
        The purple vector <strong>v</strong> is always expressed as a combination of
        the two basis vectors — watch the coefficients update.
      </p>

      <p>
        Now try dragging e₁ and e₂ on top of each other.
        The basis becomes degenerate: they no longer span the plane.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong> a change of basis is just a matrix multiply.
        If <code>P</code> contains your basis vectors as columns,
        then <code>P_inv @ v</code> gives v's coordinates in the new basis.
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
P = np.array([[2, 0], [1, 3]])  # columns = basis vectors
v = np.array([4, 3])
coords = np.linalg.solve(P, v)  # coordinates in new basis
print(coords)  # [2, 0.33...]`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 5: Vector Spaces"
      moduleSlug="05-vector-spaces"
      lessonTitle="Basis and Dimension"
      lessonNumber="5.1"
      prev={{ href: "/lessons/determinants/invertibility", title: "Invertibility" }}
      next={{ href: "/lessons/vector-spaces/column-null-row-space", title: "Column, Null, and Row Space" }}
      prose={<Prose />}
      canvas={<BasisExplorer />}
    />
  );
}
