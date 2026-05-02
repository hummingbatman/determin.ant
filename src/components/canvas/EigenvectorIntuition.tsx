"use client";
import React, { useState } from "react";
import { multiplyVec, eigenvalues, eigenvectors } from "@/lib/math/mat2";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import { MatrixEditor } from "./MatrixEditor";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

const PRESETS: { label: string; A: Mat2 }[] = [
  { label: "Scale x2,y3", A: [2, 0, 0, 3] },
  { label: "Shear", A: [1, 1, 0, 1] },
  { label: "Symmetric", A: [2, 1, 1, 2] },
  { label: "Rotation 45°", A: [0.707, -0.707, 0.707, 0.707] },
];

function Arrow({ x1, y1, x2, y2, color, width = 1.5 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return null;
  const ux = dx / len, uy = dy / len;
  const s = 6;
  const ax = x2 - ux * s * 1.5 - uy * s * 0.5;
  const ay = y2 - uy * s * 1.5 + ux * s * 0.5;
  const bx = x2 - ux * s * 1.5 + uy * s * 0.5;
  const by = y2 - uy * s * 1.5 - ux * s * 0.5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <path d={`M${x2},${y2} L${ax},${ay} L${bx},${by} Z`} fill={color} />
    </g>
  );
}

function round2(n: number) { return Math.round(n * 100) / 100; }

export function EigenvectorIntuition() {
  const [matrix, setMatrix] = useState<Mat2>([2, 0, 0, 3]);
  const W = 440, H = 400;
  const coords = useSVGCoordinates({ width: W, height: H, range: [-4, 4] });

  const evs = eigenvalues(matrix);
  const evecs = eigenvectors(matrix);

  // Radial vectors (fan of directions)
  const N = 16;
  const radials: Vec2[] = Array.from({ length: N }, (_, i) => {
    const angle = (i / N) * 2 * Math.PI;
    return [Math.cos(angle), Math.sin(angle)];
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
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

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ background: "var(--bg-canvas)", borderRadius: "10px", display: "block" }}>

        {/* Grid */}
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

        {/* Transformed radial vectors */}
        {radials.map((v, i) => {
          const tv = multiplyVec(matrix, v);
          const [ox, oy] = coords.toPixel(0, 0);
          const [tx, ty] = coords.toPixel(tv[0], tv[1]);
          const [vx, vy] = coords.toPixel(v[0], v[1]);

          // Check if this radial is close to an eigenvector direction
          let isEigen = false;
          if (evecs) {
            for (const ev of evecs) {
              const len = Math.sqrt(ev[0] ** 2 + ev[1] ** 2);
              if (len < 1e-9) continue;
              const dot = (v[0] * ev[0] + v[1] * ev[1]) / len;
              if (Math.abs(Math.abs(dot) - 1) < 0.08) isEigen = true;
            }
          }

          return (
            <g key={i} opacity={isEigen ? 1 : 0.45}>
              {/* Original (faint) */}
              <Arrow x1={ox} y1={oy} x2={vx} y2={vy} color={isEigen ? "#7c3aed" : "#aaaacc"} width={isEigen ? 2 : 1} />
              {/* Transformed */}
              <Arrow x1={ox} y1={oy} x2={tx} y2={ty} color={isEigen ? "var(--accent)" : "#0284c7"} width={isEigen ? 2.5 : 1.5} />
            </g>
          );
        })}
      </svg>

      <MatrixEditor value={matrix} onChange={setMatrix} />

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)",
      }}>
        {evs ? (
          <>
            <p style={{ margin: "0 0 0.3rem" }}>λ₁ = {round2(evs[0])}, λ₂ = {round2(evs[1])}</p>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              <span style={{ color: "#7c3aed" }}>Purple arrows</span> = eigenvector directions (they only stretch, not rotate)
            </p>
          </>
        ) : (
          <p style={{ margin: 0, color: "#f59e0b" }}>No real eigenvectors — this transformation rotates everything.</p>
        )}
      </div>
    </div>
  );
}
