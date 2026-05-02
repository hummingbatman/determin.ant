import { LessonLayout } from "@/components/ui/LessonLayout";
import { EigenvectorIntuition } from "@/components/canvas/EigenvectorIntuition";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> Google's original PageRank algorithm
        finds the eigenvector of a link matrix — the "most important" direction in the
        graph. PCA in ML finds eigenvectors of a covariance matrix. Quantum mechanics
        is entirely built on eigenstates. These are everywhere.
      </div>

      <p>
        Most vectors, when you apply a matrix to them, change both their length
        <em> and</em> their direction. But a few special vectors only change their
        length. Those are eigenvectors.
      </p>

      <h2>The key idea</h2>

      <p>
        An <strong>eigenvector</strong> of a matrix A is any non-zero vector v where:
      </p>
      <Math tex="A\mathbf{v} = \lambda \mathbf{v}" block />
      <p>
        Applying A to v gives back the same direction — just scaled by a number λ
        (the <strong>eigenvalue</strong>). The transformation stretches or flips
        the vector, but doesn't rotate it.
      </p>

      <h2>Visualizing it</h2>

      <p>
        Imagine shooting many arrows in all directions from the origin.
        Apply a matrix to all of them. Most will rotate. But a few will land
        on the same line they started on — those are the eigenvectors.
      </p>

      <p>
        If λ &gt; 1: the eigenvector gets stretched.<br />
        If 0 &lt; λ &lt; 1: it gets squashed.<br />
        If λ &lt; 0: it gets flipped and scaled.<br />
        If λ = 0: it gets sent to zero — this is the null space direction.
      </p>

      <div className="callout">
        Eigenvectors reveal the "natural axes" of a transformation — the directions
        along which the matrix is just multiplication.
      </div>

      <h2>Not always real</h2>

      <p>
        A rotation matrix has no real eigenvectors — it rotates <em>every</em> direction.
        The eigenvalues are complex numbers in that case. Try the rotation preset
        to see.
      </p>

      <h2>Try it</h2>

      <p>
        The interactive shows 16 radial vectors (faint) and their images (solid)
        after applying the matrix. The highlighted vectors are the eigenvectors —
        they land on the same line they started on.
      </p>

      <p>
        Pick a preset or edit the matrix. Watch which directions stay in place.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[3, 1], [1, 3]])
eigenvalues, eigenvectors = np.linalg.eig(A)
print(eigenvalues)    # [4., 2.]
print(eigenvectors)   # columns are the eigenvectors`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 6: Eigenvalues"
      moduleSlug="06-eigenvalues"
      lessonTitle="Eigenvectors — the Intuition"
      lessonNumber="6.1"
      prev={{ href: "/lessons/vector-spaces/rank", title: "Rank" }}
      next={{ href: "/lessons/eigenvalues/characteristic-polynomial", title: "The Characteristic Polynomial" }}
      prose={<Prose />}
      canvas={<EigenvectorIntuition />}
    />
  );
}
