"use client";
import React, { useState, useRef } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { dot, norm } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function solve2x2Cramer(e1: Vec2, e2: Vec2, v: Vec2): [number, number] | null {
  const det = e1[0] * e2[1] - e1[1] * e2[0];
  if (Math.abs(det) < 1e-9) return null;
  const a = (v[0] * e2[1] - v[1] * e2[0]) / det;
  const b = (e1[0] * v[1] - e1[1] * v[0]) / det;
  return [a, b];
}

export function BasisExplorer() {
  const [e1, setE1] = useState<Vec2>([1, 0]);
  const [e2, setE2] = useState<Vec2>([0, 1]);
  const [v, setV] = useState<Vec2>([2, 1]);

  const coords = solve2x2Cramer(e1, e2, v);
  const isDegenerate = !coords;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={420} range={[-5, 5]}>
        {({ svgRef, ...c }) => (
          <>
            {/* Basis vector parallelogram */}
            {coords && (() => {
              const [a, b] = coords;
              const p1: Vec2 = [a * e1[0], a * e1[1]];
              const p2: Vec2 = [b * e2[0], b * e2[1]];
              const [ox, oy] = c.toPixel(0, 0);
              const [p1x, p1y] = c.toPixel(p1[0], p1[1]);
              const [p2x, p2y] = c.toPixel(p2[0], p2[1]);
              const [vx, vy] = c.toPixel(v[0], v[1]);
              return (
                <g opacity={0.25}>
                  <polygon
                    points={`${ox},${oy} ${p1x},${p1y} ${vx},${vy} ${p2x},${p2y}`}
                    fill="var(--accent)"
                  />
                  <line x1={p1x} y1={p1y} x2={vx} y2={vy} stroke="var(--accent)" strokeWidth={1} strokeDasharray="4 3" />
                  <line x1={p2x} y1={p2y} x2={vx} y2={vy} stroke="var(--accent)" strokeWidth={1} strokeDasharray="4 3" />
                </g>
              );
            })()}

            <DraggableVector value={e1} onChange={setE1} color="#0284c7" label="e₁" coords={c} svgRef={svgRef} />
            <DraggableVector value={e2} onChange={setE2} color="#db2777" label="e₂" coords={c} svgRef={svgRef} />
            <DraggableVector value={v} onChange={setV} color="#7c3aed" label="v" coords={c} svgRef={svgRef} />
          </>
        )}
      </Grid2D>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)",
      }}>
        {isDegenerate ? (
          <p style={{ color: "#dc2626", margin: 0 }}>
            e₁ and e₂ are linearly dependent — they don&apos;t form a basis. You can&apos;t reach all of ℝ².
          </p>
        ) : (
          <>
            <p style={{ margin: "0 0 0.4rem" }}>
              <span style={{ color: "#0284c7" }}>e₁ = [{round2(e1[0])}, {round2(e1[1])}]</span>
              {"  "}
              <span style={{ color: "#db2777" }}>e₂ = [{round2(e2[0])}, {round2(e2[1])}]</span>
            </p>
            <p style={{ margin: "0 0 0.4rem" }}>
              <span style={{ color: "#7c3aed" }}>v = [{round2(v[0])}, {round2(v[1])}]</span>
            </p>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              v = <span style={{ color: "#0284c7" }}>{round2(coords[0])}</span> · e₁ + <span style={{ color: "#db2777" }}>{round2(coords[1])}</span> · e₂
            </p>
          </>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Drag any vector. When e₁ ∥ e₂, they no longer span ℝ².
      </p>
    </div>
  );
}
