import { LessonLayout } from "@/components/ui/LessonLayout";
import { ImageCompression } from "@/components/canvas/ImageCompression";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> Netflix's early recommendation engine
        was built on SVD of a user–movie rating matrix. The low-rank approximation
        captures the dominant patterns (genre taste, mood preferences) while ignoring
        noise. The same idea applies to image compression, document retrieval, and
        genomics data.
      </div>

      <p>
        SVD isn't just for decomposing matrices — it lets you throw away the
        unimportant parts and keep only the structure that matters.
      </p>

      <h2>Low-rank approximation</h2>

      <p>
        Any matrix can be written as a sum of rank-1 matrices:
      </p>
      <Math tex="A = \sigma_1 \mathbf{u}_1 \mathbf{v}_1^T + \sigma_2 \mathbf{u}_2 \mathbf{v}_2^T + \cdots" block />

      <p>
        Each term <Math tex="\sigma_i \mathbf{u}_i \mathbf{v}_i^T" /> is a
        rank-1 matrix — an outer product scaled by the singular value.
        The singular values are sorted largest-first, so the first few terms
        capture the most "energy" in the matrix.
      </p>

      <h2>Truncated SVD</h2>

      <p>
        Keep only the first k terms and you get the <strong>rank-k approximation</strong>:
      </p>
      <Math tex="A_k = \sum_{i=1}^{k} \sigma_i \mathbf{u}_i \mathbf{v}_i^T" block />

      <p>
        By the Eckart–Young theorem, Aₖ is the <em>closest</em> rank-k matrix to A
        (in Frobenius norm). There's no better way to compress a matrix to rank k.
      </p>

      <h2>Storage savings</h2>

      <p>
        An m×n matrix has mn values. A rank-k approximation stores k copies of
        (u vector, v vector, σ scalar) = k(m + n + 1) values.
        For large matrices with small k, the savings are dramatic.
      </p>

      <div className="callout">
        An image is a matrix of pixel values. A rank-k approximation captures the
        k dominant "patterns" in the image. Low k = blurry but much smaller.
        High k = sharp but large. The tradeoff is always quality vs. size.
      </div>

      <h2>Try it</h2>

      <p>
        The interactive shows an 8×8 grayscale matrix treated as an image.
        The slider adds more rank-1 pieces. At rank 1 you see the roughest structure;
        by full rank it's exact. Watch how quickly the approximation improves
        with each additional piece.
      </p>

      <div className="callout callout-cs">
        <strong>Image compression via truncated SVD:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np

# img is an m×n grayscale matrix
U, s, Vh = np.linalg.svd(img, full_matrices=False)

def compress(k):
    return U[:, :k] @ np.diag(s[:k]) @ Vh[:k, :]

# k=10 often retains most of the visual quality
approx = compress(10)
compression_ratio = (img.size) / (k * (U.shape[0] + Vh.shape[1] + 1))`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 8: SVD"
      moduleSlug="08-svd"
      lessonTitle="Image Compression"
      lessonNumber="8.4"
      prev={{ href: "/lessons/svd/matrix-norms", title: "Matrix Norms" }}
      prose={<Prose />}
      canvas={<ImageCompression />}
    />
  );
}
