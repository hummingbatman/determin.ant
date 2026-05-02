import { LessonLayout } from "@/components/ui/LessonLayout";
import { DiagonalizationVisualizer } from "@/components/canvas/DiagonalizationVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> computing matrix powers efficiently.
        To find A¹⁰⁰ directly would be 99 matrix multiplications. Via diagonalization,
        A¹⁰⁰ = P D¹⁰⁰ P⁻¹, and D¹⁰⁰ is trivial — just raise each diagonal entry to
        the 100th power. This powers Markov chains, population models, and graph analysis.
      </div>

      <p>
        Diagonalization is the process of expressing a matrix in its "natural coordinate
        system" — aligned with the eigenvectors — where it becomes as simple as possible.
      </p>

      <h2>The decomposition</h2>

      <p>
        If A has n linearly independent eigenvectors{" "}
        <Math tex="\mathbf{v}_1, \mathbf{v}_2" />, then:
      </p>
      <Math tex="A = P D P^{-1}" block />
      <p>
        where P has the eigenvectors as columns, and D is diagonal with eigenvalues:
      </p>
      <Math tex="P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}, \quad D = \begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{bmatrix}" block />

      <h2>How to read it</h2>

      <p>
        Think of <Math tex="A\mathbf{x}" /> as three steps:
      </p>
      <ol>
        <li><strong>P⁻¹x</strong> — re-express x in the eigenvector basis</li>
        <li><strong>Dx</strong> — scale each component (diagonal = just multiplication)</li>
        <li><strong>Px</strong> — convert back to the standard basis</li>
      </ol>

      <div className="callout">
        Diagonalization is a change of basis into a coordinate system where the
        transformation is pure scaling. In that system, the matrix is just two
        independent scalar multiplications.
      </div>

      <h2>When it fails</h2>

      <p>
        Not every matrix is diagonalizable over ℝ:
      </p>
      <ul>
        <li>Complex eigenvalues → no real eigenvectors</li>
        <li>Repeated eigenvalue without enough independent eigenvectors (defective matrix)</li>
      </ul>

      <p>
        Rotation matrices are the classic example: no real eigenvectors, can't be
        diagonalized over ℝ.
      </p>

      <h2>Try it</h2>

      <p>
        Edit the matrix and see the P, D, P⁻¹ decomposition.
        The product P·D·P⁻¹ should reconstruct A exactly.
        Try a rotation matrix — it will report that diagonalization fails.
      </p>

      <div className="callout callout-cs">
        <strong>Matrix powers via diagonalization:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[3, 1], [1, 3]])
eigenvalues, P = np.linalg.eig(A)
D = np.diag(eigenvalues)
P_inv = np.linalg.inv(P)

# A^10 = P @ D^10 @ P_inv
A_power_10 = P @ np.diag(eigenvalues**10) @ P_inv
print(np.allclose(A_power_10, np.linalg.matrix_power(A, 10)))  # True`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 6: Eigenvalues"
      moduleSlug="06-eigenvalues"
      lessonTitle="Diagonalization"
      lessonNumber="6.4"
      prev={{ href: "/lessons/eigenvalues/complex-eigenvalues", title: "Complex Eigenvalues" }}
      next={{ href: "/lessons/eigenvalues/positive-definite", title: "Positive Definite Matrices" }}
      prose={<Prose />}
      canvas={<DiagonalizationVisualizer />}
    />
  );
}
