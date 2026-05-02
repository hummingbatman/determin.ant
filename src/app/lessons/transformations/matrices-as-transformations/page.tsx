import { LessonLayout } from "@/components/ui/LessonLayout";
import { MatrixTransform } from "@/components/canvas/MatrixTransform";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> OpenGL and WebGL pass 4×4 matrices to the
        GPU for every object on screen. In PyTorch, a <code>nn.Linear</code> layer is
        literally a matrix multiplication. Every image transformation in Photoshop —
        rotate, scale, skew — is a matrix applied to pixel coordinates.
      </div>

      <p>
        Last lesson you saw that a linear transformation is fully determined
        by where <Math tex="\hat{\imath}" /> and <Math tex="\hat{\jmath}" /> land.
        A matrix is just the most compact way to write that down.
      </p>

      <h2>Reading a matrix</h2>

      <p>
        A 2×2 matrix stores exactly two things: the new home of{" "}
        <Math tex="\hat{\imath}" /> in the <strong>first column</strong>, and
        the new home of <Math tex="\hat{\jmath}" /> in the <strong>second column</strong>.
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\begin{bmatrix} a & b \\ c & d \end{bmatrix} \quad \hat{\imath} \to \begin{bmatrix}a\\c\end{bmatrix} \quad \hat{\jmath} \to \begin{bmatrix}b\\d\end{bmatrix}" block />
      </div>

      <p>
        The rotation by 90° matrix is a good example:{" "}
        <Math tex="\hat{\imath} = [1,0]" /> lands at <Math tex="[0,1]" /> (straight up),
        and <Math tex="\hat{\jmath} = [0,1]" /> lands at <Math tex="[-1,0]" /> (pointing left):
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}" block />
      </div>

      <h2>Applying the transformation</h2>

      <p>
        To transform a vector <Math tex="[x,\ y]" />, use the matrix columns
        as scaled versions of where the basis vectors went:
      </p>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.1rem" }}>
        <Math tex="\begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = x \begin{bmatrix}a\\c\end{bmatrix} + y \begin{bmatrix}b\\d\end{bmatrix} = \begin{bmatrix}ax+by\\cx+dy\end{bmatrix}" block />
      </div>

      <p>
        It's a linear combination — x copies of where î landed, plus y copies
        of where ĵ landed. That's matrix-vector multiplication, fully explained.
      </p>

      <div className="callout">
        Try the <strong>Rotate 90°</strong> preset, then manually type the numbers into
        the matrix. Then try <strong>Shear</strong> — notice how vertical lines stay
        vertical but horizontal ones tilt. Every entry in the matrix has a geometric meaning.
      </div>

      <h2>The determinant preview</h2>

      <p>
        Below the matrix editor you'll see a <strong>determinant</strong> value.
        This number measures how much the transformation scales area.
        Determinant 2 means areas double. Determinant −1 means areas stay the same
        but orientation flips. Determinant 0 means the transformation collapses
        the entire plane down to a line — or even a point.
      </p>

      <p>
        We'll spend a full module on determinants. For now, just notice how it
        changes as you edit the matrix.
      </p>

      <h2>In code</h2>

      <div className="callout callout-cs">
        <pre><code>{`import numpy as np

# Rotation by 90°
M = np.array([[0, -1],
              [1,  0]])

v = np.array([3, 1])
print(M @ v)   # [-1  3]  — matrix-vector multiply`}</code></pre>
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}>
          The <code>@</code> operator is matrix multiplication in NumPy.
          <code>M @ v</code> applies the transformation M to the vector v.
        </p>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 2: Transformations"
      moduleSlug="02-transformations"
      lessonTitle="Matrices as Transformations"
      lessonNumber="2.2"
      prev={{ href: "/lessons/transformations/what-is-a-transformation", title: "What is a Transformation?" }}
      next={{ href: "/lessons/transformations/composition", title: "Composition" }}
      prose={<Prose />}
      canvas={<MatrixTransform />}
    />
  );
}
