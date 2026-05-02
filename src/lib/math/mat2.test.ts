import { describe, it, expect } from "vitest";
import {
  identity, multiply, multiplyVec, determinant, inverse,
  transpose, trace, eigenvalues, eigenvectors,
} from "./mat2";
import { norm } from "./vec2";
import type { Mat2 } from "./mat2";

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;
const vecClose = (a: [number, number], b: [number, number]) =>
  close(a[0], b[0]) && close(a[1], b[1]);

describe("mat2", () => {
  describe("identity", () => {
    it("returns [1,0,0,1]", () => expect(identity()).toEqual([1, 0, 0, 1]));
    it("identity * v = v", () => expect(vecClose(multiplyVec(identity(), [3, 5]), [3, 5])).toBe(true));
  });

  describe("multiply", () => {
    it("identity * A = A", () => expect(multiply(identity(), [2, 3, 4, 5])).toEqual([2, 3, 4, 5]));
    it("A * identity = A", () => expect(multiply([2, 3, 4, 5], identity())).toEqual([2, 3, 4, 5]));
    it("[[1,2],[3,4]] * [[5,6],[7,8]]", () => {
      const A: Mat2 = [1, 2, 3, 4];
      const B: Mat2 = [5, 6, 7, 8];
      expect(multiply(A, B)).toEqual([19, 22, 43, 50]);
    });
    it("rotation 90° * rotation 90° = rotation 180°", () => {
      const R90: Mat2 = [0, -1, 1, 0];
      const R180 = multiply(R90, R90);
      expect(close(R180[0], -1)).toBe(true);
      expect(close(R180[1], 0)).toBe(true);
      expect(close(R180[2], 0)).toBe(true);
      expect(close(R180[3], -1)).toBe(true);
    });
  });

  describe("multiplyVec", () => {
    it("applies rotation 90° to [1,0] → [0,1]", () => {
      const result = multiplyVec([0, -1, 1, 0], [1, 0]);
      expect(close(result[0], 0)).toBe(true);
      expect(close(result[1], 1)).toBe(true);
    });
    it("scaling [2,0,0,3] * [1,1] = [2,3]", () => {
      expect(vecClose(multiplyVec([2, 0, 0, 3], [1, 1]), [2, 3])).toBe(true);
    });
  });

  describe("determinant", () => {
    it("det(identity) = 1", () => expect(determinant(identity())).toBe(1));
    it("det([[1,2],[3,4]]) = -2", () => expect(determinant([1, 2, 3, 4])).toBe(-2));
    it("det of singular matrix = 0", () => expect(determinant([1, 2, 2, 4])).toBe(0));
    it("det of rotation matrix = 1", () => expect(close(determinant([0, -1, 1, 0]), 1)).toBe(true));
    it("det of scaling matrix = sx*sy", () => expect(close(determinant([3, 0, 0, 4]), 12)).toBe(true));
  });

  describe("inverse", () => {
    it("inverse(identity) = identity", () => {
      const inv = inverse(identity())!;
      expect(inv).not.toBeNull();
      expect(close(inv[0], 1)).toBe(true);
      expect(close(inv[1], 0)).toBe(true);
      expect(close(inv[2], 0)).toBe(true);
      expect(close(inv[3], 1)).toBe(true);
    });
    it("A * A^-1 = identity", () => {
      const A: Mat2 = [2, 1, 1, 3];
      const inv = inverse(A)!;
      const prod = multiply(A, inv);
      expect(close(prod[0], 1)).toBe(true);
      expect(close(prod[1], 0)).toBe(true);
      expect(close(prod[2], 0)).toBe(true);
      expect(close(prod[3], 1)).toBe(true);
    });
    it("singular matrix returns null", () => expect(inverse([1, 2, 2, 4])).toBeNull());
    it("inverse of rotation is transpose", () => {
      const R90: Mat2 = [0, -1, 1, 0];
      const inv = inverse(R90)!;
      const tr = transpose(R90);
      expect(close(inv[0], tr[0])).toBe(true);
      expect(close(inv[3], tr[3])).toBe(true);
    });
  });

  describe("transpose", () => {
    it("transposes correctly", () => expect(transpose([1, 2, 3, 4])).toEqual([1, 3, 2, 4]));
    it("symmetric matrix unchanged", () => expect(transpose([1, 2, 2, 4])).toEqual([1, 2, 2, 4]));
    it("transpose of identity = identity", () => expect(transpose(identity())).toEqual(identity()));
  });

  describe("trace", () => {
    it("trace([[1,2],[3,4]]) = 5", () => expect(trace([1, 2, 3, 4])).toBe(5));
    it("trace(identity) = 2", () => expect(trace(identity())).toBe(2));
  });

  describe("eigenvalues", () => {
    it("identity has eigenvalues [1, 1]", () => {
      const evs = eigenvalues(identity())!;
      expect(close(evs[0], 1) && close(evs[1], 1)).toBe(true);
    });
    it("diagonal matrix has diagonal entries as eigenvalues", () => {
      const evs = eigenvalues([3, 0, 0, 5])!;
      const sorted = [evs[0], evs[1]].sort((a, b) => b - a);
      expect(close(sorted[0], 5)).toBe(true);
      expect(close(sorted[1], 3)).toBe(true);
    });
    it("rotation matrix has complex eigenvalues → null", () => {
      expect(eigenvalues([0, -1, 1, 0])).toBeNull();
    });
    it("symmetric matrix has real eigenvalues", () => {
      const evs = eigenvalues([2, 1, 1, 2]);
      expect(evs).not.toBeNull();
      const sorted = evs!.sort((a, b) => b - a);
      expect(close(sorted[0], 3)).toBe(true);
      expect(close(sorted[1], 1)).toBe(true);
    });
  });

  describe("eigenvectors", () => {
    it("returns null when eigenvalues are complex", () => {
      expect(eigenvectors([0, -1, 1, 0])).toBeNull();
    });
    it("eigenvectors satisfy Av = λv", () => {
      const A: Mat2 = [2, 1, 1, 2];
      const evPairs = eigenvectors(A)!;
      const evs = eigenvalues(A)!;
      for (let i = 0; i < 2; i++) {
        const v = evPairs[i];
        const Av = multiplyVec(A, v);
        const lambdaV: [number, number] = [evs[i] * v[0], evs[i] * v[1]];
        expect(close(Av[0], lambdaV[0])).toBe(true);
        expect(close(Av[1], lambdaV[1])).toBe(true);
      }
    });
    it("eigenvectors have non-zero norm", () => {
      const vecs = eigenvectors([3, 0, 0, 5])!;
      expect(norm(vecs[0]) > 1e-9).toBe(true);
      expect(norm(vecs[1]) > 1e-9).toBe(true);
    });
  });
});
