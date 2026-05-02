import type { Vec2 } from "./vec2";
import { EPSILON } from "./vec2";

/** Row-major: [a, b, c, d] = [[a, b], [c, d]] */
export type Mat2 = [number, number, number, number];

export function identity(): Mat2 {
  return [1, 0, 0, 1];
}

export function multiply(A: Mat2, B: Mat2): Mat2 {
  const [a, b, c, d] = A;
  const [e, f, g, h] = B;
  return [
    a * e + b * g,
    a * f + b * h,
    c * e + d * g,
    c * f + d * h,
  ];
}

export function multiplyVec(A: Mat2, v: Vec2): Vec2 {
  const [a, b, c, d] = A;
  return [a * v[0] + b * v[1], c * v[0] + d * v[1]];
}

export function determinant(A: Mat2): number {
  return A[0] * A[3] - A[1] * A[2];
}

export function inverse(A: Mat2): Mat2 | null {
  const det = determinant(A);
  if (Math.abs(det) < EPSILON) return null;
  const [a, b, c, d] = A;
  const invDet = 1 / det;
  return [d * invDet, -b * invDet, -c * invDet, a * invDet];
}

export function transpose(A: Mat2): Mat2 {
  return [A[0], A[2], A[1], A[3]];
}

export function trace(A: Mat2): number {
  return A[0] + A[3];
}

/**
 * Real eigenvalues of a 2×2 matrix via the characteristic polynomial.
 * Returns null if eigenvalues are complex.
 */
export function eigenvalues(A: Mat2): [number, number] | null {
  const t = trace(A);
  const d = determinant(A);
  const discriminant = t * t - 4 * d;
  if (discriminant < 0) return null;
  const sqrtDisc = Math.sqrt(discriminant);
  return [(t + sqrtDisc) / 2, (t - sqrtDisc) / 2];
}

/**
 * Eigenvectors corresponding to real eigenvalues.
 * Returns null if eigenvalues are complex.
 */
export function eigenvectors(A: Mat2): [Vec2, Vec2] | null {
  const evs = eigenvalues(A);
  if (evs === null) return null;

  const [l1, l2] = evs;

  function eigenvectorFor(lambda: number): Vec2 {
    const [a, b, c, d] = A;
    // (A - λI)v = 0 — find a non-zero vector in the null space
    const r0: Vec2 = [a - lambda, b];
    const r1: Vec2 = [c, d - lambda];

    // Pick the row with larger magnitude to avoid near-zero pivots
    if (Math.abs(r0[0]) > Math.abs(r1[0])) {
      if (Math.abs(r0[0]) > EPSILON) return [-r0[1], r0[0]];
      return [1, 0];
    } else {
      if (Math.abs(r1[0]) > EPSILON) return [-r1[1], r1[0]];
      return [1, 0];
    }
  }

  return [eigenvectorFor(l1), eigenvectorFor(l2)];
}
