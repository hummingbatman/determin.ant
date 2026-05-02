import { LessonLayout } from "@/components/ui/LessonLayout";
import { BuildTransformation } from "@/components/canvas/BuildTransformation";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> engineers designing robot joints,
        graphics programmers building camera rigs, and ML researchers constructing
        custom layers all spend time with a blank matrix and a goal — they need to
        find the matrix that does exactly what they want. This is that skill.
      </div>

      <p>
        You've seen what matrices do. Now it's your turn to build one.
        This is a free sandbox — no instructions, no targets. Just a matrix
        editor and a grid. Experiment freely.
      </p>

      <h2>Challenges to try</h2>

      <h3>Challenge 1 — Rotate 45°</h3>
      <p>
        Can you enter the matrix that rotates the grid exactly 45°?
        The entries involve <Math tex="\cos 45° = \frac{\sqrt{2}}{2} \approx 0.707" />.
        Use the presets to check your answer.
      </p>

      <h3>Challenge 2 — Mirror across y = x</h3>
      <p>
        The line y = x runs diagonally. What matrix reflects everything
        across it? Hint: the blue and pink basis vectors swap places.
      </p>

      <h3>Challenge 3 — Make a singular matrix</h3>
      <p>
        Type values until the determinant hits 0. The grid should collapse
        to a line. Notice you can make many different "shapes" of collapse —
        the grid can fall onto any line through the origin.
      </p>

      <h3>Challenge 4 — Area ×3</h3>
      <p>
        Find a matrix whose determinant is exactly 3. There are infinitely
        many — it doesn't have to be a pure scale.
      </p>

      <h2>What to notice</h2>

      <ul>
        <li>Every column tells you where one basis vector lands</li>
        <li>The determinant tells you the area scaling factor</li>
        <li>When det = 0, the inverse disappears — the transformation is one-way</li>
        <li>Negative det means the grid "flips" — orientation reverses</li>
      </ul>

      <div className="callout">
        There's no wrong answer here. The more you play with this, the stronger
        your geometric intuition becomes. Intuition is the goal — formulas come later.
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 2: Transformations"
      moduleSlug="02-transformations"
      lessonTitle="Build a Transformation"
      lessonNumber="2.5"
      prev={{ href: "/lessons/transformations/transformation-zoo", title: "The Transformation Zoo" }}
      next={{ href: "/lessons/systems/geometric-interpretation", title: "Systems of Equations" }}
      prose={<Prose />}
      canvas={<BuildTransformation />}
    />
  );
}
