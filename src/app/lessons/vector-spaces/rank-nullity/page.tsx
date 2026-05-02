import { LessonLayout } from "@/components/ui/LessonLayout";
import { RankNullityVisualizer } from "@/components/canvas/RankNullityVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> in neural networks, the number of
        linearly independent features a layer can distinguish is its effective rank.
        If rank drops below the number of classes, no amount of training can separate
        them. Rank-Nullity tells you the ceiling on what a linear layer can learn.
      </div>

      <p>
        The Rank-Nullity theorem is one of the most fundamental results in linear algebra.
        It says that inputs to a matrix split cleanly into two complementary parts.
      </p>

      <h2>The theorem</h2>

      <p>
        For any m×n matrix A:
      </p>
      <Math tex="\text{rank}(A) + \text{nullity}(A) = n" block />

      <p>
        where n is the number of <strong>columns</strong> (the dimension of the input space),
        rank(A) = dim(column space), and nullity(A) = dim(null space).
      </p>

      <h2>What it means</h2>

      <p>
        Every input vector splits into two perpendicular components:
      </p>
      <ul>
        <li>The <strong>row space</strong> component — this part "survives" the transformation</li>
        <li>The <strong>null space</strong> component — this part gets annihilated (sent to zero)</li>
      </ul>

      <p>
        Rank counts the surviving dimensions. Nullity counts the lost ones.
        Together they always add up to the total input dimension n.
      </p>

      <div className="callout">
        Think of it as a conservation law: dimensions don't appear or disappear.
        They either make it through the transformation (rank) or get zeroed out (nullity).
        rank + nullity = total input dimensions. Always.
      </div>

      <h2>Consequences</h2>

      <p>
        For a square n×n matrix:
      </p>
      <ul>
        <li>Rank n → nullity 0 → the matrix is invertible, null space is just zero</li>
        <li>Rank n−1 → nullity 1 → one direction collapses, infinite solutions or no solution</li>
        <li>Rank 0 → everything goes to zero (only possible for the zero matrix)</li>
      </ul>

      <h2>Try it</h2>

      <p>
        Drag the column vectors to change the rank. The bar shows how the two dimensions
        are split between column space (green) and null space (amber). When vectors are
        parallel, rank drops to 1 and nullity rises to 1 — they always sum to 2.
      </p>

      <div className="callout callout-cs">
        <strong>Verifying in NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
from scipy.linalg import null_space

A = np.array([[1., 2.], [2., 4.]])  # rank 1
n = A.shape[1]  # number of columns = 2

rank = np.linalg.matrix_rank(A)      # 1
nullity = n - rank                    # 1
ns = null_space(A)                    # the null space vector(s)

print(f"rank={rank}, nullity={nullity}, sum={rank+nullity}")  # 1 1 2`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 5: Vector Spaces"
      moduleSlug="05-vector-spaces"
      lessonTitle="Rank-Nullity Theorem"
      lessonNumber="5.4"
      prev={{ href: "/lessons/vector-spaces/rank", title: "Rank" }}
      next={{ href: "/lessons/vector-spaces/change-of-basis", title: "Change of Basis" }}
      prose={<Prose />}
      canvas={<RankNullityVisualizer />}
    />
  );
}
