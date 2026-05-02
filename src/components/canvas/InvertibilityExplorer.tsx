"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { MatrixEditor } from "./MatrixEditor";
import { determinant, inverse, multiply } from "@/lib/math/mat2";
import { rotation, scaling } from "@/lib/math/transforms";
import { identity } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";

function r3(n: number) { return Math.round(n * 1000) / 1000; }
const NEAR_ZERO = (n: number) => Math.abs(n) < 1e-6;

const PRESETS = [
  { name: "Identity", value: identity() as Mat2 },
  { name: "Rotate 90°", value: rotation(Math.PI / 2) as Mat2 },
  { name: "Scale ×2", value: scaling(2, 2) as Mat2 },
  { name: "Singular", value: [2, 4, 1, 2] as Mat2 },
  { name: "Near-singular", value: [1, 2, 0.5, 1.01] as Mat2 },
];

export function InvertibilityExplorer() {
  const [matrix, setMatrix] = useState<Mat2>([2, 1, 1, 2]);
  const [showing, setShowing] = useState<"A" | "Ainv" | "AAinv">("A");

  const det = determinant(matrix);
  const inv = inverse(matrix);
  const product = inv ? multiply(matrix, inv) : null;

  const displayMatrix = showing === "A" ? matrix
    : showing === "Ainv" ? (inv ?? matrix)
    : (product ?? matrix);

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        {(["A", "Ainv", "AAinv"] as const).map((v) => (
          <button key={v} onClick={() => setShowing(v)} disabled={v !== "A" && !inv} style={{
            flex: 1, padding: "0.4rem", fontFamily: "monospace", fontSize: "0.8rem",
            background: showing === v ? "var(--accent)" : "var(--bg-card)",
            color: showing === v ? "#fff" : (!inv && v !== "A") ? "var(--text-faint)" : "var(--text-muted)",
            border: `1px solid ${showing === v ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "6px", cursor: (!inv && v !== "A") ? "not-allowed" : "pointer",
          }}>
            {v === "A" ? "Show A" : v === "Ainv" ? "Show A⁻¹" : "Show A · A⁻¹"}
          </button>
        ))}
      </div>

      <TransformGrid matrix={displayMatrix} width={480} height={320} showBasisVectors />

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "0.75rem",
      }}>
        <MatrixEditor value={matrix} onChange={(m) => { setMatrix(m); setShowing("A"); }} presets={PRESETS} />

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.65rem", fontFamily: "monospace", fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div>
            <span style={{ color: "var(--text-muted)" }}>det(A) = </span>
            <span style={{ fontWeight: 700, color: NEAR_ZERO(det) ? "#db2777" : "#15803d" }}>{r3(det)}</span>
          </div>
          {inv ? (
            <div style={{ color: "var(--text-muted)" }}>
              A⁻¹ = [{r3(inv[0])}, {r3(inv[1])}; {r3(inv[2])}, {r3(inv[3])}]
            </div>
          ) : (
            <div style={{ color: "#db2777", fontWeight: 600 }}>✗ Not invertible — det = 0</div>
          )}
          {product && showing === "AAinv" && (
            <div style={{ color: "#15803d", fontSize: "0.78rem" }}>
              A · A⁻¹ ≈ identity [{r3(product[0])}, {r3(product[1])}; {r3(product[2])}, {r3(product[3])}]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
