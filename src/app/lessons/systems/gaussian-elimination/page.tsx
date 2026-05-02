import { LessonLayout } from "@/components/ui/LessonLayout";
import { GaussianElimination } from "@/components/canvas/GaussianElimination";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> Gaussian elimination is the workhorse
        behind most linear algebra software. NumPy's <code>np.linalg.solve</code>,
        MATLAB's backslash operator, and finite element solvers in engineering simulation
        all use variants of it. Understanding it means you understand what your tools
        are actually doing.
      </div>

      <p>
        Knowing that a system has a solution is one thing. Finding it is another.
        <strong> Gaussian elimination</strong> is the systematic algorithm for doing that —
        and it works for any size system.
      </p>

      <h2>The idea: simplify without changing solutions</h2>

      <p>
        There are three operations you can perform on the rows of a system that
        preserve its solutions:
      </p>

      <ul>
        <li><strong>Swap</strong> two rows</li>
        <li><strong>Scale</strong> a row by any non-zero number</li>
        <li><strong>Add</strong> a multiple of one row to another</li>
      </ul>

      <p>
        Using these, you reduce the system to a simpler form — one where
        the answer can be read off directly.
      </p>

      <h2>Step by step</h2>

      <p>
        The goal is <strong>upper triangular form</strong>: zeros below the diagonal.
        For a 2×2 system that means:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\begin{bmatrix} a & b \\ 0 & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} e \\ f \end{bmatrix}" block />
      </div>

      <p>
        Row 2 now says <Math tex="dy = f" />, so <Math tex="y = f/d" />.
        Then substitute back into row 1 to find x. This is called <strong>back-substitution</strong>.
      </p>

      <div className="callout">
        Step through all four examples in the interactive. Pay special attention to
        the "No solution" and "Infinite solutions" cases — watch what happens to
        the bottom row when the system is degenerate.
      </div>

      <h2>The augmented matrix</h2>

      <p>
        The columns are x-coefficients, y-coefficients, and the right-hand side
        (separated by the bar). Every row operation applies identically to all
        four numbers in a row — including the right-hand side.
      </p>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

A = np.array([[2, 1],
              [4, -1]], dtype=float)
b = np.array([5, 7], dtype=float)

x = np.linalg.solve(A, b)
print(x)   # [2. 1.]  — x=2, y=1`}</code></pre>
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}>
          <code>np.linalg.solve</code> runs an optimised Gaussian elimination
          (LU decomposition) internally. Same algorithm, much faster for large systems.
        </p>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 3: Systems of Equations"
      moduleSlug="03-systems"
      lessonTitle="Gaussian Elimination"
      lessonNumber="3.2"
      prev={{ href: "/lessons/systems/geometric-interpretation", title: "Geometric Interpretation" }}
      next={{ href: "/lessons/systems/lu-decomposition", title: "LU Decomposition" }}
      prose={<Prose />}
      canvas={<GaussianElimination />}
    />
  );
}
