import { LessonLayout } from "@/components/ui/LessonLayout";
import { SpanVisualizer } from "@/components/canvas/SpanVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> in robotics, span tells you which
        positions a robotic arm can physically reach. In ML, the span of your training
        features determines what patterns your model can ever learn. If two features
        are perfectly correlated (parallel vectors), one is redundant — it adds no new information.
      </div>

      <p>
        In the last lesson you learned that by choosing different coefficients
        you can reach different points using a linear combination. Now ask a
        bigger question: <em>what's every point you can possibly reach?</em>
      </p>

      <h2>The span</h2>

      <p>
        The <strong>span</strong> of a set of vectors is the collection of all
        linear combinations you can make from them — every possible{" "}
        <Math tex="a\,\mathbf{v}_1 + b\,\mathbf{v}_2" /> as <Math tex="a" />{" "}
        and <Math tex="b" /> range over all real numbers.
      </p>

      <p>
        It's the answer to: <em>"Where can these vectors take me?"</em>
      </p>

      <h2>Two cases</h2>

      <h3>Case 1 — independent vectors</h3>
      <p>
        If <Math tex="\mathbf{v}_1" /> and <Math tex="\mathbf{v}_2" /> point in
        genuinely different directions, their span fills the <em>entire</em> 2D
        plane. You can reach any point <Math tex="[x,\ y]" /> by picking the
        right <Math tex="a" /> and <Math tex="b" />. The green shading in the
        interactive shows this.
      </p>

      <h3>Case 2 — parallel vectors</h3>
      <p>
        If the two vectors point in the same direction (or exactly opposite),
        scaling and adding them only ever moves you along that one line. The
        span collapses from a whole plane down to a single line through the origin.
      </p>

      <div className="callout">
        Try dragging v₂ until it points in the same direction as v₁.
        The shading disappears and you're left with just a dashed line —
        that's the span shrinking to one dimension.
      </div>

      <h2>Why parallel vectors are "redundant"</h2>

      <p>
        If <Math tex="\mathbf{v}_2 = 2\,\mathbf{v}_1" />, then{" "}
        <Math tex="a\,\mathbf{v}_1 + b\,\mathbf{v}_2 = a\,\mathbf{v}_1 + 2b\,\mathbf{v}_1 = (a + 2b)\,\mathbf{v}_1" />.
        The second vector adds no new direction. It can only go where{" "}
        <Math tex="\mathbf{v}_1" /> already goes.
      </p>

      <p>
        Vectors that are <em>not</em> redundant like this are called <strong>linearly independent</strong>.
        That term will come up again and again through the rest of the course.
      </p>

      <h2>In higher dimensions</h2>

      <p>
        The same idea extends upward. In 3D:
      </p>

      <ul>
        <li>One vector spans a <strong>line</strong></li>
        <li>Two independent vectors span a <strong>plane</strong></li>
        <li>Three independent vectors span all of <strong>ℝ³</strong></li>
      </ul>

      <p>
        The number of independent vectors you need to span a space is its <strong>dimension</strong>.
        2D space has dimension 2. 3D space has dimension 3.
      </p>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

v1 = np.array([2, 1])
v2 = np.array([-1, 2])

# Can we reach [3, 4]?
# Solve: a*v1 + b*v2 = [3, 4]
A = np.column_stack([v1, v2])
coeffs = np.linalg.solve(A, [3, 4])
print(coeffs)   # [a, b] — a solution exists because v1, v2 are independent`}</code></pre>
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}>
          <code>np.linalg.solve</code> finds the coefficients. If the vectors were
          parallel it would throw an error — because there's no solution for most targets.
        </p>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 1: Vectors"
      moduleSlug="01-vectors"
      lessonTitle="Span"
      lessonNumber="1.5"
      prev={{ href: "/lessons/vectors/linear-combinations", title: "Linear Combinations" }}
      next={{ href: "/lessons/transformations/what-is-a-transformation", title: "What is a Transformation?" }}
      prose={<Prose />}
      canvas={<SpanVisualizer />}
    />
  );
}
