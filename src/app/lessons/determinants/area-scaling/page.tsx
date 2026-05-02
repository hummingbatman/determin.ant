import { LessonLayout } from "@/components/ui/LessonLayout";
import { DeterminantArea } from "@/components/canvas/DeterminantArea";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> volume calculations in physics simulations,
        change-of-variables in integration (the Jacobian determinant), checking whether a
        set of vectors can form a coordinate system, and computing cross products in 3D graphics —
        all use the determinant as a measure of "how much space is being scaled."
      </div>

      <p>
        Every linear transformation scales areas by some fixed factor.
        Double the matrix, double the area. Rotate — area is unchanged.
        Collapse to a line — area goes to zero.
        That scaling factor is the <strong>determinant</strong>.
      </p>

      <h2>The unit square</h2>

      <p>
        The unit square has corners at (0,0), (1,0), (0,1), and (1,1).
        Its area is exactly 1. After a linear transformation, those four corners
        move to new positions. The parallelogram they form has area equal to
        <Math tex="|\det(A)|" />.
      </p>

      <h2>The formula</h2>

      <p>
        For a 2×2 matrix, the determinant has a compact formula:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\det\begin{bmatrix}a & b \\ c & d\end{bmatrix} = ad - bc" block />
      </div>

      <p>
        This looks arbitrary until you think geometrically. <Math tex="ad" /> is
        the area of the rectangle spanned by the diagonal entries.
        <Math tex="bc" /> is the area "lost" due to the off-diagonal shearing.
        The difference is the actual parallelogram area.
      </p>

      <h2>Sign encodes orientation</h2>

      <p>
        The determinant can be negative. A negative value means the transformation
        <strong> flips orientation</strong> — what was counter-clockwise becomes clockwise,
        like a mirror reflection. The <em>magnitude</em> still gives the area scaling;
        the <em>sign</em> tells you whether space was flipped.
      </p>

      <div className="callout">
        Try the <strong>Flip</strong> preset. The determinant is −1: area is preserved
        (magnitude 1) but the grid flips. Try <strong>Shear</strong> — the parallelogram
        leans over but the area stays surprisingly constant.
      </div>

      <h2>Scaling the whole matrix</h2>

      <p>
        If you multiply every entry by a scalar <Math tex="s" />, the determinant
        scales by <Math tex="s^2" /> for a 2×2 matrix:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\det(sA) = s^2 \det(A)" block />
      </div>

      <p>
        Makes sense: scale both dimensions by <Math tex="s" />, and area scales
        by <Math tex="s \times s = s^2" />.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 4: Determinants"
      moduleSlug="04-determinants"
      lessonTitle="Area Scaling"
      lessonNumber="4.1"
      prev={{ href: "/lessons/systems/solution-types", title: "Solution Types" }}
      next={{ href: "/lessons/determinants/zero-determinant", title: "The Zero Determinant" }}
      prose={<Prose />}
      canvas={<DeterminantArea />}
    />
  );
}
