import { LessonLayout } from "@/components/ui/LessonLayout";
import { SVDDecomposition } from "@/components/canvas/SVDDecomposition";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> SVD is behind image compression (JPEG-like
        low-rank approximations), recommender systems (Netflix-style matrix factorization),
        natural language processing (LSA/LSI), PCA, and pseudo-inverses.
        It's the most generally useful matrix decomposition in all of applied mathematics.
      </div>

      <p>
        Every matrix does something to space. SVD reveals the exact structure of that
        something: every matrix is secretly a rotation, then a stretch, then another rotation.
      </p>

      <h2>The decomposition</h2>

      <p>
        Every matrix A can be written as:
      </p>
      <Math tex="A = U \Sigma V^T" block />

      <p>
        Where:
      </p>
      <ul>
        <li><strong>Vᵀ</strong> is an orthogonal matrix (rotation/reflection in input space)</li>
        <li><strong>Σ</strong> is diagonal with non-negative entries (stretching)</li>
        <li><strong>U</strong> is an orthogonal matrix (rotation/reflection in output space)</li>
      </ul>

      <h2>The singular values</h2>

      <p>
        The diagonal entries σ₁ ≥ σ₂ ≥ ... ≥ 0 of Σ are the <strong>singular values</strong>.
        They tell you how much the matrix stretches space in each direction.
        A singular value of 0 means that direction collapses — that's a rank deficiency.
      </p>

      <div className="callout">
        Think of A as doing three things in sequence to the unit circle:
        <br />1. Vᵀ rotates the circle (still a circle)
        <br />2. Σ stretches it into an ellipse
        <br />3. U rotates that ellipse
        <br />
        The final shape is an ellipse with semi-axes σ₁ and σ₂.
      </div>

      <h2>How it differs from eigendecomposition</h2>

      <p>
        Eigendecomposition only exists for square matrices and fails when eigenvalues
        are complex. SVD works for <em>any</em> matrix — rectangular, singular,
        complex. The singular values are always real and non-negative.
      </p>

      <h2>Try it</h2>

      <p>
        The four panels show the unit circle being transformed step by step.
        Use the sliders to adjust the two rotation angles and two singular values.
        Notice: the final shape depends only on σ₁ and σ₂ (the ellipse's size),
        while U and V control the orientation.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[2., 1.], [0., 1.5]])

# U: left singular vectors (columns)
# s: singular values (σ₁, σ₂)
# Vh: right singular vectors (rows = Vᵀ)
U, s, Vh = np.linalg.svd(A)

print(s)                         # [2.35, 1.06] — singular values
print(np.allclose(U @ np.diag(s) @ Vh, A))  # True`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 8: SVD"
      moduleSlug="08-svd"
      lessonTitle="Rotate, Stretch, Rotate"
      lessonNumber="8.1"
      prev={{ href: "/lessons/orthogonality/least-squares", title: "Least Squares" }}
      next={{ href: "/lessons/svd/svd-explorer", title: "SVD Explorer" }}
      prose={<Prose />}
      canvas={<SVDDecomposition />}
    />
  );
}
