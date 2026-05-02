"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { MatrixEditor } from "./MatrixEditor";
import { rotation, scaling, shearX, reflection } from "@/lib/math/transforms";
import { identity } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import { determinant } from "@/lib/math/mat2";

function r2(n: number) { return Math.round(n * 100) / 100; }

const PRESETS = [
  { name: "Identity", value: identity() as Mat2 },
  { name: "Rotate 90°", value: rotation(Math.PI / 2) as Mat2 },
  { name: "Scale ×2", value: scaling(2, 2) as Mat2 },
  { name: "Shear", value: shearX(1) as Mat2 },
  { name: "Reflect y-axis", value: reflection([0, 1]) as Mat2 },
];

export function MatrixTransform() {
  const [matrix, setMatrix] = useState<Mat2>([1, 0, 0, 1]);
  const det = determinant(matrix);

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        edit the matrix — the grid deforms in real time
      </div>

      <TransformGrid matrix={matrix} width={480} height={360} />

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "0.75rem",
      }}>
        <MatrixEditor value={matrix} onChange={setMatrix} presets={PRESETS} />

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.65rem", fontFamily: "monospace", fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", gap: "1.5rem" }}>
          <span>det = <span style={{ color: det < 0 ? "#db2777" : det === 0 ? "#b45309" : "#15803d", fontWeight: 600 }}>{r2(det)}</span></span>
          <span style={{ fontSize: "0.78rem" }}>
            {det === 0 ? "singular — collapses space" : det < 0 ? "orientation flipped" : "orientation preserved"}
          </span>
        </div>
      </div>
    </div>
  );
}
