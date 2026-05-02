"use client";
import React, { useState } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";
import { multiplyVec } from "@/lib/math/mat2";

function round3(n: number) { return Math.round(n * 1000) / 1000; }

function frobeniusNorm(A: Mat2): number {
  return Math.sqrt(A.reduce((s, v) => s + v * v, 0));
}

function spectralNorm(A: Mat2): number {
  // Largest singular value = sqrt(largest eigenvalue of AᵀA)
  const ata: Mat2 = [
    A[0] * A[0] + A[2] * A[2], A[0] * A[1] + A[2] * A[3],
    A[1] * A[0] + A[3] * A[2], A[1] * A[1] + A[3] * A[3],
  ];
  const t = ata[0] + ata[3];
  const d = ata[0] * ata[3] - ata[1] * ata[2];
  const disc = Math.max(0, t * t - 4 * d);
  return Math.sqrt(Math.max(0, (t + Math.sqrt(disc)) / 2));
}

function oneNorm(A: Mat2): number {
  // Max column sum
  return Math.max(Math.abs(A[0]) + Math.abs(A[2]), Math.abs(A[1]) + Math.abs(A[3]));
}

function infNorm(A: Mat2): number {
  // Max row sum
  return Math.max(Math.abs(A[0]) + Math.abs(A[1]), Math.abs(A[2]) + Math.abs(A[3]));
}

const W = 280, H = 280;
const N_CIRCLE = 48;

export function MatrixNorms() {
  const [matrix, setMatrix] = useState<Mat2>([2, 1, 0.5, 1.5]);
  const [activeNorm, setActiveNorm] = useState<"spectral" | "frobenius" | "one" | "inf">("spectral");

  const coords = useSVGCoordinates({ width: W, height: H, range: [-4, 4] });

  // Unit ball for each norm (image under A of the unit ball in that norm)
  const circle: Vec2[] = Array.from({ length: N_CIRCLE }, (_, i) => {
    const t = (i / N_CIRCLE) * 2 * Math.PI;
    return [Math.cos(t), Math.sin(t)];
  });

  const image = circle.map(p => multiplyVec(matrix, p));

  const fn = frobeniusNorm(matrix);
  const sn = spectralNorm(matrix);
  const on = oneNorm(matrix);
  const inn = infNorm(matrix);

  function update(idx: number, val: string) {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    const next = [...matrix] as Mat2;
    next[idx] = n;
    setMatrix(next);
  }

  const norms = [
    { key: "spectral", label: "‖A‖₂ (spectral)", value: sn, desc: "= largest singular value σ₁" },
    { key: "frobenius", label: "‖A‖_F (Frobenius)", value: fn, desc: "= √(sum of squares of entries)" },
    { key: "one", label: "‖A‖₁", value: on, desc: "= max column sum of |entries|" },
    { key: "inf", label: "‖A‖_∞", value: inn, desc: "= max row sum of |entries|" },
  ] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      {/* Matrix editor */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem", textAlign: "center" }}>A</div>
          <div style={{
            display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "6px", padding: "0.5rem",
          }}>
            {matrix.map((v, i) => (
              <input key={i} type="number" step="0.5" defaultValue={v}
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

      {/* Unit circle image */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
            style={{ background: "var(--bg-canvas)", borderRadius: "10px", display: "block" }}>
            {[-3, -2, -1, 1, 2, 3].map(i => {
              const [x] = coords.toPixel(i, 0);
              const [, y] = coords.toPixel(0, i);
              return (
                <g key={i}>
                  <line x1={x} y1={0} x2={x} y2={H} stroke="#e4e4ee" strokeWidth={1} />
                  <line x1={0} y1={y} x2={W} y2={y} stroke="#e4e4ee" strokeWidth={1} />
                </g>
              );
            })}
            {(() => {
              const [x0] = coords.toPixel(0, 0);
              const [, y0] = coords.toPixel(0, 0);
              return (
                <>
                  <line x1={x0} y1={0} x2={x0} y2={H} stroke="#9090b8" strokeWidth={1.5} />
                  <line x1={0} y1={y0} x2={W} y2={y0} stroke="#9090b8" strokeWidth={1.5} />
                </>
              );
            })()}
            {/* Unit circle */}
            <polyline
              points={[...circle, circle[0]].map(p => {
                const [px, py] = coords.toPixel(p[0], p[1]);
                return `${px},${py}`;
              }).join(" ")}
              fill="none" stroke="#aaaacc" strokeWidth={1} strokeDasharray="4 3"
            />
            {/* Image ellipse */}
            <polyline
              points={[...image, image[0]].map(p => {
                const [px, py] = coords.toPixel(p[0], p[1]);
                return `${px},${py}`;
              }).join(" ")}
              fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={2}
            />
            {/* Spectral norm circle */}
            {(() => {
              const [ox, oy] = coords.toPixel(0, 0);
              const r = Math.abs(coords.toPixel(sn, 0)[0] - ox);
              return <circle cx={ox} cy={oy} r={r} fill="none" stroke="#0284c7" strokeWidth={1.5} strokeDasharray="5 3" />;
            })()}
          </svg>
          <div style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-muted)", textAlign: "center", marginTop: "4px" }}>
            Green = image of unit circle · Blue dashed = ‖A‖₂ radius
          </div>
        </div>
      </div>

      {/* Norms table */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {norms.map(({ key, label, value, desc }) => (
          <div key={key} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "0.6rem 0.8rem", borderRadius: "6px",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            fontFamily: "monospace", fontSize: "0.82rem",
          }}>
            <div>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>{label}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginLeft: "0.5rem" }}>{desc}</span>
            </div>
            <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.95rem" }}>
              {round3(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
