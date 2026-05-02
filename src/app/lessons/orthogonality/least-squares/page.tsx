import { LessonLayout } from "@/components/ui/LessonLayout";
import { LeastSquaresVisualizer } from "@/components/canvas/LeastSquaresVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> linear regression is least squares.
        Every time you fit a line (or curve, or neural network layer) to data, you're
        minimizing a sum of squared errors. The closed-form solution involves a matrix
        equation derived directly from projection theory.
      </div>

      <p>
        Most real-world systems are <em>overdetermined</em> — more data points than
        unknowns. There's no exact solution. Least squares finds the best approximate one.
      </p>

      <h2>The problem</h2>

      <p>
        We have n data points and want to fit <Math tex="y = mx + b" />. For each
        point (xᵢ, yᵢ), the error is <Math tex="y_i - (mx_i + b)" />.
        We want to minimize the total squared error:
      </p>
      <Math tex="\min_{m,b} \sum_i (y_i - mx_i - b)^2" block />

      <h2>The matrix view</h2>

      <p>
        Stack the equations into a matrix: <Math tex="A\mathbf{x} = \mathbf{b}" /> where
        each row is one data point. When there's no exact solution,
        the least squares solution is:
      </p>
      <Math tex="\mathbf{x} = (A^T A)^{-1} A^T \mathbf{b}" block />

      <p>
        This is called the <strong>normal equation</strong>. The term{" "}
        <Math tex="A(A^T A)^{-1} A^T" /> is the projection matrix onto
        the column space of A.
      </p>

      <div className="callout">
        Least squares is projection. You're finding the point in the column space
        of A that's closest to b. The residuals are perpendicular to the column space.
      </div>

      <h2>The residuals</h2>

      <p>
        The vertical distances from each data point to the fitted line are
        the <strong>residuals</strong>. Least squares minimizes the sum of their squares —
        not their absolute values, not their maximum. Squaring penalizes large errors
        more heavily.
      </p>

      <h2>Try it</h2>

      <p>
        Click on the canvas to add points. Click an existing point to remove it.
        The green line updates in real-time. The yellow dashed lines are the residuals.
        Move points far off the line and watch the residual sum grow.
      </p>

      <div className="callout callout-cs">
        <strong>Linear regression via normal equations:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
# x values, y values
x = np.array([-3, -2, -1, 0, 1, 2, 3])
y = np.array([-2, -1.5, -0.5, 0.5, 1, 2.5, 2])

# Build design matrix: [x, 1] for each point
A = np.column_stack([x, np.ones_like(x)])

# Normal equation: x = (AᵀA)⁻¹Aᵀb
m, b = np.linalg.lstsq(A, y, rcond=None)[0]
print(f"y = {m:.2f}x + {b:.2f}")`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 7: Orthogonality"
      moduleSlug="07-orthogonality"
      lessonTitle="Least Squares"
      lessonNumber="7.4"
      prev={{ href: "/lessons/orthogonality/gram-schmidt", title: "Gram-Schmidt" }}
      next={{ href: "/lessons/svd/rotate-stretch-rotate", title: "Rotate, Stretch, Rotate" }}
      prose={<Prose />}
      canvas={<LeastSquaresVisualizer />}
    />
  );
}
