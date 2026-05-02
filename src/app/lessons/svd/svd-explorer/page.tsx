import { LessonLayout } from "@/components/ui/LessonLayout";
import { SVDExplorer } from "@/components/canvas/SVDExplorer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> the condition number σ₁/σ₂ tells
        you how numerically sensitive a matrix is. A high condition number means
        tiny input changes can cause huge output changes — a red flag for
        solving linear systems. Engineers and scientists check condition numbers
        before trusting any numerical result.
      </div>

      <p>
        Now that you understand the structure of SVD, let's use it as a diagnostic tool.
        The singular values reveal everything important about a matrix.
      </p>

      <h2>Reading the SVD</h2>

      <p>
        Given <Math tex="A = U \Sigma V^T" />:
      </p>
      <ul>
        <li>The columns of V are the <strong>right singular vectors</strong> — the "input" axes</li>
        <li>The columns of U are the <strong>left singular vectors</strong> — the "output" axes</li>
        <li>σ₁ ≥ σ₂ ≥ 0 are the singular values — the stretch factors</li>
      </ul>

      <p>
        A applies the transformation by: rotate input via Vᵀ, stretch by Σ, rotate output by U.
        The singular vectors tell you the directions of maximum and minimum stretch.
      </p>

      <h2>Singular values and rank</h2>

      <p>
        The rank of A equals the number of nonzero singular values.
        A rank-1 matrix has σ₂ = 0 — the transformation collapses to a line.
        Rank-2 (full rank) has both σ₁, σ₂ &gt; 0.
      </p>

      <h2>The condition number</h2>

      <p>
        The condition number <Math tex="\kappa(A) = \sigma_1 / \sigma_2" /> measures
        how "near-singular" a matrix is. If κ is large, small errors in b can
        cause large errors in the solution of Ax = b.
      </p>

      <div className="callout">
        The image of the unit circle under A is an ellipse with semi-axes σ₁ and σ₂.
        The condition number is literally the aspect ratio of that ellipse.
      </div>

      <h2>Try it</h2>

      <p>
        Edit the matrix. The dashed circle shows the unit circle (all inputs of
        length 1). The green ellipse shows where those inputs map to.
        The blue and pink arrows are the singular value directions.
        Make σ₂ near zero to collapse the ellipse to a line.
      </p>

      <div className="callout callout-cs">
        <strong>Pseudoinverse via SVD:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[2., 1.], [0., 1.5]])
U, s, Vh = np.linalg.svd(A)

# Pseudoinverse: V @ Σ⁺ @ Uᵀ
S_inv = np.diag(1.0 / s)
A_pinv = Vh.T @ S_inv @ U.T

# Same as:
print(np.allclose(A_pinv, np.linalg.pinv(A)))  # True`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 8: SVD"
      moduleSlug="08-svd"
      lessonTitle="SVD Explorer"
      lessonNumber="8.2"
      prev={{ href: "/lessons/svd/rotate-stretch-rotate", title: "Rotate, Stretch, Rotate" }}
      next={{ href: "/lessons/svd/matrix-norms", title: "Matrix Norms" }}
      prose={<Prose />}
      canvas={<SVDExplorer />}
    />
  );
}
