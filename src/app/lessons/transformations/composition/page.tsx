import { LessonLayout } from "@/components/ui/LessonLayout";
import { CompositionVisualizer } from "@/components/canvas/CompositionVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> a 3D game applies a chain of transformations
        to every object each frame — scale it, rotate it, translate it into world space,
        then into camera space. All of those are multiplied into one matrix so the GPU
        only does one operation per vertex. Composition is how that chain is built.
      </div>

      <p>
        You can apply one transformation after another. First rotate the grid,
        then stretch it. The combined effect is itself a linear transformation —
        and it has its own matrix.
      </p>

      <h2>Matrix multiplication = applying two transformations</h2>

      <p>
        If <Math tex="A" /> is the first transformation and <Math tex="B" /> is the
        second, the composition is written <Math tex="BA" /> — <em>B after A</em>.
        The order matters: rotate-then-scale is not the same as scale-then-rotate.
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="(B \circ A)\,\mathbf{v} = B(A\mathbf{v})" block />
      </div>

      <p>
        Read right-to-left: apply <Math tex="A" /> to the vector first, then apply
        <Math tex="B" /> to the result. The combined matrix <Math tex="BA" /> stores
        that whole process in one object.
      </p>

      <h2>Why order matters</h2>

      <p>
        Consider rotating 90° then scaling x by 2, versus scaling x by 2 then rotating 90°.
        Try swapping A and B in the interactive — you'll get a different grid each time.
        In matrix terms: <Math tex="BA \neq AB" /> in general.
      </p>

      <div className="callout">
        Matrix multiplication is <strong>not commutative</strong>. This surprises
        people who are used to regular numbers where <Math tex="3 \times 5 = 5 \times 3" />.
        With matrices, the order you multiply them in is the order the transformations happen.
      </div>

      <h2>Determinants multiply</h2>

      <p>
        There's a clean rule for area scaling: the determinant of a product equals
        the product of the determinants.
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\det(BA) = \det(B) \cdot \det(A)" block />
      </div>

      <p>
        If A doubles area and B triples it, BA scales area by 6. Watch the
        determinant readout below the matrices as you change presets.
      </p>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

A = np.array([[0, -1], [1,  0]])  # rotate 90°
B = np.array([[2,  0], [0,  1]])  # scale x by 2

# Apply A first, then B
BA = B @ A
v = np.array([1, 0])
print(BA @ v)   # same as B @ (A @ v)`}</code></pre>
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}>
          In NumPy, <code>B @ A</code> computes the composed matrix.
          Note that <code>A @ B</code> gives a different result.
        </p>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 2: Transformations"
      moduleSlug="02-transformations"
      lessonTitle="Composition"
      lessonNumber="2.3"
      prev={{ href: "/lessons/transformations/matrices-as-transformations", title: "Matrices as Transformations" }}
      next={{ href: "/lessons/transformations/transformation-zoo", title: "The Transformation Zoo" }}
      prose={<Prose />}
      canvas={<CompositionVisualizer />}
    />
  );
}
