"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { dot, norm } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function areDependent(a: Vec2, b: Vec2): boolean {
  return Math.abs(a[0] * b[1] - a[1] * b[0]) < 1e-6 * (norm(a) * norm(b) + 1e-9);
}

function expressAsCombo(a: Vec2, b: Vec2, v: Vec2): [number, number] | null {
  const det = a[0] * b[1] - a[1] * b[0];
  if (Math.abs(det) < 1e-9) return null;
  const s = (v[0] * b[1] - v[1] * b[0]) / det;
  const t = (a[0] * v[1] - a[1] * v[0]) / det;
  return [s, t];
}

export function LinearIndependenceVisualizer() {
  const [a, setA] = useState<Vec2>([2, 0]);
  const [b, setB] = useState<Vec2>([1, 2]);
  const [v, setV] = useState<Vec2>([3, 2]);

  const dependent = areDependent(a, b);
  const combo = expressAsCombo(a, b, v);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={400} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);

          return (
            <>
              {/* When dependent: highlight the shared line */}
              {dependent && (() => {
                const ref = norm(a) > 1e-9 ? a : b;
                const scale = 10;
                const [ax2, ay2] = c.toPixel(ref[0] * scale, ref[1] * scale);
                const [bx2, by2] = c.toPixel(-ref[0] * scale, -ref[1] * scale);
                return <line x1={ax2} y1={ay2} x2={bx2} y2={by2}
                  stroke="#dc2626" strokeWidth={2} strokeDasharray="6 4" opacity={0.5} />;
              })()}

              {/* Express v as combo: show the parallelogram */}
              {combo && !dependent && (() => {
                const [s, t] = combo;
                const p1: Vec2 = [s * a[0], s * a[1]];
                const p2: Vec2 = [t * b[0], t * b[1]];
                const [p1x, p1y] = c.toPixel(p1[0], p1[1]);
                const [p2x, p2y] = c.toPixel(p2[0], p2[1]);
                const [vx, vy] = c.toPixel(v[0], v[1]);
                return (
                  <g opacity={0.25}>
                    <polygon
                      points={`${ox},${oy} ${p1x},${p1y} ${vx},${vy} ${p2x},${p2y}`}
                      fill="#7c3aed"
                    />
                    <line x1={p1x} y1={p1y} x2={vx} y2={vy} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 3" />
                    <line x1={p2x} y1={p2y} x2={vx} y2={vy} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 3" />
                  </g>
                );
              })()}

              <DraggableVector value={a} onChange={setA} color="#0284c7" label="a" coords={c} svgRef={svgRef} />
              <DraggableVector value={b} onChange={setB} color="#db2777" label="b" coords={c} svgRef={svgRef} />
              <DraggableVector value={v} onChange={setV} color="#7c3aed" label="v" coords={c} svgRef={svgRef} />
            </>
          );
        }}
      </Grid2D>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        {dependent ? (
          <p style={{ margin: 0, color: "#dc2626" }}>
            a and b are <strong>linearly dependent</strong> — one is a scalar multiple of the other.
            They only span a line, not the whole plane.
          </p>
        ) : combo ? (
          <>
            <p style={{ margin: "0 0 0.2rem", color: "var(--accent)" }}>
              a and b are <strong>linearly independent</strong> — they span all of ℝ².
            </p>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              v = <span style={{ color: "#0284c7" }}>{round2(combo[0])}</span>·a + <span style={{ color: "#db2777" }}>{round2(combo[1])}</span>·b
            </p>
          </>
        ) : null}
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Drag a or b to make them parallel — they become dependent and can no longer reach all of ℝ².
      </p>
    </div>
  );
}
