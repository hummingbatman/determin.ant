import { LessonLayout } from "@/components/ui/LessonLayout";
import { LinearCombinations } from "@/components/canvas/LinearCombinations";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> a single neuron in a neural network
        computes a weighted sum of its inputs — that's a linear combination.
        Mixing colours on a screen (30% red + 59% green + 11% blue = perceived brightness).
        Any blend, mix, or weighted average is a linear combination.
      </div>

      <p>
        You know how to scale a vector. You know how to add two vectors.
        Put those two ideas together and you get one of the most important
        concepts in all of linear algebra: the <strong>linear combination</strong>.
      </p>

      <h2>The idea</h2>

      <p>
        Take two vectors <Math tex="\mathbf{v}_1" /> and <Math tex="\mathbf{v}_2" />.
        Scale each one by some number, then add the results:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="a\,\mathbf{v}_1 + b\,\mathbf{v}_2" block />
      </div>

      <p>
        The numbers <Math tex="a" /> and <Math tex="b" /> are called <strong>coefficients</strong> (or weights).
        By choosing different values for them you get different results.
        The collection of <em>all possible results</em> is something we'll explore in the next lesson.
      </p>

      <h2>A concrete example</h2>

      <p>
        Let <Math tex="\mathbf{v}_1 = [2,\ 0]" /> (points right) and{" "}
        <Math tex="\mathbf{v}_2 = [0,\ 2]" /> (points up).
        Then:
      </p>

      <ul>
        <li><Math tex="1.5\,\mathbf{v}_1 + 1\,\mathbf{v}_2 = [3,\ 2]" /></li>
        <li><Math tex="0\,\mathbf{v}_1 + 2\,\mathbf{v}_2 = [0,\ 4]" /></li>
        <li><Math tex="-1\,\mathbf{v}_1 + 0.5\,\mathbf{v}_2 = [-2,\ 1]" /></li>
      </ul>

      <p>
        Every point on the grid can be reached this way — just pick the
        right <Math tex="a" /> and <Math tex="b" />.
      </p>

      <h2>Try it</h2>

      <p>
        In the interactive, <span style={{ color: "#0284c7", fontWeight: 600 }}>v₁</span> and{" "}
        <span style={{ color: "#db2777", fontWeight: 600 }}>v₂</span> are fixed.
        Use the sliders to set <Math tex="a" /> and <Math tex="b" /> and land the result
        on the <span style={{ color: "#b45309", fontWeight: 600 }}>★ target</span>.
        The arrow goes blue → pink → result, showing the two steps of
        the combination geometrically.
      </p>

      <div className="callout">
        <strong>Hint:</strong> the target is at [3, 2]. Since v₁ = [2, 0],
        you need <Math tex="a \times 2 = 3" />, so <Math tex="a = 1.5" />.
        Since v₂ = [0, 2], you need <Math tex="b \times 2 = 2" />, so <Math tex="b = 1" />.
      </div>

      <h2>Why this matters</h2>

      <p>
        Linear combinations are everywhere in applications:
      </p>

      <ul>
        <li><strong>Computer graphics:</strong> every pixel colour is a weighted sum of red, green, and blue</li>
        <li><strong>Machine learning:</strong> a neuron computes a weighted sum of its inputs — that's a linear combination</li>
        <li><strong>Signals:</strong> any waveform can be expressed as a weighted sum of sine waves (Fourier series)</li>
      </ul>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

v1 = np.array([2, 0])
v2 = np.array([0, 2])

a, b = 1.5, 1.0
result = a * v1 + b * v2
print(result)   # [3. 2.]`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 1: Vectors"
      moduleSlug="01-vectors"
      lessonTitle="Linear Combinations"
      lessonNumber="1.4"
      prev={{ href: "/lessons/vectors/scalar-multiplication", title: "Scalar Multiplication" }}
      next={{ href: "/lessons/vectors/span", title: "Span" }}
      prose={<Prose />}
      canvas={<LinearCombinations />}
    />
  );
}
