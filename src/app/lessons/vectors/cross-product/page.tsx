import { LessonLayout } from "@/components/ui/LessonLayout";
import { CrossProductVisualizer } from "@/components/canvas/CrossProductVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every surface normal in 3D graphics is
        a cross product. When a game engine shades a polygon, it computes the normal
        vector by crossing two edges — then uses the dot product with the light direction
        to get brightness. Physics engines use cross products for torque and angular momentum.
      </div>

      <p>
        The dot product takes two vectors and gives a scalar. The cross product takes
        two vectors and gives a new vector — perpendicular to both.
      </p>

      <h2>The 2D version first</h2>

      <p>
        In 2D, the "cross product" of vectors a = [a₁, a₂] and b = [b₁, b₂] gives a
        scalar — the z-component of the 3D result:
      </p>
      <Math tex="a \times b = a_1 b_2 - a_2 b_1" block />

      <p>
        This is exactly the determinant of the 2×2 matrix with a and b as rows.
        Its absolute value is the <strong>area of the parallelogram</strong> spanned by a and b.
        The sign tells you orientation: positive means b is counter-clockwise from a,
        negative means clockwise.
      </p>

      <h2>The 3D cross product</h2>

      <p>
        In 3D, with a = [a₁, a₂, a₃] and b = [b₁, b₂, b₃]:
      </p>
      <Math tex="\mathbf{a} \times \mathbf{b} = \begin{bmatrix} a_2 b_3 - a_3 b_2 \\ a_3 b_1 - a_1 b_3 \\ a_1 b_2 - a_2 b_1 \end{bmatrix}" block />

      <p>
        The result is a vector perpendicular to both a and b. Its magnitude equals the
        area of the parallelogram: <Math tex="|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}||\mathbf{b}|\sin\theta" />.
      </p>

      <div className="callout">
        <strong>Right-hand rule:</strong> point your fingers along a, curl them toward b.
        Your thumb points in the direction of a × b. If b is clockwise from a, the
        cross product points into the screen; counter-clockwise means out of the screen.
      </div>

      <h2>Key properties</h2>

      <ul>
        <li>Anti-commutative: <Math tex="\mathbf{a} \times \mathbf{b} = -\mathbf{b} \times \mathbf{a}" /></li>
        <li>Parallel vectors: <Math tex="\mathbf{a} \times \mathbf{b} = \mathbf{0}" /> (zero area)</li>
        <li>Always perpendicular: <Math tex="(\mathbf{a} \times \mathbf{b}) \cdot \mathbf{a} = 0" /></li>
      </ul>

      <h2>Try it</h2>

      <p>
        Drag the vectors. The shaded parallelogram's area equals |a × b|.
        The purple arrow shows which way the 3D cross product points (out of or into the screen).
        Make the vectors parallel — the area goes to zero.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
a = np.array([3, 0, 0])
b = np.array([1, 2, 0])

cross = np.cross(a, b)
print(cross)         # [0, 0, 6] — points in z direction
print(np.linalg.norm(cross))  # 6.0 — area of parallelogram

# Surface normal for triangle with vertices p1, p2, p3:
normal = np.cross(p2 - p1, p3 - p1)
unit_normal = normal / np.linalg.norm(normal)`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 1: Vectors"
      moduleSlug="01-vectors"
      lessonTitle="Cross Product"
      lessonNumber="1.7"
      prev={{ href: "/lessons/vectors/linear-independence", title: "Linear Independence" }}
      next={{ href: "/lessons/transformations/what-is-a-transformation", title: "What is a Transformation?" }}
      prose={<Prose />}
      canvas={<CrossProductVisualizer />}
    />
  );
}
