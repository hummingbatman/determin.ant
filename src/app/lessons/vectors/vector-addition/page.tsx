import { LessonLayout } from "@/components/ui/LessonLayout";
import { VectorAddition } from "@/components/canvas/VectorAddition";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> a drone follows waypoints by adding
        displacement vectors. A physics engine combines forces (gravity + wind + thrust)
        with vector addition. In graphics, you move a camera by adding a velocity vector
        to its position every frame.
      </div>

      <p>
        In the last lesson you learned that a vector is a displacement — an instruction
        to move a certain distance in a certain direction. So what happens when you
        follow <em>two</em> displacements one after another?
      </p>

      <h2>The directions analogy</h2>

      <p>
        Say you walk <strong>3 blocks east and 1 block north</strong> to reach a park.
        From there, you walk <strong>1 block east and 3 blocks north</strong> to reach
        a café. Where did you end up relative to where you started?
      </p>

      <p>
        You went <strong>4 blocks east and 4 blocks north</strong> in total.
        That combined journey is the sum of the two vectors.
      </p>

      <h2>The tip-to-tail method</h2>

      <p>
        Here's the geometric rule: place the <em>tail</em> of the second vector
        at the <em>tip</em> of the first. The sum is the arrow that goes straight
        from where you started to where you ended up.
      </p>

      <p>
        In the interactive, the faint blue and pink arrows show this — each vector
        is drawn again starting from the other's tip. The <span style={{ color: "#15803d", fontWeight: 600 }}>green arrow</span> is
        the result.
      </p>

      <h2>The algebra is just component addition</h2>

      <p>
        You don't need to draw anything to compute a sum. Just add the
        x-components together and the y-components together:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem", fontFamily: "monospace", fontSize: "0.9rem", color: "var(--text)" }}>
        <Math tex="[a,\ b] + [c,\ d] = [a+c,\ b+d]" block />
      </div>

      <p>
        That's it. No trick. The geometry (tip-to-tail) and the algebra (add the
        components) always give the same answer.
      </p>

      <h2>Properties worth knowing</h2>

      <ul>
        <li><strong>Order doesn't matter:</strong> <Math tex="\mathbf{v}_1 + \mathbf{v}_2 = \mathbf{v}_2 + \mathbf{v}_1" /> — try swapping them in the interactive</li>
        <li><strong>Adding zero does nothing:</strong> <Math tex="\mathbf{v} + [0,0] = \mathbf{v}" /></li>
        <li><strong>Negative cancels:</strong> <Math tex="\mathbf{v} + (-\mathbf{v}) = [0,0]" /> — the arrow that points exactly backwards</li>
      </ul>

      <div className="callout">
        The green parallelogram shape isn't just decoration — it shows that
        tip-to-tail works in <em>either order</em>. The sum arrow is always the
        diagonal of that parallelogram.
      </div>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

v1 = np.array([3, 1])
v2 = np.array([1, 3])

print(v1 + v2)   # [4, 4]`}</code></pre>
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}>
          NumPy adds arrays element-wise by default. This is exactly vector addition —
          the same rule, just written as code.
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
      lessonTitle="Vector Addition"
      lessonNumber="1.2"
      prev={{ href: "/lessons/vectors/what-is-a-vector", title: "What is a vector?" }}
      next={{ href: "/lessons/vectors/scalar-multiplication", title: "Scalar Multiplication" }}
      prose={<Prose />}
      canvas={<VectorAddition />}
    />
  );
}
