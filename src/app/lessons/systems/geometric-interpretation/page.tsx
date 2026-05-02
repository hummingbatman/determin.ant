import { LessonLayout } from "@/components/ui/LessonLayout";
import { SystemGeometry } from "@/components/canvas/SystemGeometry";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> circuit analysis (Kirchhoff's laws give a
        system of equations), 3D rendering (ray-plane intersections), economics (supply and
        demand equilibrium), and every time you ask "where do these two constraints meet?"
        — you're solving a system of equations.
      </div>

      <p>
        A <strong>system of linear equations</strong> is just two (or more) equations
        that share the same unknowns. The question is: are there values of x and y that
        satisfy all of them simultaneously?
      </p>

      <h2>Each equation is a line</h2>

      <p>
        Any equation of the form <Math tex="ax + by = c" /> describes a straight line.
        Every point on that line is a pair (x, y) that satisfies the equation.
      </p>

      <p>
        So solving a system of two equations is the same as asking: <em>where do
        two lines cross?</em>
      </p>

      <h2>Three possible outcomes</h2>

      <h3>One solution</h3>
      <p>
        The lines cross at exactly one point. That point is the unique pair (x, y)
        that satisfies both equations. Most systems look like this.
      </p>

      <h3>No solution</h3>
      <p>
        The lines are parallel — same slope, different intercepts. They never meet,
        so no (x, y) satisfies both at once. The system is called <strong>inconsistent</strong>.
      </p>

      <h3>Infinite solutions</h3>
      <p>
        The two equations describe the <em>same</em> line — one is just a multiple
        of the other. Every point on that line is a solution.
        The system is called <strong>dependent</strong>.
      </p>

      <div className="callout">
        Try dragging the sliders to make the two lines parallel: set a₁ = a₂ and b₁ = b₂
        but c₁ ≠ c₂. Watch the green dot disappear. Then set c₁ = c₂ too — the lines
        merge and you get infinitely many solutions.
      </div>

      <h2>Connection to matrices</h2>

      <p>
        This system can be written as a single matrix equation:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\begin{bmatrix} a_1 & b_1 \\ a_2 & b_2 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} c_1 \\ c_2 \end{bmatrix}" block />
      </div>

      <p>
        The matrix on the left is a transformation. Solving the system means asking:
        what vector, when transformed, lands on the right-hand side? If the transformation
        is invertible (non-zero determinant), there's exactly one answer.
        If not — parallel lines, det = 0 — there's either none or infinitely many.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 3: Systems of Equations"
      moduleSlug="03-systems"
      lessonTitle="Geometric Interpretation"
      lessonNumber="3.1"
      prev={{ href: "/lessons/transformations/build-a-transformation", title: "Build a Transformation" }}
      next={{ href: "/lessons/systems/gaussian-elimination", title: "Gaussian Elimination" }}
      prose={<Prose />}
      canvas={<SystemGeometry />}
    />
  );
}
