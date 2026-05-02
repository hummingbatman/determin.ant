import { LessonLayout } from "@/components/ui/LessonLayout";
import { GramSchmidtVisualizer } from "@/components/canvas/GramSchmidtVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> QR decomposition — used in numerical
        linear algebra, least squares solvers, and eigenvalue algorithms — is essentially
        Gram-Schmidt. Every time you call <code>np.linalg.qr</code>, Gram-Schmidt
        (or a numerically stable version) is running under the hood.
      </div>

      <p>
        Given any set of linearly independent vectors, Gram-Schmidt produces
        an orthonormal basis — vectors that are all perpendicular to each other
        and all have length 1.
      </p>

      <h2>Why orthonormal bases are useful</h2>

      <p>
        An orthonormal basis is the coordinate system equivalent of a clean desk.
        Calculations become much simpler:
      </p>
      <ul>
        <li>Coordinates are just dot products: <Math tex="\alpha_i = \mathbf{v} \cdot \mathbf{e}_i" /></li>
        <li>Projections are trivial</li>
        <li>The inverse of an orthogonal matrix is its transpose: <Math tex="Q^{-1} = Q^T" /></li>
      </ul>

      <h2>The algorithm</h2>

      <p>
        Given two vectors u and v:
      </p>
      <ol>
        <li>Normalize u: <Math tex="\mathbf{e}_1 = \mathbf{u}/|\mathbf{u}|" /></li>
        <li>Remove the e₁ component from v: <Math tex="\mathbf{v}' = \mathbf{v} - (\mathbf{v} \cdot \mathbf{e}_1)\mathbf{e}_1" /></li>
        <li>Normalize the remainder: <Math tex="\mathbf{e}_2 = \mathbf{v}'/|\mathbf{v}'|" /></li>
      </ol>

      <p>
        Now e₁ and e₂ are unit vectors and e₁ · e₂ = 0. They form an orthonormal basis
        for the same subspace that u and v spanned.
      </p>

      <div className="callout">
        Step 2 is just projection: you're subtracting the projection of v onto e₁.
        What's left is automatically perpendicular to e₁.
      </div>

      <h2>In higher dimensions</h2>

      <p>
        The same process extends to n vectors: at each step, subtract projections
        onto all previously computed basis vectors, then normalize.
      </p>

      <h2>Try it</h2>

      <p>
        Drag the input vectors u and v (faint arrows). The solid arrows are the
        Gram-Schmidt output e₁ and e₂ — always perpendicular, always length 1
        (shown scaled up for visibility). The yellow dashed line is the projection
        that gets subtracted in step 2.
      </p>

      <div className="callout callout-cs">
        <strong>QR decomposition = Gram-Schmidt:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[3., 1.], [1., 3.]])

# Q has orthonormal columns (Gram-Schmidt result)
# R is upper triangular
Q, R = np.linalg.qr(A)

print(Q)                          # orthonormal columns
print(Q.T @ Q)                    # ≈ identity
print(np.allclose(Q @ R, A))      # True`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 7: Orthogonality"
      moduleSlug="07-orthogonality"
      lessonTitle="Gram-Schmidt"
      lessonNumber="7.3"
      prev={{ href: "/lessons/orthogonality/projection", title: "Projection" }}
      next={{ href: "/lessons/orthogonality/least-squares", title: "Least Squares" }}
      prose={<Prose />}
      canvas={<GramSchmidtVisualizer />}
    />
  );
}
