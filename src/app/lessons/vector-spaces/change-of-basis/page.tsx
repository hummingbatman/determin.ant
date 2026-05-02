import { LessonLayout } from "@/components/ui/LessonLayout";
import { ChangeBasisVisualizer } from "@/components/canvas/ChangeBasisVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every time a 3D engine transforms
        a model from "object space" to "world space" to "camera space" to "screen space,"
        it's doing change-of-basis operations. PCA also works by changing to the
        basis of eigenvectors of the covariance matrix — suddenly the data looks like
        independent, axis-aligned components.
      </div>

      <p>
        A vector exists independently of any coordinate system. When you write [3, 2],
        you've implicitly chosen a basis. Change the basis, and the same vector gets
        different numbers — but the arrow in space doesn't move.
      </p>

      <h2>The formula</h2>

      <p>
        If your new basis vectors are the columns of matrix P, then the coordinates
        of vector v in the new basis are:
      </p>
      <Math tex="\mathbf{v}_{\text{new}} = P^{-1} \mathbf{v}_{\text{standard}}" block />

      <p>
        And to convert back: <Math tex="\mathbf{v}_{\text{standard}} = P \mathbf{v}_{\text{new}}" />.
        P converts from new-basis coordinates to standard coordinates.
        P⁻¹ converts the other way.
      </p>

      <h2>Why it matters: similarity</h2>

      <p>
        Two matrices A and B represent the <em>same</em> linear transformation in
        different bases when:
      </p>
      <Math tex="B = P^{-1} A P" block />

      <p>
        This is called a <strong>similarity transformation</strong>. Diagonalization
        is exactly this — finding a basis (the eigenvector basis) where the matrix
        becomes diagonal.
      </p>

      <div className="callout">
        Coordinates are just names for a vector in a particular language.
        Change of basis is switching languages — the object stays the same,
        only the description changes.
      </div>

      <h2>A key insight</h2>

      <p>
        The standard basis [1,0] and [0,1] is just one choice. Any two independent
        vectors form a valid basis. Picking the <em>right</em> basis — one aligned
        with the structure of your problem — often makes computations dramatically
        simpler. Eigenvectors, singular vectors, and Fourier modes are all "right"
        bases for specific problems.
      </p>

      <h2>Try it</h2>

      <p>
        Drag e₁ and e₂ to change the basis. The faint grid shows the new coordinate
        lines. Drag v to move the vector. Notice: [3, 2] in standard coordinates
        becomes something completely different in the new basis — same arrow, new numbers.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np

# New basis vectors as columns of P
P = np.array([[2., 1.], [0., 2.]])

v_standard = np.array([4., 2.])

# Convert to new basis
v_new = np.linalg.solve(P, v_standard)
print(v_new)  # coordinates in new basis

# Convert back
print(P @ v_new)  # should recover v_standard`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 5: Vector Spaces"
      moduleSlug="05-vector-spaces"
      lessonTitle="Change of Basis"
      lessonNumber="5.5"
      prev={{ href: "/lessons/vector-spaces/rank-nullity", title: "Rank-Nullity Theorem" }}
      next={{ href: "/lessons/eigenvalues/eigenvector-intuition", title: "Eigenvectors — the Intuition" }}
      prose={<Prose />}
      canvas={<ChangeBasisVisualizer />}
    />
  );
}
