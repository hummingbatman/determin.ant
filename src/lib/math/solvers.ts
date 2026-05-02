import { EPSILON } from "./vec2";

export type AugmentedRow = [number, number, number]; // [a, b, | c]  for ax + by = c

export interface EliminationStep {
  matrix: [AugmentedRow, AugmentedRow];
  description: string;
  operation: "swap" | "scale" | "add" | "none";
}

export type SolutionType = "unique" | "none" | "infinite";

export interface Solution {
  type: SolutionType;
  x?: number;
  y?: number;
}

/** Run Gaussian elimination on a 2×2 system, returning each step */
export function gaussianElimination2x2(
  row1: AugmentedRow,
  row2: AugmentedRow
): { steps: EliminationStep[]; solution: Solution } {
  const steps: EliminationStep[] = [];
  let [a, b, e] = [...row1] as AugmentedRow;
  let [c, d, f] = [...row2] as AugmentedRow;

  const snap = (n: number) => Math.round(n * 1e9) / 1e9;

  function push(desc: string, op: EliminationStep["operation"]) {
    steps.push({
      matrix: [[snap(a), snap(b), snap(e)], [snap(c), snap(d), snap(f)]],
      description: desc,
      operation: op,
    });
  }

  push("Starting system", "none");

  // Swap rows if needed to get largest pivot first
  if (Math.abs(a) < Math.abs(c)) {
    [a, b, e, c, d, f] = [c, d, f, a, b, e];
    push("Swap R₁ ↔ R₂ (larger pivot first)", "swap");
  }

  // Check for zero pivot
  if (Math.abs(a) < EPSILON) {
    if (Math.abs(c) < EPSILON) {
      // Both zero in first column
      if (Math.abs(b) < EPSILON && Math.abs(d) < EPSILON) {
        push("System is 0 = 0 — infinitely many solutions", "none");
        return { steps, solution: { type: "infinite" } };
      }
      push("No x-coefficient — degenerate system", "none");
      return { steps, solution: { type: "none" } };
    }
  }

  // Eliminate x from row 2
  if (Math.abs(a) > EPSILON) {
    const factor = snap(c / a);
    if (Math.abs(factor) > EPSILON) {
      c = snap(c - factor * a);
      d = snap(d - factor * b);
      f = snap(f - factor * e);
      push(`R₂ → R₂ − (${factor}) × R₁`, "add");
    }
  }

  // Now row 2 is [0, d, f] — check pivot
  if (Math.abs(d) < EPSILON) {
    if (Math.abs(f) < EPSILON) {
      push("Row 2 is 0 = 0 — infinitely many solutions", "none");
      return { steps, solution: { type: "infinite" } };
    } else {
      push(`Row 2 is 0 = ${snap(f)} — contradiction, no solution`, "none");
      return { steps, solution: { type: "none" } };
    }
  }

  // Back-substitute
  const y = snap(f / d);
  push(`Solve R₂: y = ${f} / ${d} = ${y}`, "scale");

  const x = snap((e - b * y) / a);
  push(`Back-substitute into R₁: x = (${e} − ${snap(b)} × ${y}) / ${a} = ${x}`, "add");

  return { steps, solution: { type: "unique", x, y } };
}

/** Solve 2×2 system directly (no steps) */
export function solve2x2(row1: AugmentedRow, row2: AugmentedRow): Solution {
  return gaussianElimination2x2(row1, row2).solution;
}
