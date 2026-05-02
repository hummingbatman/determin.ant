import { LessonLayout } from "@/components/ui/LessonLayout";
import { SolutionTypes } from "@/components/canvas/SolutionTypes";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> in machine learning, an overdetermined
        system (more equations than unknowns) has no exact solution — that's why we use
        least squares. In control systems, an underdetermined system has infinite solutions —
        that's the space of valid control inputs. Knowing which case you're in determines
        your entire approach.
      </div>

      <p>
        Every system of linear equations falls into one of exactly three categories.
        Understanding which one you're dealing with before you start solving saves
        enormous effort — and reveals something deep about the underlying transformation.
      </p>

      <h2>The three cases</h2>

      <h3>Unique solution — det ≠ 0</h3>
      <p>
        The coefficient matrix is invertible. The transformation it represents
        is a bijection — every output point came from exactly one input.
        You can always solve it: <Math tex="\mathbf{x} = A^{-1}\mathbf{b}" />.
      </p>

      <h3>No solution — det = 0, inconsistent</h3>
      <p>
        The matrix is singular. The transformation collapses the plane onto a line
        (or a point). The right-hand side <Math tex="\mathbf{b}" /> doesn't lie on
        that collapsed image, so no vector maps to it.
        Gaussian elimination will produce a row like <Math tex="0 = k" /> where <Math tex="k \neq 0" />.
      </p>

      <h3>Infinite solutions — det = 0, consistent</h3>
      <p>
        The matrix is singular, but <Math tex="\mathbf{b}" /> <em>does</em> lie in
        the image. There's an entire line of solutions — the null space of <Math tex="A" />
        shifted to one particular solution. Gaussian elimination produces a row of all zeros.
      </p>

      <div className="callout">
        The singular cases (det = 0) are not just edge cases — they come up constantly
        in practice. Redundant sensors, correlated features in ML data, degenerate
        geometry in graphics. Recognising them fast matters.
      </div>

      <h2>Rank: the precise measure</h2>

      <p>
        The <strong>rank</strong> of a matrix is the number of independent rows (or columns)
        it has. For a 2×2 matrix:
      </p>

      <ul>
        <li>Rank 2 → unique solution</li>
        <li>Rank 1 → either no solution or infinitely many</li>
        <li>Rank 0 → trivial (zero matrix)</li>
      </ul>

      <p>
        We'll explore rank properly in the Vector Spaces module.
        For now: <em>rank = how much information the matrix carries.</em>
      </p>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

A = np.array([[1, 2], [2, 4]])   # rank 1

# Check rank
print(np.linalg.matrix_rank(A))  # 1 — singular

# np.linalg.solve will raise LinAlgError for singular A
# For least-squares (best approximate solution):
b = np.array([3, 7])
x, _, _, _ = np.linalg.lstsq(A, b, rcond=None)
print(x)  # least-squares solution`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 3: Systems of Equations"
      moduleSlug="03-systems"
      lessonTitle="Solution Types"
      lessonNumber="3.4"
      prev={{ href: "/lessons/systems/lu-decomposition", title: "LU Decomposition" }}
      next={{ href: "/lessons/determinants/area-scaling", title: "Area Scaling" }}
      prose={<Prose />}
      canvas={<SolutionTypes />}
    />
  );
}
