"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function solveCoords(e1: Vec2, e2: Vec2, v: Vec2): [number, number] | null {
  const det = e1[0] * e2[1] - e1[1] * e2[0];
  if (Math.abs(det) < 1e-9) return null;
  const a = (v[0] * e2[1] - v[1] * e2[0]) / det;
  const b = (e1[0] * v[1] - e1[1] * v[0]) / det;
  return [a, b];
}

export function ChangeBasisVisualizer() {
  const [e1, setE1] = useState<Vec2>([2, 0]);
  const [e2, setE2] = useState<Vec2>([1, 2]);
  const [v, setV] = useState<Vec2>([3, 2]);

  const newCoords = solveCoords(e1, e2, v);
  const isDegenerate = !newCoords;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={380} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);

          return (
            <>
              {/* New basis grid lines (faint) */}
              {!isDegenerate && (() => {
                const lines = [];
                for (let i = -5; i <= 5; i++) {
                  if (i === 0) continue;
                  const far = 8;
                  // Lines parallel to e2 (constant e1-coordinate)
                  const [ax, ay] = c.toPixel(i * e1[0] - far * e2[0], i * e1[1] - far * e2[1]);
                  const [bx, by] = c.toPixel(i * e1[0] + far * e2[0], i * e1[1] + far * e2[1]);
                  // Lines parallel to e1 (constant e2-coordinate)
                  const [cx2, cy2] = c.toPixel(i * e2[0] - far * e1[0], i * e2[1] - far * e1[1]);
                  const [dx, dy] = c.toPixel(i * e2[0] + far * e1[0], i * e2[1] + far * e1[1]);
                  lines.push(
                    <line key={`a${i}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--accent)" strokeWidth={0.5} opacity={0.3} />,
                    <line key={`b${i}`} x1={cx2} y1={cy2} x2={dx} y2={dy} stroke="var(--accent)" strokeWidth={0.5} opacity={0.3} />
                  );
                }
                return <g>{lines}</g>;
              })()}

              {/* Parallelogram showing the decomposition */}
              {newCoords && (() => {
                const [a2, b2] = newCoords;
                const p1: Vec2 = [a2 * e1[0], a2 * e1[1]];
                const p2: Vec2 = [b2 * e2[0], b2 * e2[1]];
                const [p1x, p1y] = c.toPixel(p1[0], p1[1]);
                const [p2x, p2y] = c.toPixel(p2[0], p2[1]);
                const [vx, vy] = c.toPixel(v[0], v[1]);
                return (
                  <>
                    <line x1={p1x} y1={p1y} x2={vx} y2={vy} stroke="#db2777" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6} />
                    <line x1={p2x} y1={p2y} x2={vx} y2={vy} stroke="#0284c7" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6} />
                  </>
                );
              })()}

              <DraggableVector value={e1} onChange={setE1} color="#0284c7" label="e₁" coords={c} svgRef={svgRef} />
              <DraggableVector value={e2} onChange={setE2} color="#db2777" label="e₂" coords={c} svgRef={svgRef} />
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
        <p style={{ margin: "0 0 0.3rem", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Standard basis</p>
        <p style={{ margin: "0 0 0.75rem" }}>
          <span style={{ color: "#7c3aed" }}>v</span> = [{round2(v[0])}, {round2(v[1])}]
        </p>
        {isDegenerate ? (
          <p style={{ color: "#dc2626", margin: 0 }}>e₁ and e₂ are parallel — not a valid basis.</p>
        ) : (
          <>
            <p style={{ margin: "0 0 0.3rem", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>New basis {"{e₁, e₂}"}</p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "#7c3aed" }}>v</span> = <span style={{ color: "#0284c7" }}>{round2(newCoords![0])}</span>·e₁ + <span style={{ color: "#db2777" }}>{round2(newCoords![1])}</span>·e₂
              &nbsp;&nbsp;→&nbsp; [{round2(newCoords![0])}, {round2(newCoords![1])}]<sub style={{ fontSize: "0.7rem" }}>new</sub>
            </p>
          </>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        The green grid lines show the new coordinate system. Same vector v, different numbers depending on the basis.
      </p>
    </div>
  );
}
