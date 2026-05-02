import { LessonLayout } from "@/components/ui/LessonLayout";
import { LinearIndependenceVisualizer } from "@/components/canvas/LinearIndependenceVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> multicollinearity in regression happens
        when two features are linearly dependent — one is nearly a multiple of the other.
        The model can't tell them apart, the normal matrix becomes singular, and the
        solution becomes numerically unstable or non-unique.
      </div>

      <p>
        Linear independence is the condition that makes a basis work. It's the precise
        way of saying "these vectors aren't redundant — each one adds new information."
      </p>

      <h2>The definition</h2>

      <p>
        A set of vectors <Math tex="\{\mathbf{v}_1, \mathbf{v}_2\}" /> is{" "}
        <strong>linearly independent</strong> if the only solution to:
      </p>
      <Math tex="c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 = \mathbf{0}" block />
      <p>
        is <Math tex="c_1 = c_2 = 0" />. In other words: you can't write zero as a
        non-trivial combination of them.
      </p>

      <p>
        They are <strong>linearly dependent</strong> if some non-zero scalars exist
        that make the combination zero — meaning one vector is a multiple of the other.
      </p>

      <h2>Geometrically</h2>

      <p>
        Two vectors in ℝ² are linearly dependent if and only if they point in the same
        (or opposite) direction — they're collinear. Two vectors that aren't parallel are
        always independent.
      </p>

      <div className="callout">
        Linear independence = the vectors point in genuinely different directions.
        They span a 2D region, not just a line.
      </div>

      <h2>The connection to span</h2>

      <p>
        Two linearly independent vectors span all of ℝ². Two dependent vectors only span
        a line. Independence is what gives a basis its power — it means there are no
        redundant directions and no wasted dimensions.
      </p>

      <h2>In higher dimensions</h2>

      <p>
        Three vectors in ℝ³ are dependent if one lies in the plane spanned by the other
        two. In general, n vectors are independent if none is in the span of the rest.
        Checking independence means asking: does row reduction leave any zero rows?
      </p>

      <h2>Try it</h2>

      <p>
        Drag the blue vector <strong>a</strong> and the pink vector <strong>b</strong>.
        The purple vector <strong>v</strong> is always expressible as a combination when
        a and b are independent. Make a and b parallel — they become dependent, and v
        can only be reached if it happens to lie on the same line.
      </p>

      <div className="callout callout-cs">
        <strong>Checking independence in NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np

# Two vectors as columns of a matrix
A = np.array([[2, 1], [0, 2]])
rank = np.linalg.matrix_rank(A)
print(rank)  # 2 — independent

B = np.array([[1, 2], [2, 4]])  # second = 2 * first
print(np.linalg.matrix_rank(B))  # 1 — dependent`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 1: Vectors"
      moduleSlug="01-vectors"
      lessonTitle="Linear Independence"
      lessonNumber="1.6"
      prev={{ href: "/lessons/vectors/span", title: "Span" }}
      next={{ href: "/lessons/vectors/cross-product", title: "Cross Product" }}
      prose={<Prose />}
      canvas={<LinearIndependenceVisualizer />}
    />
  );
}
