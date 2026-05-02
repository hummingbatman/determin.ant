import { describe, it, expect } from "vitest";
import {
  add, sub, scale, dot, norm, normalize,
  angle, angleBetween, project, perpendicular,
  EPSILON,
} from "./vec2";

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;

describe("vec2", () => {
  describe("add", () => {
    it("adds two vectors", () => expect(add([1, 2], [3, 4])).toEqual([4, 6]));
    it("adds zero vector", () => expect(add([1, 2], [0, 0])).toEqual([1, 2]));
    it("adds negative components", () => expect(add([1, -2], [-3, 4])).toEqual([-2, 2]));
  });

  describe("sub", () => {
    it("subtracts two vectors", () => expect(sub([4, 6], [1, 2])).toEqual([3, 4]));
    it("subtracts self = zero", () => expect(sub([3, 5], [3, 5])).toEqual([0, 0]));
  });

  describe("scale", () => {
    it("scales by positive scalar", () => expect(scale([2, 3], 2)).toEqual([4, 6]));
    it("scales by zero", () => expect(scale([2, 3], 0)).toEqual([0, 0]));
    it("scales by negative scalar", () => expect(scale([2, 3], -1)).toEqual([-2, -3]));
  });

  describe("dot", () => {
    it("dot product of perpendicular vectors is 0", () => expect(dot([1, 0], [0, 1])).toBe(0));
    it("dot product of parallel vectors", () => expect(dot([2, 0], [3, 0])).toBe(6));
    it("standard case", () => expect(dot([1, 2], [3, 4])).toBe(11));
  });

  describe("norm", () => {
    it("norm of unit vector is 1", () => expect(norm([1, 0])).toBe(1));
    it("norm of zero vector is 0", () => expect(norm([0, 0])).toBe(0));
    it("norm of [3, 4] is 5", () => expect(norm([3, 4])).toBe(5));
    it("norm of [-3, -4] is 5", () => expect(norm([-3, -4])).toBe(5));
  });

  describe("normalize", () => {
    it("normalizes [3, 4] to [0.6, 0.8]", () => {
      const [x, y] = normalize([3, 4]);
      expect(close(x, 0.6)).toBe(true);
      expect(close(y, 0.8)).toBe(true);
    });
    it("normalized vector has norm 1", () => expect(close(norm(normalize([2, 7])), 1)).toBe(true));
    it("zero vector returns [0, 0]", () => expect(normalize([0, 0])).toEqual([0, 0]));
  });

  describe("angle", () => {
    it("+x axis → 0", () => expect(close(angle([1, 0]), 0)).toBe(true));
    it("+y axis → π/2", () => expect(close(angle([0, 1]), Math.PI / 2)).toBe(true));
    it("-x axis → π", () => expect(close(Math.abs(angle([-1, 0])), Math.PI)).toBe(true));
    it("-y axis → -π/2", () => expect(close(angle([0, -1]), -Math.PI / 2)).toBe(true));
  });

  describe("angleBetween", () => {
    it("same direction → 0", () => expect(close(angleBetween([1, 0], [2, 0]), 0)).toBe(true));
    it("perpendicular → π/2", () => expect(close(angleBetween([1, 0], [0, 1]), Math.PI / 2)).toBe(true));
    it("opposite → π", () => expect(close(angleBetween([1, 0], [-1, 0]), Math.PI)).toBe(true));
    it("zero vector returns 0", () => expect(angleBetween([0, 0], [1, 0])).toBe(0));
  });

  describe("project", () => {
    it("projects [1,1] onto x-axis → [1,0]", () => {
      const [x, y] = project([1, 1], [1, 0]);
      expect(close(x, 1)).toBe(true);
      expect(close(y, 0)).toBe(true);
    });
    it("projects [3,4] onto [1,0] → [3,0]", () => {
      const [x, y] = project([3, 4], [1, 0]);
      expect(close(x, 3)).toBe(true);
      expect(close(y, 0)).toBe(true);
    });
    it("projection onto zero vector → [0,0]", () => expect(project([1, 1], [0, 0])).toEqual([0, 0]));
  });

  describe("perpendicular", () => {
    it("rotates [1, 0] to [0, 1]", () => {
      const [x, y] = perpendicular([1, 0]);
      expect(close(x, 0)).toBe(true);
      expect(close(y, 1)).toBe(true);
    });
    it("rotates [0, 1] to [-1, 0]", () => {
      const [x, y] = perpendicular([0, 1]);
      expect(close(x, -1)).toBe(true);
      expect(close(y, 0)).toBe(true);
    });
    it("preserves magnitude", () => expect(close(norm(perpendicular([3, 4])), norm([3, 4]))).toBe(true));
    it("result is perpendicular to input", () => expect(close(dot([3, 4], perpendicular([3, 4])), 0)).toBe(true));
  });
});
