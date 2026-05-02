import { LessonLayout } from "@/components/ui/LessonLayout";
import { LUDecomposition } from "@/components/canvas/LUDecomposition";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> almost every serious linear algebra
        library (LAPACK, NumPy, MATLAB) solves systems using LU, not raw Gaussian
        elimination. When you call <code>np.linalg.solve</code>, it's doing LU
        decomposition under the hood. It's also the fastest way to compute
        determinants and inverses for large matrices.
      </div>

      <p>
        Gaussian elimination is an algorithm. LU decomposition records that algorithm
        as a matrix factorization — so you can reuse the work.
      </p>

      <h2>The idea</h2>

      <p>
        Every invertible matrix A can be written as:
      </p>
      <Math tex="A = LU" block />
      <p>
        where L is <strong>lower triangular</strong> with 1s on the diagonal, and U is
        <strong> upper triangular</strong>. These are exactly the two triangles produced
        by Gaussian elimination.
      </p>

      <h2>Where L and U come from</h2>

      <p>
        When you do Gaussian elimination on a 2×2 matrix:
      </p>
      <Math tex="\begin{bmatrix} a & b \\ c & d \end{bmatrix} \to \begin{bmatrix} a & b \\ 0 & d - \frac{c}{a}b \end{bmatrix}" block />

      <p>
        The multiplier <Math tex="m = c/a" /> is the number you used to eliminate c.
        It becomes the off-diagonal entry of L:
      </p>
      <Math tex="L = \begin{bmatrix} 1 & 0 \\ m & 1 \end{bmatrix}, \quad U = \begin{bmatrix} a & b \\ 0 & d - mb \end{bmatrix}" block />

      <h2>Why it matters</h2>

      <p>
        To solve <Math tex="A\mathbf{x} = \mathbf{b}" />, substitute A = LU:
      </p>
      <Math tex="LU\mathbf{x} = \mathbf{b} \quad \Rightarrow \quad L\mathbf{y} = \mathbf{b}, \quad U\mathbf{x} = \mathbf{y}" block />

      <p>
        Each sub-problem (forward substitution for Ly = b, back substitution for Ux = y)
        is trivial because the matrices are triangular. And if you need to solve with
        multiple right-hand sides b₁, b₂, …, you only factorize A once.
      </p>

      <div className="callout">
        LU = "do elimination once, solve many times."
        The factorization stores all the work; each new solve is cheap.
      </div>

      <h2>Pivoting</h2>

      <p>
        If the top-left entry is zero (or near-zero), the multiplier blows up.
        The fix is <strong>partial pivoting</strong>: swap rows to put the largest
        entry in the pivot position first. In practice, A = PLU where P is a
        permutation matrix recording the swaps.
      </p>

      <h2>Try it</h2>

      <p>
        Edit the matrix or pick a preset. The L and U factors update live.
        Notice that L always has 1s on the diagonal and zeros above,
        while U has zeros below. Their product reconstructs A exactly.
      </p>

      <div className="callout callout-cs">
        <strong>In SciPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`from scipy.linalg import lu
import numpy as np

A = np.array([[2., 1.], [4., 3.]])
P, L, U = lu(A)

print(L)  # lower triangular
print(U)  # upper triangular
print(np.allclose(P @ L @ U, A))  # True

# Efficient: solve multiple systems with same A
import scipy.linalg
lu_factor = scipy.linalg.lu_factor(A)
x1 = scipy.linalg.lu_solve(lu_factor, [1, 2])
x2 = scipy.linalg.lu_solve(lu_factor, [3, 4])`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 3: Systems of Equations"
      moduleSlug="03-systems"
      lessonTitle="LU Decomposition"
      lessonNumber="3.3"
      prev={{ href: "/lessons/systems/gaussian-elimination", title: "Gaussian Elimination" }}
      next={{ href: "/lessons/systems/solution-types", title: "Solution Types" }}
      prose={<Prose />}
      canvas={<LUDecomposition />}
    />
  );
}
