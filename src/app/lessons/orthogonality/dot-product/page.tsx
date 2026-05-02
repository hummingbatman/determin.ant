import { LessonLayout } from "@/components/ui/LessonLayout";
import { DotProductVisualizer } from "@/components/canvas/DotProductVisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> dot products are the engine of neural
        networks — every neuron computes a weighted sum, which is a dot product.
        Cosine similarity (used in search engines and recommendation systems) is a
        normalized dot product. It measures how "aligned" two things are.
      </div>

      <p>
        The dot product is the simplest way to combine two vectors into a single number.
        That number carries rich geometric meaning.
      </p>

      <h2>The formula</h2>

      <p>
        For two vectors a = [a₁, a₂] and b = [b₁, b₂]:
      </p>
      <Math tex="\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2" block />

      <p>
        Multiply corresponding components, add them up. That's it.
      </p>

      <h2>The geometric interpretation</h2>

      <p>
        There's a second formula that reveals what the dot product is <em>measuring</em>:
      </p>
      <Math tex="\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}|\,|\mathbf{b}|\cos\theta" block />

      <p>
        where θ is the angle between the vectors. So the dot product is proportional
        to the cosine of the angle between them.
      </p>

      <div className="callout">
        <strong>Three cases:</strong><br />
        θ = 0° (pointing the same way) → a·b = |a||b| (maximum positive)<br />
        θ = 90° (perpendicular) → a·b = 0<br />
        θ = 180° (pointing opposite ways) → a·b = −|a||b| (maximum negative)
      </div>

      <h2>Orthogonality</h2>

      <p>
        Two vectors are <strong>orthogonal</strong> (perpendicular) if and only if
        their dot product is zero. This is the foundation of Module 7 — we'll use
        it to build coordinate systems, projections, and least squares.
      </p>

      <h2>Try it</h2>

      <p>
        Drag the blue and pink vectors. Watch the dot product and angle update.
        Try to make the dot product zero — the vectors will be at exactly 90°
        and you'll see the right-angle mark appear.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy — three equivalent ways:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np
a = np.array([3, 1])
b = np.array([1, 3])

print(np.dot(a, b))       # 6  — standard
print(a @ b)              # 6  — matrix multiply notation
print(sum(a * b))         # 6  — manual

# Cosine similarity
cos_sim = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
print(cos_sim)  # 0.6`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 7: Orthogonality"
      moduleSlug="07-orthogonality"
      lessonTitle="Dot Product"
      lessonNumber="7.1"
      prev={{ href: "/lessons/eigenvalues/diagonalization", title: "Diagonalization" }}
      next={{ href: "/lessons/orthogonality/projection", title: "Projection" }}
      prose={<Prose />}
      canvas={<DotProductVisualizer />}
    />
  );
}
