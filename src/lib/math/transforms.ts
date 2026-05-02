import type { Mat2 } from "./mat2";
import type { Vec2 } from "./vec2";
import { dot, norm, EPSILON } from "./vec2";

export function rotation(theta: number): Mat2 {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return [c, -s, s, c];
}

export function scaling(sx: number, sy: number): Mat2 {
  return [sx, 0, 0, sy];
}

export function shearX(k: number): Mat2 {
  return [1, k, 0, 1];
}

export function shearY(k: number): Mat2 {
  return [1, 0, k, 1];
}

/** Reflection across a line through the origin defined by direction vector */
export function reflection(axis: Vec2): Mat2 {
  const n = norm(axis);
  if (n < EPSILON) return [1, 0, 0, 1];
  const [ux, uy] = [axis[0] / n, axis[1] / n];
  return [
    2 * ux * ux - 1,
    2 * ux * uy,
    2 * ux * uy,
    2 * uy * uy - 1,
  ];
}

/** Orthogonal projection onto a line through origin */
export function projection(onto: Vec2): Mat2 {
  const n = norm(onto);
  if (n < EPSILON) return [0, 0, 0, 0];
  const [ux, uy] = [onto[0] / n, onto[1] / n];
  return [ux * ux, ux * uy, ux * uy, uy * uy];
}
