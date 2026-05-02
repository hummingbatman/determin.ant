import { LessonLayout } from "@/components/ui/LessonLayout";
import { MatrixNorms } from "@/components/canvas/MatrixNorms";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> gradient clipping in deep learning
        uses the Frobenius norm to limit weight updates. Regularization terms (L2,
        weight decay) penalize the Frobenius norm of weight matrices. The spectral
        norm of a layer controls its Lipschitz constant — critical for GANs and
        robust models.
      </div>

      <p>
        A norm measures the "size" of a mathematical object. For vectors we have
        the Euclidean norm. For matrices, there are several useful choices,
        each emphasizing different aspects of size.
      </p>

      <h2>Frobenius norm</h2>

      <p>
        The simplest matrix norm: treat the matrix as a long vector and take the
        Euclidean norm of its entries:
      </p>
      <Math tex="\|A\|_F = \sqrt{\sum_{i,j} a_{ij}^2} = \sqrt{\text{tr}(A^T A)} = \sqrt{\sigma_1^2 + \sigma_2^2 + \cdots}" block />

      <p>
        The last equality links it to SVD: the Frobenius norm is the Euclidean norm
        of the singular values. It's easy to compute and differentiable everywhere.
      </p>

      <h2>Spectral norm (operator 2-norm)</h2>

      <p>
        The spectral norm is the largest factor by which A can stretch any vector:
      </p>
      <Math tex="\|A\|_2 = \max_{\mathbf{x} \neq 0} \frac{\|A\mathbf{x}\|}{\|\mathbf{x}\|} = \sigma_1" block />

      <p>
        It equals the largest singular value. Geometrically, it's the semi-major axis
        of the ellipse that A maps the unit circle to.
      </p>

      <div className="callout">
        The spectral norm is the "worst case" amplification. If ‖A‖₂ = 5,
        some input gets stretched by a factor of 5. No input gets stretched more.
      </div>

      <h2>Induced 1-norm and ∞-norm</h2>

      <p>
        <Math tex="\|A\|_1" /> = maximum absolute column sum.{" "}
        <Math tex="\|A\|_\infty" /> = maximum absolute row sum.
        These are cheaper to compute than the spectral norm but less geometrically meaningful.
      </p>

      <h2>The submultiplicative property</h2>

      <p>
        All matrix norms satisfy <Math tex="\|AB\| \leq \|A\| \cdot \|B\|" />.
        This is crucial for bounding errors in matrix computations — errors don't
        compound faster than the product of norms.
      </p>

      <h2>Try it</h2>

      <p>
        Edit the matrix. The green ellipse shows where A maps the unit circle.
        The blue dashed circle has radius ‖A‖₂ — the spectral norm.
        The table shows all four norms updating live.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[2., 1.], [0.5, 1.5]])

print(np.linalg.norm(A, 'fro'))  # Frobenius
print(np.linalg.norm(A, 2))      # Spectral (= largest singular value)
print(np.linalg.norm(A, 1))      # Max column sum
print(np.linalg.norm(A, np.inf)) # Max row sum

# Spectral norm via SVD
s = np.linalg.svd(A, compute_uv=False)
print(s[0])  # same as norm(A, 2)`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 8: SVD"
      moduleSlug="08-svd"
      lessonTitle="Matrix Norms"
      lessonNumber="8.3"
      prev={{ href: "/lessons/svd/svd-explorer", title: "SVD Explorer" }}
      next={{ href: "/lessons/svd/image-compression", title: "Image Compression" }}
      prose={<Prose />}
      canvas={<MatrixNorms />}
    />
  );
}
