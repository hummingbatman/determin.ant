import { LessonLayout } from "@/components/ui/LessonLayout";
import { VectorSpaceExplorer } from "@/components/canvas/VectorSpaceExplorer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> in machine learning, the column space
        tells you which prediction targets the model can actually achieve. If your target
        isn't in the column space of your feature matrix, no combination of weights will
        reach it — this is why least squares finds the <em>closest</em> point instead.
      </div>

      <p>
        Every matrix creates three fundamental spaces. Understanding them tells you
        everything about what the matrix can and can't do.
      </p>

      <h2>Column space (image)</h2>

      <p>
        The <strong>column space</strong> of A is the set of all vectors that A can
        produce — all outputs <Math tex="A\mathbf{x}" /> for any input x.
        It's spanned by the columns of A.
      </p>

      <p>
        Think of it as the "reach" of the matrix. If A is 2×2 with rank 2,
        it can reach anywhere in ℝ². If rank 1, it can only reach a line.
      </p>

      <h2>Null space (kernel)</h2>

      <p>
        The <strong>null space</strong> of A is all vectors x where{" "}
        <Math tex="A\mathbf{x} = \mathbf{0}" />. These inputs get squashed to zero.
      </p>

      <p>
        When A is full rank (rank = 2), the null space contains only the zero vector —
        the transformation is injective, no two inputs produce the same output.
        When rank drops, a whole line of inputs collapses to zero.
      </p>

      <div className="callout">
        <strong>Rank-Nullity theorem:</strong> dim(column space) + dim(null space) = number of columns.
        For a 2×2 matrix: rank + nullity = 2.
        If rank = 1, then nullity = 1 (the null space is a line).
      </div>

      <h2>Row space</h2>

      <p>
        The <strong>row space</strong> is spanned by the rows of A. It lives in the
        input space and is the orthogonal complement of the null space.
        Together, the null space and row space partition every input vector perfectly.
      </p>

      <h2>Try it</h2>

      <p>
        Drag the column vectors. When they're linearly independent, the column space
        is all of ℝ² and the null space is just zero.
      </p>
      <p>
        Drag them to be parallel — the matrix loses rank. The column space collapses
        to a line, and the null space becomes a line (shown in amber).
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
A = np.array([[2, 1], [1, 2]])

# Column space (via SVD)
U, s, Vh = np.linalg.svd(A)
rank = np.sum(s > 1e-9)

# Null space
_, _, Vh = np.linalg.svd(A)
null = Vh[rank:]  # rows of Vh after rank`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 5: Vector Spaces"
      moduleSlug="05-vector-spaces"
      lessonTitle="Column, Null, and Row Space"
      lessonNumber="5.2"
      prev={{ href: "/lessons/vector-spaces/basis-and-dimension", title: "Basis and Dimension" }}
      next={{ href: "/lessons/vector-spaces/rank", title: "Rank" }}
      prose={<Prose />}
      canvas={<VectorSpaceExplorer />}
    />
  );
}
