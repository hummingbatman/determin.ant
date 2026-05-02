import { LessonLayout } from "@/components/ui/LessonLayout";
import { ScalarMultiplication } from "@/components/canvas/ScalarMultiplication";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> adjusting the speed of a moving object
        (scale its velocity vector), zooming a camera (scale the view direction), normalising
        audio volume (scale a sound vector), or adjusting the learning rate of a gradient
        in machine learning (scale the gradient vector).
      </div>

      <p>
        You can add vectors together. But you can also do something simpler: take
        a single vector and <em>scale it</em> — make it longer, shorter, or flip
        it around. That operation is called <strong>scalar multiplication</strong>.
      </p>

      <h2>What is a scalar?</h2>

      <p>
        A <strong>scalar</strong> is just a plain number — no direction, no
        components, just a magnitude. The number 3 is a scalar. So is −0.5, or π.
        When you multiply a vector by a scalar, you're resizing the arrow.
      </p>

      <h2>What it does to the arrow</h2>

      <h3>Positive scalar — stretch or shrink</h3>
      <p>
        Multiplying by 2 doubles the length. Multiplying by 0.5 halves it.
        The direction stays exactly the same — the arrow just gets longer or shorter.
      </p>

      <h3>Negative scalar — flip and scale</h3>
      <p>
        Multiplying by −1 reverses the direction. The arrow points the
        opposite way, but has the same length. Multiplying by −2 doubles the
        length <em>and</em> flips the direction.
      </p>

      <h3>Zero — the arrow disappears</h3>
      <p>
        Multiplying by 0 gives the <strong>zero vector</strong> <Math tex="[0,\ 0]" />.
        No length, no direction — just a point sitting at the origin. It's the
        additive identity: add it to anything and nothing changes.
      </p>

      <h2>The algebra</h2>

      <p>
        The rule is simple: multiply each component by the scalar.
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="s \cdot [x,\ y] = [sx,\ sy]" block />
      </div>

      <p>
        So <Math tex="3 \cdot [2,\ 1] = [6,\ 3]" />. The vector triples in length and keeps pointing the same way.
      </p>

      <h2>Length scales by the absolute value</h2>

      <p>
        If the original vector has length <Math tex="\|\mathbf{v}\|" />, then the scaled
        vector has length <Math tex="|s| \cdot \|\mathbf{v}\|" />. The absolute value of the scalar
        tells you <em>how much</em> the length changes; the sign tells you whether
        the direction flips.
      </p>

      <div className="callout">
        Try dragging the slider to exactly <strong>−1</strong>. The length readout stays
        the same, but the arrow reverses. That's the geometric meaning of negation.
      </div>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

v = np.array([2, 2])

print(3 * v)     # [ 6  6]  — stretch
print(-1 * v)    # [-2 -2]  — flip
print(0.5 * v)   # [1. 1.]  — shrink`}</code></pre>
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}>
          NumPy broadcasts scalar multiplication across every element. Same rule,
          same result — and it works on vectors of any length.
        </p>
      </div>

      <h2>Why this matters</h2>

      <p>
        Scalar multiplication is one half of a bigger idea coming up shortly:
        <strong> linear combinations</strong>. When you can both scale vectors
        and add them together, you can reach any point in space — or describe
        complex motions as weighted sums of simpler ones.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 1: Vectors"
      moduleSlug="01-vectors"
      lessonTitle="Scalar Multiplication"
      lessonNumber="1.3"
      prev={{ href: "/lessons/vectors/vector-addition", title: "Vector Addition" }}
      next={{ href: "/lessons/vectors/linear-combinations", title: "Linear Combinations" }}
      prose={<Prose />}
      canvas={<ScalarMultiplication />}
    />
  );
}
