import { LessonLayout } from "@/components/ui/LessonLayout";
import { PositiveDefiniteVisualizer } from "@/components/canvas/PositiveDefiniteVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> gradient descent converges when the
        Hessian matrix (second derivatives of the loss function) is positive definite —
        the loss landscape is bowl-shaped everywhere. Covariance matrices in statistics
        and the Gram matrix in kernel methods are always positive semi-definite.
        It's one of the most checked properties in optimization.
      </div>

      <p>
        Positive definiteness is eigenvalues meeting a sign condition — and it has
        profound geometric consequences.
      </p>

      <h2>The definition</h2>

      <p>
        A symmetric matrix A is <strong>positive definite</strong> (PD) if for every
        non-zero vector x:
      </p>
      <Math tex="\mathbf{x}^T A \mathbf{x} > 0" block />

      <p>
        The expression <Math tex="\mathbf{x}^T A \mathbf{x}" /> is called a{" "}
        <strong>quadratic form</strong>. It assigns a scalar to every point in space.
      </p>

      <h2>The eigenvalue test</h2>

      <p>
        A symmetric matrix is positive definite if and only if all its eigenvalues
        are strictly positive. This gives the full classification:
      </p>
      <ul>
        <li><strong>PD</strong>: all λ &gt; 0 — quadratic form is always positive (bowl)</li>
        <li><strong>PSD</strong>: all λ ≥ 0 — non-negative (flat bowl, touches zero)</li>
        <li><strong>Indefinite</strong>: mixed signs — saddle shape (some positive, some negative)</li>
        <li><strong>ND</strong>: all λ &lt; 0 — always negative (inverted bowl)</li>
      </ul>

      <div className="callout">
        PD = bowl-shaped = unique minimum. This is why gradient descent works:
        if the Hessian is PD, the loss has exactly one minimum and descent always converges.
      </div>

      <h2>Connection to Cholesky decomposition</h2>

      <p>
        Every positive definite matrix has a Cholesky decomposition:{" "}
        <Math tex="A = LL^T" /> where L is lower triangular. This is the "square root"
        of a matrix and is used extensively in statistics (sampling from a Gaussian)
        and numerical solvers (it's twice as fast as LU for symmetric systems).
      </p>

      <h2>Try it</h2>

      <p>
        The heatmap shows the quadratic form xᵀAx — how positive or negative the
        value is at each point. Blue/green = positive, red = negative.
        Use the presets or edit the matrix. A positive definite matrix produces
        a pure green bowl. An indefinite matrix produces a saddle.
      </p>

      <div className="callout callout-cs">
        <strong>Checking in NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np

A = np.array([[3., 1.], [1., 2.]])
eigenvalues = np.linalg.eigvalsh(A)  # for symmetric matrices
print(all(eigenvalues > 0))  # True — positive definite

# Cholesky decomposition (only works for PD)
L = np.linalg.cholesky(A)
print(np.allclose(L @ L.T, A))  # True`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 6: Eigenvalues"
      moduleSlug="06-eigenvalues"
      lessonTitle="Positive Definite Matrices"
      lessonNumber="6.5"
      prev={{ href: "/lessons/eigenvalues/diagonalization", title: "Diagonalization" }}
      next={{ href: "/lessons/eigenvalues/markov-chains", title: "Markov Chains" }}
      prose={<Prose />}
      canvas={<PositiveDefiniteVisualizer />}
    />
  );
}
