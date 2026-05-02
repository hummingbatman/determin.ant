import { LessonLayout } from "@/components/ui/LessonLayout";
import { InvertibilityExplorer } from "@/components/canvas/InvertibilityExplorer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> inverting a camera matrix to go from
        screen coordinates back to world coordinates. Decryption in cryptography (inverting
        the encryption matrix). Solving <Math tex="Ax = b" /> efficiently by computing
        <Math tex="x = A^{-1}b" />. Any time you need to "undo" a transformation — you
        need the inverse.
      </div>

      <p>
        A transformation is <strong>invertible</strong> if there's another transformation
        that undoes it. Apply A, then apply <Math tex="A^{-1}" />, and you're back
        where you started.
      </p>

      <h2>The inverse undoes the transformation</h2>

      <p>
        For a 2×2 matrix, the inverse has a closed-form formula:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="A^{-1} = \frac{1}{\det(A)}\begin{bmatrix}d & -b \\ -c & a\end{bmatrix}" block />
      </div>

      <p>
        Notice the <Math tex="\det(A)" /> in the denominator. If det = 0,
        the formula breaks — division by zero. There is no inverse.
      </p>

      <h2>Seeing it in the interactive</h2>

      <p>
        Use the buttons above the grid to cycle through three views:
      </p>

      <ul>
        <li><strong>Show A</strong> — the original transformation</li>
        <li><strong>Show A⁻¹</strong> — the inverse: notice it "unscrambles" A's grid</li>
        <li><strong>Show A · A⁻¹</strong> — their product, which is always the identity</li>
      </ul>

      <div className="callout">
        Try the <strong>Singular</strong> preset. The inverse buttons grey out —
        no inverse exists. Then try <strong>Near-singular</strong>: technically
        invertible, but notice how the inverse entries explode in magnitude.
        That's numerical instability in action.
      </div>

      <h2>The product A · A⁻¹ = I</h2>

      <p>
        The identity matrix <Math tex="I" /> is the "do nothing" transformation.
        <Math tex="A \cdot A^{-1} = I" /> means applying A then <Math tex="A^{-1}" />
        leaves every vector unchanged — the grid returns to its original position.
      </p>

      <h2>Invertibility summarised</h2>

      <ul>
        <li><Math tex="\det(A) \neq 0" /> ↔ A is invertible ↔ system <Math tex="Ax = b" /> has a unique solution</li>
        <li><Math tex="\det(A) = 0" /> ↔ A is singular ↔ A collapses space ↔ no inverse</li>
      </ul>

      <p>
        These are all the same fact, viewed from different angles.
        The determinant is the single number that tells you which world you're in.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 4: Determinants"
      moduleSlug="04-determinants"
      lessonTitle="Invertibility"
      lessonNumber="4.3"
      prev={{ href: "/lessons/determinants/zero-determinant", title: "The Zero Determinant" }}
      next={{ href: "/lessons/vector-spaces/basis-and-dimension", title: "Basis and Dimension" }}
      prose={<Prose />}
      canvas={<InvertibilityExplorer />}
    />
  );
}
