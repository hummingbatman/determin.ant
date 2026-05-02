import { LessonLayout } from "@/components/ui/LessonLayout";
import { TransformationIntro } from "@/components/canvas/TransformationIntro";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every time a 3D game rotates a character,
        a photo app applies a filter, or a self-driving car maps sensor data to a different
        coordinate frame — a linear transformation is happening. They're the engine behind
        computer graphics, robotics, and most of deep learning.
      </div>

      <p>
        You've learned what vectors are. Now imagine taking every single vector
        in the plane — every arrow starting from the origin — and <em>moving</em> them
        all at once according to some rule. That's a <strong>linear transformation</strong>.
      </p>

      <h2>Think of it as moving space</h2>

      <p>
        A transformation doesn't just move individual arrows. It moves the entire
        coordinate grid — every point, every line, every vector. Watch the green grid
        in the interactive as you try different transformations.
      </p>

      <p>
        Notice what stays the same regardless of which transformation you pick:
      </p>

      <ul>
        <li>Grid lines remain <strong>straight</strong> — they don't curve or bend</li>
        <li>Parallel lines remain <strong>parallel</strong></li>
        <li>The <strong>origin stays fixed</strong> — it never moves</li>
      </ul>

      <p>
        These three properties are exactly what makes a transformation <em>linear</em>.
        Any function that preserves straight lines and keeps the origin in place is linear.
      </p>

      <h2>The key insight: just track the basis vectors</h2>

      <p>
        Here's the remarkable thing. Because the transformation is linear, you only
        need to know where two special vectors go — and everything else follows automatically.
      </p>

      <p>
        Those two special vectors are <Math tex="\hat{\imath} = [1,\ 0]" /> (one step right)
        and <Math tex="\hat{\jmath} = [0,\ 1]" /> (one step up). They're called the
        <strong> basis vectors</strong>.
      </p>

      <p>
        Any vector <Math tex="[x,\ y]" /> can be written as{" "}
        <Math tex="x\,\hat{\imath} + y\,\hat{\jmath}" />.
        So once you know where <Math tex="\hat{\imath}" /> and <Math tex="\hat{\jmath}" /> land,
        linearity tells you where <em>every</em> vector lands.
      </p>

      <div className="callout">
        Watch the <span style={{ color: "#0284c7", fontWeight: 600 }}>blue (î)</span> and{" "}
        <span style={{ color: "#db2777", fontWeight: 600 }}>pink (ĵ)</span> arrows as you
        switch transformations. The whole grid follows them — wherever those two arrows go,
        everything else follows.
      </div>

      <h2>What doesn't count as a linear transformation</h2>

      <p>
        Translations (shifting everything sideways) are <em>not</em> linear — they
        move the origin. Squaring coordinates is not linear — it curves straight lines.
        Anything that bends lines or moves the origin is out.
      </p>

      <h2>Why matrices</h2>

      <p>
        Since you only need to record where <Math tex="\hat{\imath}" /> and{" "}
        <Math tex="\hat{\jmath}" /> land, you can store an entire transformation
        in just four numbers — the two components of each destination.
        That's exactly what a matrix is: a compact description of a linear transformation.
        We'll build that connection in the next lesson.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 2: Transformations"
      moduleSlug="02-transformations"
      lessonTitle="What is a Transformation?"
      lessonNumber="2.1"
      prev={{ href: "/lessons/vectors/span", title: "Span" }}
      next={{ href: "/lessons/transformations/matrices-as-transformations", title: "Matrices as Transformations" }}
      prose={<Prose />}
      canvas={<TransformationIntro />}
    />
  );
}
