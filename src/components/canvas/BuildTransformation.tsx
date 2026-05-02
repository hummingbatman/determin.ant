"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { MatrixEditor } from "./MatrixEditor";
import { rotation, scaling, shearX, shearY, reflection } from "@/lib/math/transforms";
import { identity, determinant, inverse } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";

function r2(n: number) { return Math.round(n * 100) / 100; }

const QUICK: { name: string; value: Mat2 }[] = [
  { name: "Identity", value: identity() },
  { name: "Rotate 30°", value: rotation(Math.PI / 6) },
  { name: "Rotate 90°", value: rotation(Math.PI / 2) },
  { name: "Scale ×2", value: scaling(2, 2) },
  { name: "Squash", value: scaling(1.5, 0.5) },
  { name: "Shear X", value: shearX(1) },
  { name: "Shear Y", value: shearY(1) },
  { name: "Reflect x", value: reflection([1, 0]) },
  { name: "Reflect y=x", value: reflection([1, 1]) },
  { name: "Singular", value: [1, 2, 0.5, 1] },
];

export function BuildTransformation() {
  const [matrix, setMatrix] = useState<Mat2>([1, 0, 0, 1]);
  const det = r2(determinant(matrix));
  const inv = inverse(matrix);

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        free sandbox — type any values, try the presets
      </div>

      <TransformGrid matrix={matrix} width={480} height={320} />

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "0.875rem",
      }}>
        <MatrixEditor value={matrix} onChange={setMatrix} presets={QUICK} />

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.65rem", display: "flex", flexDirection: "column", gap: "0.3rem", fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <span style={{ color: "var(--text-muted)" }}>
              det = <span style={{ color: Number(det) < 0 ? "#db2777" : Number(det) === 0 ? "#b45309" : "#15803d", fontWeight: 600 }}>{det}</span>
            </span>
            <span style={{ color: "var(--text-muted)" }}>
              {Number(det) === 0
                ? "not invertible"
                : `invertible · det(A⁻¹) = ${r2(1 / Number(det))}`}
            </span>
          </div>
          {inv && (
            <div style={{ color: "var(--text-faint)", fontSize: "0.78rem" }}>
              A⁻¹ = [{r2(inv[0])}, {r2(inv[1])}; {r2(inv[2])}, {r2(inv[3])}]
            </div>
          )}
          {!inv && (
            <div style={{ color: "#b45309", fontSize: "0.78rem" }}>
              ⚠ Singular matrix — no inverse exists
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
