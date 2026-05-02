import { LessonLayout } from "@/components/ui/LessonLayout";
import { ZeroDeterminant } from "@/components/canvas/ZeroDeterminant";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> a camera matrix with det = 0 maps 3D
        space onto a 2D image — intentionally losing depth information. In ML, a weight
        matrix approaching singularity means gradients vanish (the "vanishing gradient"
        problem). In control theory, a singular system matrix means the system can't be
        controlled in some direction.
      </div>

      <p>
        When the determinant of a transformation is zero, something dramatic happens:
        the entire 2D plane gets crushed down to a line — or even a single point.
        No area survives.
      </p>

      <h2>What det = 0 means geometrically</h2>

      <p>
        A zero determinant means the two column vectors — the new homes of
        <Math tex="\hat{\imath}" /> and <Math tex="\hat{\jmath}" /> — are
        <strong> parallel</strong> (or one is zero). They no longer span a plane.
        Every point in 2D space gets mapped into that single line.
      </p>

      <p>
        Watch the grid in the interactive as you push the "how singular" slider
        toward 1. The green grid lines compress together. When det = 0,
        all of 2D space has been flattened onto one line.
      </p>

      <h2>Information is permanently lost</h2>

      <p>
        Once a transformation with det = 0 is applied, you can't recover the
        original vector. Many different inputs map to the same output.
        The transformation is not invertible — there's no way to undo it.
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\det(A) = 0 \iff A \text{ is not invertible}" block />
      </div>

      <h2>The null space grows</h2>

      <p>
        The set of all vectors that map to <Math tex="\mathbf{0}" /> is called
        the <strong>null space</strong> of the matrix.
        When det ≠ 0, the null space contains only the zero vector.
        When det = 0, the null space is an entire line (in 2D) — all those
        vectors that "disappear" into the origin.
      </p>

      <div className="callout">
        Try the "collapse direction" slider to change which line the plane collapses onto.
        Notice that the determinant stays near zero regardless of direction — the line
        the grid falls onto can be any orientation.
      </div>

      <h2>Near-zero is also trouble</h2>

      <p>
        In practice, exact zero rarely appears. But a matrix with a very small
        determinant is nearly singular — numerically unstable.
        Small errors in input produce huge errors in output.
        This is called <strong>ill-conditioning</strong>, and it's why numerical
        analysts worry about the condition number, not just the determinant.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 4: Determinants"
      moduleSlug="04-determinants"
      lessonTitle="The Zero Determinant"
      lessonNumber="4.2"
      prev={{ href: "/lessons/determinants/area-scaling", title: "Area Scaling" }}
      next={{ href: "/lessons/determinants/invertibility", title: "Invertibility" }}
      prose={<Prose />}
      canvas={<ZeroDeterminant />}
    />
  );
}
