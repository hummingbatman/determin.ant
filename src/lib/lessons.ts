export interface LessonMeta {
  number: string;
  title: string;
  href: string;
}

export interface ModuleMeta {
  slug: string;
  title: string;
  lessons: LessonMeta[];
}

export const MODULES: ModuleMeta[] = [
  {
    slug: "01-vectors",
    title: "Module 1: Vectors",
    lessons: [
      { number: "1.1", title: "What is a vector?", href: "/lessons/vectors/what-is-a-vector" },
      { number: "1.2", title: "Vector Addition", href: "/lessons/vectors/vector-addition" },
      { number: "1.3", title: "Scalar Multiplication", href: "/lessons/vectors/scalar-multiplication" },
      { number: "1.4", title: "Linear Combinations", href: "/lessons/vectors/linear-combinations" },
      { number: "1.5", title: "Span", href: "/lessons/vectors/span" },
      { number: "1.6", title: "Linear Independence", href: "/lessons/vectors/linear-independence" },
      { number: "1.7", title: "Cross Product", href: "/lessons/vectors/cross-product" },
    ],
  },
  {
    slug: "02-transformations",
    title: "Module 2: Transformations",
    lessons: [
      { number: "2.1", title: "What is a Transformation?", href: "/lessons/transformations/what-is-a-transformation" },
      { number: "2.2", title: "Matrices as Transformations", href: "/lessons/transformations/matrices-as-transformations" },
      { number: "2.3", title: "Composition", href: "/lessons/transformations/composition" },
      { number: "2.4", title: "The Transformation Zoo", href: "/lessons/transformations/transformation-zoo" },
      { number: "2.5", title: "Build a Transformation", href: "/lessons/transformations/build-a-transformation" },
    ],
  },
  {
    slug: "03-systems",
    title: "Module 3: Systems of Equations",
    lessons: [
      { number: "3.1", title: "Geometric Interpretation", href: "/lessons/systems/geometric-interpretation" },
      { number: "3.2", title: "Gaussian Elimination", href: "/lessons/systems/gaussian-elimination" },
      { number: "3.3", title: "LU Decomposition", href: "/lessons/systems/lu-decomposition" },
      { number: "3.4", title: "Solution Types", href: "/lessons/systems/solution-types" },
    ],
  },
  {
    slug: "04-determinants",
    title: "Module 4: Determinants",
    lessons: [
      { number: "4.1", title: "Area Scaling", href: "/lessons/determinants/area-scaling" },
      { number: "4.2", title: "The Zero Determinant", href: "/lessons/determinants/zero-determinant" },
      { number: "4.3", title: "Invertibility", href: "/lessons/determinants/invertibility" },
    ],
  },
  {
    slug: "05-vector-spaces",
    title: "Module 5: Vector Spaces",
    lessons: [
      { number: "5.1", title: "Basis and Dimension", href: "/lessons/vector-spaces/basis-and-dimension" },
      { number: "5.2", title: "Column, Null, and Row Space", href: "/lessons/vector-spaces/column-null-row-space" },
      { number: "5.3", title: "Rank", href: "/lessons/vector-spaces/rank" },
      { number: "5.4", title: "Rank-Nullity Theorem", href: "/lessons/vector-spaces/rank-nullity" },
      { number: "5.5", title: "Change of Basis", href: "/lessons/vector-spaces/change-of-basis" },
    ],
  },
  {
    slug: "06-eigenvalues",
    title: "Module 6: Eigenvalues",
    lessons: [
      { number: "6.1", title: "Eigenvectors — the Intuition", href: "/lessons/eigenvalues/eigenvector-intuition" },
      { number: "6.2", title: "The Characteristic Polynomial", href: "/lessons/eigenvalues/characteristic-polynomial" },
      { number: "6.3", title: "Complex Eigenvalues", href: "/lessons/eigenvalues/complex-eigenvalues" },
      { number: "6.4", title: "Diagonalization", href: "/lessons/eigenvalues/diagonalization" },
      { number: "6.5", title: "Positive Definite Matrices", href: "/lessons/eigenvalues/positive-definite" },
      { number: "6.6", title: "Markov Chains", href: "/lessons/eigenvalues/markov-chains" },
    ],
  },
  {
    slug: "07-orthogonality",
    title: "Module 7: Orthogonality",
    lessons: [
      { number: "7.1", title: "Dot Product", href: "/lessons/orthogonality/dot-product" },
      { number: "7.2", title: "Projection", href: "/lessons/orthogonality/projection" },
      { number: "7.3", title: "Gram-Schmidt", href: "/lessons/orthogonality/gram-schmidt" },
      { number: "7.4", title: "Least Squares", href: "/lessons/orthogonality/least-squares" },
    ],
  },
  {
    slug: "08-svd",
    title: "Module 8: SVD",
    lessons: [
      { number: "8.1", title: "Rotate, Stretch, Rotate", href: "/lessons/svd/rotate-stretch-rotate" },
      { number: "8.2", title: "SVD Explorer", href: "/lessons/svd/svd-explorer" },
      { number: "8.3", title: "Matrix Norms", href: "/lessons/svd/matrix-norms" },
      { number: "8.4", title: "Image Compression", href: "/lessons/svd/image-compression" },
    ],
  },
];

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find(m => m.slug === slug);
}

export const ALL_LESSONS: LessonMeta[] = MODULES.flatMap(m => m.lessons);
