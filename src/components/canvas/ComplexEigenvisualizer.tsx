"use client";
import React, { useState } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import { multiplyVec } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

function round3(n: number) { return Math.round(n * 1000) / 1000; }

const PRESETS: { label: string; A: Mat2; desc: string }[] = [
  { label: "Pure rotation", A: [0, -1, 1, 0], desc: "λ = ±i — rotates 90°, never spirals" },
  { label: "Spiral out", A: [1.1, -0.5, 0.5, 1.1], desc: "|λ| > 1 — spirals outward" },
  { label: "Spiral in", A: [0.8, -0.4, 0.4, 0.8], desc: "|λ| < 1 — spirals inward (stable)" },
  { label: "Rotation 30°", A: [0.866, -0.5, 0.5, 0.866], desc: "λ = e^{±iπ/6} — pure rotation" },
];

const W = 440, H = 380;

export function ComplexEigenvisualizer() {
  const [presetIdx, setPresetIdx] = useState(1);
  const [steps, setSteps] = useState(12);

  const { A, desc } = PRESETS[presetIdx];
  const coords = useSVGCoordinates({ width: W, height: H, range: [-4, 4] });

  // Start with points on the unit circle
  const N = 6;
  const startPoints: Vec2[] = Array.from({ length: N }, (_, i) => {
    const angle = (i / N) * 2 * Math.PI;
    return [Math.cos(angle), Math.sin(angle)];
  });

  // Compute orbits: apply A repeatedly
  const orbits: Vec2[][] = startPoints.map(p => {
    const orbit: Vec2[] = [p];
    let cur = p;
    for (let k = 0; k < steps; k++) {
      cur = multiplyVec(A, cur);
      orbit.push(cur);
    }
    return orbit;
  });

  const colors = ["#0284c7", "#db2777", "var(--accent)", "#7c3aed", "#f59e0b", "#ef4444"];

  // Complex eigenvalue: λ = (tr ± sqrt(tr²-4det)) / 2
  const tr = A[0] + A[3];
  const det = A[0] * A[3] - A[1] * A[2];
  const disc = tr * tr - 4 * det;
  const modulus = Math.sqrt(Math.max(0, det)); // |λ|² = det for complex eigenvalues
  const hasComplex = disc < 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {PRESETS.map((p, i) => (
          <button key={p.label} onClick={() => setPresetIdx(i)}
            style={{
              padding: "0.3rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem",
              border: "1px solid var(--border)",
              background: i === presetIdx ? "var(--accent)" : "var(--bg-card)",
              color: i === presetIdx ? "#fff" : "var(--text-muted)", cursor: "pointer",
            }}>
            {p.label}
          </button>
        ))}
      </div>

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
        <circle cx={coords.toPixel(0, 0)[0]} cy={coords.toPixel(0, 0)[1]}
          r={Math.abs(coords.toPixel(1, 0)[0] - coords.toPixel(0, 0)[0])}
          fill="none" stroke="#aaaacc" strokeWidth={1} strokeDasharray="4 3" />

        {/* Orbits */}
        {orbits.map((orbit, oi) => (
          <g key={oi}>
            <polyline
              points={orbit.map(p => {
                const [px, py] = coords.toPixel(p[0], p[1]);
                return `${px},${py}`;
              }).join(" ")}
              fill="none" stroke={colors[oi]} strokeWidth={1.5} opacity={0.7}
            />
            {orbit.map((p, k) => {
              const [px, py] = coords.toPixel(p[0], p[1]);
              return (
                <circle key={k} cx={px} cy={py}
                  r={k === 0 ? 4 : 2.5}
                  fill={colors[oi]} opacity={k === 0 ? 1 : 0.4 + (k / steps) * 0.6}
                />
              );
            })}
          </g>
        ))}
      </svg>

      <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem", fontFamily: "monospace" }}>
        <span style={{ color: "var(--text-muted)", width: "80px" }}>Steps</span>
        <input type="range" min={4} max={30} step={1} value={steps}
          onChange={e => setSteps(parseInt(e.target.value))}
          style={{ flex: 1 }} />
        <span style={{ color: "var(--text)", width: "24px" }}>{steps}</span>
      </label>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.7,
      }}>
        <p style={{ margin: "0 0 0.2rem" }}>
          {hasComplex
            ? `Complex eigenvalues: λ = ${round3(tr / 2)} ± ${round3(Math.sqrt(-disc) / 2)}i`
            : `Real eigenvalues: λ = ${round3((tr + Math.sqrt(disc)) / 2)}, ${round3((tr - Math.sqrt(disc)) / 2)}`
          }
        </p>
        <p style={{ margin: "0 0 0.2rem" }}>|λ| = {round3(Math.sqrt(det))}</p>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>{desc}</p>
      </div>
    </div>
  );
}
