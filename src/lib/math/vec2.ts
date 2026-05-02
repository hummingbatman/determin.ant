export type Vec2 = [number, number];

export const EPSILON = 1e-10;

export function add(a: Vec2, b: Vec2): Vec2 {
  return [a[0] + b[0], a[1] + b[1]];
}

export function sub(a: Vec2, b: Vec2): Vec2 {
  return [a[0] - b[0], a[1] - b[1]];
}

export function scale(v: Vec2, s: number): Vec2 {
  return [v[0] * s, v[1] * s];
}

export function dot(a: Vec2, b: Vec2): number {
  return a[0] * b[0] + a[1] * b[1];
}

export function norm(v: Vec2): number {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

export function normalize(v: Vec2): Vec2 {
  const n = norm(v);
  if (n < EPSILON) return [0, 0];
  return [v[0] / n, v[1] / n];
}

/** Angle from the +x axis, in radians. Range: (-π, π] */
export function angle(v: Vec2): number {
  return Math.atan2(v[1], v[0]);
}

/** Angle between two vectors, in radians. Range: [0, π] */
export function angleBetween(a: Vec2, b: Vec2): number {
  const na = norm(a);
  const nb = norm(b);
  if (na < EPSILON || nb < EPSILON) return 0;
  const cosTheta = dot(a, b) / (na * nb);
  return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
}

/** Projection of a onto onto */
export function project(a: Vec2, onto: Vec2): Vec2 {
  const d = dot(onto, onto);
  if (d < EPSILON) return [0, 0];
  return scale(onto, dot(a, onto) / d);
}

/** 90° CCW rotation */
export function perpendicular(v: Vec2): Vec2 {
  return [-v[1], v[0]];
}
