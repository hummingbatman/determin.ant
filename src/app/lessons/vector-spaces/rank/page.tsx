import { LessonLayout } from "@/components/ui/LessonLayout";
import { RankVisualizer } from "@/components/canvas/RankVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> rank is one of the most checked properties
        in data science. A feature matrix where two columns are perfectly correlated has
        rank less than the number of columns — causing multicollinearity, numerical
        instability, and models that can't be uniquely solved.
      </div>

      <p>
        Rank is a single number that summarizes how much "independent information" a
        matrix contains. It's the dimension of the column space.
      </p>

      <h2>What rank means geometrically</h2>

      <p>
        A 2×2 matrix transforms the plane. <strong>Rank 2</strong> means the
        transformation is full — it maps the plane to the whole plane.{" "}
        <strong>Rank 1</strong> means every input gets squashed to a single line.{" "}
        <strong>Rank 0</strong> means everything goes to zero.
      </p>

      <p>
        Rank is determined by linear independence of the columns (or rows — they
        always give the same number). Whenever one column is a multiple of another,
        the rank drops.
      </p>

      <h2>Rank and invertibility</h2>

      <p>
        A 2×2 matrix is invertible if and only if it has rank 2.
        Equivalently: det(A) ≠ 0 ↔ rank = 2.
      </p>

      <p>
        Any rank deficiency is catastrophic for solving linear systems: if{" "}
        <Math tex="A\mathbf{x} = \mathbf{b}" /> and rank(A) &lt; 2, then either
        there are infinitely many solutions or none at all — never exactly one.
      </p>

      <div className="callout">
        <strong>Full rank = invertible = unique solutions.</strong>
        <br />
        Below full rank = singular = either no solution or infinitely many.
      </div>

      <h2>Computing rank</h2>

      <p>
        Row-reduce to echelon form. Count the non-zero rows. That's the rank.
        Numerically, use SVD and count singular values above a threshold.
      </p>

      <h2>Try it</h2>

      <p>
        Use the presets at the top to switch between rank 2, 1, and 0.
        Or drag the column vectors to explore. Notice that rank 1 shows the
        column space as a dashed line — the full plane has collapsed to a line.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[1, 2], [2, 4]])
print(np.linalg.matrix_rank(A))   # 1 — columns are parallel

B = np.array([[1, 0], [0, 1]])
print(np.linalg.matrix_rank(B))   # 2 — full rank`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 5: Vector Spaces"
      moduleSlug="05-vector-spaces"
      lessonTitle="Rank"
      lessonNumber="5.3"
      prev={{ href: "/lessons/vector-spaces/column-null-row-space", title: "Column, Null, and Row Space" }}
      next={{ href: "/lessons/eigenvalues/eigenvector-intuition", title: "Eigenvectors — the Intuition" }}
      prose={<Prose />}
      canvas={<RankVisualizer />}
    />
  );
}
