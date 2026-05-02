import { LessonLayout } from "@/components/ui/LessonLayout";
import { VectorComponents } from "@/components/canvas/VectorComponents";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every time a game engine moves a character,
        a GPS calculates a route, a physics simulation applies gravity, or a machine
        learning model stores a data point — it's using vectors. They're the single most
        common data structure in scientific computing.
      </div>

      <p>
        You already understand the core idea. You just haven't given it a name yet.
      </p>

      <h2>Start with directions</h2>

      <p>
        Imagine someone asks you how to get to the coffee shop. You say:{" "}
        <em>"Walk 3 blocks east, then 4 blocks north."</em>
      </p>

      <p>
        That pair of instructions — <strong>3 east, 4 north</strong> — is a vector.
        It has a magnitude (how far in total) and a direction (which way to go).
      </p>

      <p>
        A <strong>vector</strong> is any quantity that captures both of those things at once.
        Velocity is a vector: 60 mph <em>north</em> is different from 60 mph <em>east</em>.
        Force is a vector: you can push a door with 10 N, but the angle you push matters.
      </p>

      <h2>Three ways to picture a vector</h2>

      <h3>1. As an arrow</h3>
      <p>
        Draw a dot at the origin (the center of the grid). Draw another dot somewhere else.
        Connect them with an arrow. That arrow <em>is</em> the vector — its length is the
        magnitude, and the direction it points is the direction.
      </p>

      <h3>2. As two numbers</h3>
      <p>
        The arrow from the origin to the point (3, 2) can be fully described as{" "}
        <Math tex="[3,\; 2]" /> — go 3 units right, go 2 units up. Those two numbers
        completely capture the arrow. Nothing is lost.
      </p>

      <h3>3. As a point in space</h3>
      <p>
        The tip of the arrow marks a location. So a vector also names a destination:
        where do you end up if you start at the origin and follow the arrow?
      </p>

      <div className="callout">
        All three pictures describe the same object. The arrow, the pair of numbers,
        and the point are just different lenses for the same idea.
      </div>

      <h2>Try it</h2>

      <p>
        The interactive on the right shows a vector as an arrow. Drag the tip to any
        position. Notice:
      </p>
      <ul>
        <li>The <span style={{ color: "var(--vec1)", fontWeight: 600 }}>blue dashed line</span> shows the x-component — how far right (or left)</li>
        <li>The <span style={{ color: "var(--vec2)", fontWeight: 600 }}>pink dashed line</span> shows the y-component — how far up (or down)</li>
        <li>The readout below shows the vector as two numbers</li>
      </ul>

      <p>
        What happens when you drag to the left? The x-component goes negative.
        What about straight up? The x-component becomes 0.
      </p>

      <h2>For the CS folks</h2>

      <div className="callout callout-cs">
        <strong>A vector is literally an array.</strong> In Python, you might write:
        <pre style={{ margin: "0.75rem 0 0" }}><code>{`v = [3, 2]        # a 2D vector
v = [3, 2, 5]     # a 3D vector — same idea, one more number`}</code></pre>
        <p style={{ marginTop: "0.5rem", marginBottom: 0 }}>
          In NumPy (which you will use constantly in ML):
        </p>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
v = np.array([3, 2])
print(v[0])  # 3  — the x-component
print(v[1])  # 2  — the y-component`}</code></pre>
      </div>

      <p>
        The rest of this course is about what you can <em>do</em> with those arrays —
        add them, scale them, rotate them, and eventually decompose complicated
        transformations into simple parts.
      </p>

      <h2>One key thing to remember</h2>

      <p>
        A vector is not a point on a map. It is a <strong>displacement</strong> — an
        instruction for how to move. <Math tex="[3, 2]" /> says{" "}
        <em>"move 3 right and 2 up"</em>, regardless of where you start.
      </p>

      <p>
        We almost always draw vectors starting from the origin, but that's just a
        convention. The same arrow could start anywhere — it's the same vector.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 1: Vectors"
      moduleSlug="01-vectors"
      lessonTitle="What is a vector?"
      lessonNumber="1.1"
      next={{ href: "/lessons/vectors/vector-addition", title: "Vector Addition" }}
      prose={<Prose />}
      canvas={<VectorComponents />}
    />
  );
}
