import { LessonLayout } from "@/components/ui/LessonLayout";
import { CharPolyExplorer } from "@/components/canvas/CharPolyExplorer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> stability analysis in control systems
        checks whether eigenvalues have negative real parts (system calms down) or
        positive ones (system blows up). Engineers solve the characteristic polynomial
        of a system matrix to find the stability threshold.
      </div>

      <p>
        We know eigenvectors satisfy <Math tex="A\mathbf{v} = \lambda\mathbf{v}" />.
        But how do we <em>find</em> λ? That's what the characteristic polynomial does.
      </p>

      <h2>Setting up the equation</h2>

      <p>
        Rewrite the eigenvector equation:
      </p>
      <Math tex="A\mathbf{v} = \lambda\mathbf{v}" block />
      <Math tex="A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}" block />
      <Math tex="(A - \lambda I)\mathbf{v} = \mathbf{0}" block />

      <p>
        For this to have a non-zero solution v, the matrix{" "}
        <Math tex="(A - \lambda I)" /> must be singular — i.e. its determinant
        must be zero:
      </p>
      <Math tex="\det(A - \lambda I) = 0" block />

      <h2>The characteristic polynomial</h2>

      <p>
        For a 2×2 matrix, expanding this determinant gives a quadratic:
      </p>
      <Math tex="\lambda^2 - \text{tr}(A)\,\lambda + \det(A) = 0" block />

      <p>
        The two solutions are the eigenvalues. The discriminant{" "}
        <Math tex="\Delta = \text{tr}(A)^2 - 4\det(A)" /> tells you whether
        they're real (Δ ≥ 0) or complex (Δ &lt; 0).
      </p>

      <div className="callout">
        Notice: λ₁ + λ₂ = tr(A) and λ₁ · λ₂ = det(A).
        These identities are always true — they're a quick sanity check.
      </div>

      <h2>Special cases</h2>

      <p>
        <strong>Symmetric matrices</strong> (A = Aᵀ) always have real eigenvalues.
        <br />
        <strong>Rotation matrices</strong> have complex eigenvalues — they rotate
        every direction so there's no real fixed direction.
        <br />
        <strong>Repeated eigenvalue</strong>: Δ = 0 means the matrix has one
        eigenvalue with multiplicity 2.
      </p>

      <h2>Try it</h2>

      <p>
        Edit the matrix on the right. The characteristic polynomial, discriminant,
        and eigenvalues all update live. Try to make the discriminant negative
        (complex eigenvalues) and positive (real eigenvalues).
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy — the polynomial route:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[3, 1], [1, 3]])
t = np.trace(A)       # 6
d = np.linalg.det(A)  # 8
# characteristic polynomial: λ² - 6λ + 8 = 0
roots = np.roots([1, -t, d])
print(roots)  # [4. 2.]`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 6: Eigenvalues"
      moduleSlug="06-eigenvalues"
      lessonTitle="The Characteristic Polynomial"
      lessonNumber="6.2"
      prev={{ href: "/lessons/eigenvalues/eigenvector-intuition", title: "Eigenvectors — the Intuition" }}
      next={{ href: "/lessons/eigenvalues/diagonalization", title: "Diagonalization" }}
      prose={<Prose />}
      canvas={<CharPolyExplorer />}
    />
  );
}
