"use client";
import React, { useState } from "react";
import { eigenvalues } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";

function quadraticForm(A: Mat2, x: number, y: number): number {
  return A[0] * x * x + (A[1] + A[2]) * x * y + A[3] * y * y;
}

const SIZE = 120;
const RANGE = 2.5;

const PRESETS: { label: string; A: Mat2 }[] = [
  { label: "PD", A: [3, 1, 1, 2] },
  { label: "PSD", A: [1, 1, 1, 1] },
  { label: "Indefinite", A: [2, 0, 0, -1] },
  { label: "ND", A: [-2, 0, 0, -3] },
];

function classifyMatrix(A: Mat2): string {
  const evs = eigenvalues(A);
  if (!evs) return "indefinite (complex eigenvalues)";
  const [l1, l2] = evs;
  if (l1 > 1e-9 && l2 > 1e-9) return "positive definite (PD)";
  if (l1 >= -1e-9 && l2 >= -1e-9) return "positive semi-definite (PSD)";
  if (l1 < -1e-9 && l2 < -1e-9) return "negative definite (ND)";
  return "indefinite";
}

export function PositiveDefiniteVisualizer() {
  const [matrix, setMatrix] = useState<Mat2>([3, 1, 1, 2]);

  const evs = eigenvalues(matrix);
  const classification = classifyMatrix(matrix);
  const isPD = classification.startsWith("positive definite");
  const isND = classification.startsWith("negative definite");
  const isPSD = classification.startsWith("positive semi");

  // Build heatmap
  const pixels = new Array(SIZE * SIZE);
  let minVal = Infinity, maxVal = -Infinity;
  const values: number[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let col = 0; col < SIZE; col++) {
      const x = (col / SIZE - 0.5) * 2 * RANGE;
      const y = -(r / SIZE - 0.5) * 2 * RANGE;
      const v = quadraticForm(matrix, x, y);
      values.push(v);
      if (v < minVal) minVal = v;
      if (v > maxVal) maxVal = v;
    }
  }

  const range = maxVal - minVal || 1;
  const canvas = values.map(v => {
    const t = (v - minVal) / range;
    if (isPD || isPSD) {
      // Green gradient
      const g = Math.round(50 + t * 180);
      const r2 = Math.round(230 - t * 200);
      return `rgb(${r2},${g},80)`;
    } else if (isND) {
      // Red gradient
      const r2 = Math.round(50 + t * 180);
      return `rgb(${r2},60,60)`;
    } else {
      // Blue-red diverging
      const mid = 0.5;
      if (t < mid) {
        const s = t / mid;
        return `rgb(${Math.round(220 * s)},${Math.round(60 * s)},${Math.round(220 * (1 - s))})`;
      } else {
        const s = (t - mid) / (1 - mid);
        return `rgb(220,${Math.round(60 * (1 - s))},${Math.round(220 * (1 - s))})`;
      }
    }
  });

  function update(idx: number, val: string) {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    const next = [...matrix] as Mat2;
    next[idx] = n;
    // Keep symmetric: if editing off-diagonal, sync the other
    if (idx === 1) next[2] = n;
    if (idx === 2) next[1] = n;
    setMatrix(next);
  }

  const CELL = 3;
  const W = SIZE * CELL;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => setMatrix(p.A)}
            style={{
              padding: "0.3rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-muted)", cursor: "pointer",
            }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        {/* Heatmap */}
        <div style={{ position: "relative" }}>
          <svg width={W} height={W} style={{ display: "block", borderRadius: "8px" }}>
            {canvas.map((color, i) => {
              const row = Math.floor(i / SIZE);
              const col = i % SIZE;
              return <rect key={i} x={col * CELL} y={row * CELL} width={CELL} height={CELL} fill={color} />;
            })}
            {/* Axes */}
            <line x1={W / 2} y1={0} x2={W / 2} y2={W} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
            <line x1={0} y1={W / 2} x2={W} y2={W / 2} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
            <text x={W / 2 + 4} y={12} fill="rgba(0,0,0,0.5)" fontSize={9} fontFamily="monospace">xᵀAx</text>
          </svg>
          <div style={{ textAlign: "center", fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-muted)", marginTop: "4px" }}>
            quadratic form xᵀAx
          </div>
        </div>

        {/* Matrix editor */}
        <div style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem", textAlign: "center" }}>A (symmetric)</div>
          <div style={{
            display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "6px", padding: "0.5rem",
          }}>
            {matrix.map((v, i) => (
              <input key={`${i}-${v}`} type="number" step="0.5" defaultValue={v}
                onChange={e => update(i, e.target.value)}
                style={{
                  width: "52px", padding: "0.3rem", textAlign: "center",
                  border: "1px solid var(--border)", borderRadius: "4px",
                  background: "var(--bg)", color: "var(--text)", fontFamily: "monospace", fontSize: "0.82rem",
                }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        <p style={{ margin: "0 0 0.2rem" }}>
          Eigenvalues: {evs ? `λ₁ = ${Math.round(evs[0] * 100) / 100}, λ₂ = ${Math.round(evs[1] * 100) / 100}` : "complex"}
        </p>
        <p style={{ margin: 0, fontWeight: 600, color: isPD ? "var(--accent)" : isND ? "#dc2626" : "#f59e0b" }}>
          {classification}
        </p>
      </div>
    </div>
  );
}
