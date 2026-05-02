import { LessonLayout } from "@/components/ui/LessonLayout";
import { ProjectionVisualizer } from "@/components/canvas/ProjectionVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every shadow is a projection.
        More practically: in computer graphics, projecting 3D scenes onto a 2D screen
        is literally a matrix projection. In signal processing, projecting onto a
        frequency basis decomposes a signal. In ML, PCA projects data onto its
        principal components.
      </div>

      <p>
        Projection answers a simple question: given a vector a and a direction b,
        what is the component of a <em>along</em> b?
      </p>

      <h2>The formula</h2>

      <p>
        The projection of a onto b is:
      </p>
      <Math tex="\text{proj}_{\mathbf{b}}(\mathbf{a}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\mathbf{b} \cdot \mathbf{b}} \mathbf{b}" block />

      <p>
        Read this as: "how much of a points in the b direction, times the b direction."
        The scalar <Math tex="\frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{b}|^2}" /> is
        how far along b the foot of the perpendicular falls.
      </p>

      <h2>The perpendicular component</h2>

      <p>
        Every vector splits cleanly into two perpendicular parts:
      </p>
      <Math tex="\mathbf{a} = \underbrace{\text{proj}_{\mathbf{b}}(\mathbf{a})}_{\text{along } \mathbf{b}} + \underbrace{(\mathbf{a} - \text{proj}_{\mathbf{b}}(\mathbf{a}))}_{\perp \text{ to } \mathbf{b}}" block />

      <p>
        The remainder <Math tex="\mathbf{a} - \text{proj}_{\mathbf{b}}(\mathbf{a})" /> is
        always perpendicular to b. You can verify: take the dot product — it's zero.
      </p>

      <div className="callout">
        Projection decomposes a vector into "what's in this direction" and
        "what's left over." The left-over part is always perpendicular to the
        projection direction.
      </div>

      <h2>Projection onto a subspace</h2>

      <p>
        This generalizes: you can project onto a plane, or any subspace.
        The projection matrix is <Math tex="P = A(A^T A)^{-1} A^T" />.
        Applying P to any vector gives its component in the subspace.
      </p>

      <h2>Try it</h2>

      <p>
        Drag vector a (blue) and direction b (pink). The green arrow shows the projection.
        The dashed purple line is the perpendicular remainder. Notice that as a approaches
        the b direction, the projection equals a; when a is perpendicular to b,
        the projection is zero.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
a = np.array([3.0, 3.0])
b = np.array([4.0, 1.0])

scalar = np.dot(a, b) / np.dot(b, b)
proj = scalar * b
perp = a - proj

print(proj)               # projection along b
print(np.dot(perp, b))    # ~0 — perpendicular check`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 7: Orthogonality"
      moduleSlug="07-orthogonality"
      lessonTitle="Projection"
      lessonNumber="7.2"
      prev={{ href: "/lessons/orthogonality/dot-product", title: "Dot Product" }}
      next={{ href: "/lessons/orthogonality/gram-schmidt", title: "Gram-Schmidt" }}
      prose={<Prose />}
      canvas={<ProjectionVisualizer />}
    />
  );
}
