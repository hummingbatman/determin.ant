# determin.ant

Interactive linear algebra — explained with pictures, not just equations.

**[determin.ant](https://determin-ant.vercel.app)** is a free, open-source learning website for people who want to actually understand linear algebra. Every concept is interactive: drag vectors, watch matrices transform space, build intuition before formulas.

---

## Who is this for?

- **Complete beginners** — starts from zero, no prerequisites
- **CS undergrads** — connects every idea to code (Python/NumPy examples throughout)
- **ML practitioners** — finally understand why matrices multiply the way they do

---

## Course content

\*\*8 modules · 38 lessons · all free\*\*

| Module | Lessons |
|--------|---------|
| 01 · Vectors | What is a vector? · Vector addition · Scalar multiplication · Linear combinations · Span |
| 02 · Transformations | What is a transformation? · Matrices as transformations · Composition · The transformation zoo · Build your own |
| 03 · Systems of Equations | Geometric interpretation · Gaussian elimination · Types of solutions |
| 04 · Determinants | Area scaling · The zero determinant · Invertibility |
| 05 · Vector Spaces | Basis and dimension · Column, null, and row space · Rank |
| 06 · Eigenvalues | Eigenvectors — the intuition · The characteristic polynomial · Diagonalization |
| 07 · Orthogonality | Dot product · Projection · Gram-Schmidt · Least squares |
| 08 · SVD | Rotate, stretch, rotate · SVD explorer · Image compression |

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- TypeScript
- [KaTeX](https://katex.org) for math rendering
- [Vitest](https://vitest.dev) for unit tests (`npm test`)
- Pure TypeScript math library — no external linear algebra dependencies
- SVG-based interactive canvases

---

## Running tests

```bash
npm test
```

62 tests covering `vec2`, `mat2`, `transforms`, and `solvers`.

---

## License

MIT
