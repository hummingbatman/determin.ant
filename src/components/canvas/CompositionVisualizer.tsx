"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { MatrixEditor } from "./MatrixEditor";
import { multiply, determinant } from "@/lib/math/mat2";
import { rotation, scaling, shearX } from "@/lib/math/transforms";
import { identity } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";

function r2(n: number) { return Math.round(n * 100) / 100; }

const PRESETS: { name: string; value: Mat2 }[] = [
  { name: "Identity", value: identity() },
  { name: "Rotate 45°", value: rotation(Math.PI / 4) },
  { name: "Rotate 90°", value: rotation(Math.PI / 2) },
  { name: "Scale ×2", value: scaling(2, 1) },
  { name: "Shear", value: shearX(1) },
];

export function CompositionVisualizer() {
  const [A, setA] = useState<Mat2>(rotation(Math.PI / 4));
  const [B, setB] = useState<Mat2>(scaling(2, 1));
  const BA = multiply(B, A);   // apply A first, then B

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        A is applied first, then B — result is B·A
      </div>

      <TransformGrid matrix={BA} width={480} height={320} />

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "1rem",
      }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#0284c7", fontFamily: "monospace", marginBottom: "0.4rem", fontWeight: 600 }}>A (first)</div>
            <MatrixEditor value={A} onChange={setA} presets={PRESETS} />
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: "1.5rem", color: "var(--text-muted)", paddingTop: "1.5rem" }}>→</div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#db2777", fontFamily: "monospace", marginBottom: "0.4rem", fontWeight: 600 }}>B (second)</div>
            <MatrixEditor value={B} onChange={setB} presets={PRESETS} />
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem", fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ color: "var(--text-muted)", marginBottom: "0.3rem" }}>
            B · A = <span style={{ color: "var(--text)", fontWeight: 600 }}>[{r2(BA[0])}, {r2(BA[1])}; {r2(BA[2])}, {r2(BA[3])}]</span>
          </div>
          <div style={{ color: "var(--text-faint)", fontSize: "0.78rem" }}>
            det(B·A) = {r2(determinant(BA))} = det(A) × det(B) = {r2(determinant(A))} × {r2(determinant(B))}
          </div>
        </div>
      </div>
    </div>
  );
}
