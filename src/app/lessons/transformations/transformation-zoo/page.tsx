import { LessonLayout } from "@/components/ui/LessonLayout";
import { TransformationZoo } from "@/components/canvas/TransformationZoo";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> every transformation type has a direct
        application — rotations in robotics and 3D graphics, shears in typography and
        italicised text rendering, projections in shadow calculations and PCA, reflections
        in symmetry detection and data augmentation for ML.
      </div>

      <p>
        You've built the vocabulary. Now let's meet the whole family.
        There are a handful of named transformations that appear over and over —
        in graphics, physics, machine learning, and geometry.
      </p>

      <h2>The named transformations</h2>

      <h3>Rotation</h3>
      <p>
        Spins every point around the origin by angle <Math tex="\theta" />.
        Lengths and angles are perfectly preserved. The determinant is always 1.
      </p>

      <h3>Scaling</h3>
      <p>
        Uniform scaling zooms everything in or out. Non-uniform scaling
        stretches one axis more than another — turning circles into ellipses.
      </p>

      <h3>Shear</h3>
      <p>
        Tilts one axis while leaving the other in place. Think of slanting
        a stack of cards — each card slides a little more than the one below.
        Parallel lines stay parallel; right angles don't stay right.
      </p>

      <h3>Reflection</h3>
      <p>
        Flips space across a line through the origin. The determinant is −1:
        area is preserved but orientation flips (clockwise becomes counter-clockwise).
      </p>

      <h3>Projection</h3>
      <p>
        Squashes everything onto a line. Every point is dropped perpendicularly
        onto that line. The determinant is 0 — information is permanently lost.
        You can't "un-project" back to where you came from.
      </p>

      <div className="callout">
        Explore each transformation in the interactive. Pay attention to the
        determinant for each one — it tells you whether space is expanded,
        compressed, flipped, or collapsed.
      </div>

      <h2>Combining them</h2>

      <p>
        Real-world transformations are usually combinations: a rotation followed
        by a non-uniform scale, or a shear followed by a reflection.
        Any combination of linear transformations is still linear — and can
        always be described by a single matrix.
      </p>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 2: Transformations"
      moduleSlug="02-transformations"
      lessonTitle="The Transformation Zoo"
      lessonNumber="2.4"
      prev={{ href: "/lessons/transformations/composition", title: "Composition" }}
      next={{ href: "/lessons/transformations/build-a-transformation", title: "Build a Transformation" }}
      prose={<Prose />}
      canvas={<TransformationZoo />}
    />
  );
}
