"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { MatrixEditor } from "./MatrixEditor";
import { determinant } from "@/lib/math/mat2";
import { rotation, scaling, shearX } from "@/lib/math/transforms";
import { identity } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";

function r3(n: number) { return Math.round(n * 1000) / 1000; }

const PRESETS = [
  { name: "Identity", value: identity() as Mat2 },
  { name: "Scale ×2", value: scaling(2, 2) as Mat2 },
  { name: "Scale ×0.5", value: scaling(0.5, 0.5) as Mat2 },
  { name: "Stretch", value: scaling(3, 1) as Mat2 },
  { name: "Rotate 45°", value: rotation(Math.PI / 4) as Mat2 },
  { name: "Shear", value: shearX(2) as Mat2 },
  { name: "Flip", value: [-1, 0, 0, 1] as Mat2 },
  { name: "Singular", value: [1, 2, 0.5, 1] as Mat2 },
];

export function DeterminantArea() {
  const [matrix, setMatrix] = useState<Mat2>([2, 1, 0, 1.5]);
  const det = determinant(matrix);

  const absArea = Math.abs(det);
  const flipped = det < 0;
  const collapsed = Math.abs(det) < 0.01;

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        the unit square becomes a parallelogram — its area is |det|
      </div>

      <div style={{ position: "relative" }}>
        <TransformGrid matrix={matrix} width={480} height={360} showBasisVectors />

        {/* Area badge overlay */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: "rgba(255,255,255,0.92)", border: "1px solid var(--border)",
          borderRadius: "8px", padding: "0.4rem 0.75rem",
          fontFamily: "monospace", fontSize: "0.85rem",
        }}>
          <span style={{ color: "var(--text-muted)" }}>|det| = </span>
          <span style={{
            fontWeight: 700,
            color: collapsed ? "#b45309" : flipped ? "#db2777" : "#15803d",
            fontSize: "1rem",
          }}>
            {r3(absArea)}
          </span>
          {flipped && <span style={{ color: "#db2777", fontSize: "0.75rem", marginLeft: "0.4rem" }}>↺ flipped</span>}
          {collapsed && <span style={{ color: "#b45309", fontSize: "0.75rem", marginLeft: "0.4rem" }}>collapsed</span>}
        </div>
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "0.75rem",
      }}>
        <MatrixEditor value={matrix} onChange={setMatrix} presets={PRESETS} />

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.65rem", fontFamily: "monospace", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div>
            <span style={{ color: "var(--text-muted)" }}>det(A) = ad − bc = </span>
            <span style={{ fontWeight: 700, color: collapsed ? "#b45309" : flipped ? "#db2777" : "#15803d" }}>
              {r3(det)}
            </span>
          </div>
          <div style={{ color: "var(--text-faint)", fontSize: "0.78rem" }}>
            {r3(matrix[0])} × {r3(matrix[3])} − {r3(matrix[1])} × {r3(matrix[2])} = {r3(det)}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            {collapsed
              ? "Area = 0 — the plane collapsed to a line"
              : `Unit square area 1 → ${r3(absArea)}${flipped ? " (orientation reversed)" : ""}`}
          </div>
        </div>
      </div>
    </div>
  );
}
