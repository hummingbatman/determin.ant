"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { dot, norm, scale, sub } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function project(a: Vec2, b: Vec2): Vec2 {
  const denom = dot(b, b);
  if (denom < 1e-12) return [0, 0];
  const scalar = dot(a, b) / denom;
  return [scalar * b[0], scalar * b[1]];
}

export function ProjectionVisualizer() {
  const [a, setA] = useState<Vec2>([3, 3]);
  const [b, setB] = useState<Vec2>([4, 1]);

  const proj = project(a, b);
  const perp = sub(a, proj);
  const projNorm = norm(proj);
  const perpNorm = norm(perp);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={400} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);
          const [px, py] = c.toPixel(proj[0], proj[1]);
          const [ax, ay] = c.toPixel(a[0], a[1]);

          // Right angle at projection point
          const bNorm = norm(b);
          const bUnit: Vec2 = bNorm > 1e-9 ? [b[0] / bNorm, b[1] / bNorm] : [1, 0];
          const perpUnit: Vec2 = [-bUnit[1], bUnit[0]];
          const s2 = 0.25;
          const [p1x, p1y] = c.toPixel(proj[0] + bUnit[0] * s2, proj[1] + bUnit[1] * s2);
          const [p2x, p2y] = c.toPixel(
            proj[0] + bUnit[0] * s2 + perpUnit[0] * s2,
            proj[1] + bUnit[1] * s2 + perpUnit[1] * s2
          );
          const [p3x, p3y] = c.toPixel(proj[0] + perpUnit[0] * s2, proj[1] + perpUnit[1] * s2);

          return (
            <>
              {/* b line extended */}
              {(() => {
                const scale2 = 8;
                const [ax2, ay2] = c.toPixel(b[0] * scale2, b[1] * scale2);
                const [bx2, by2] = c.toPixel(-b[0] * scale2, -b[1] * scale2);
                return <line x1={ax2} y1={ay2} x2={bx2} y2={by2}
                  stroke="#db2777" strokeWidth={1} strokeDasharray="5 4" opacity={0.35} />;
              })()}

              {/* Perpendicular drop line */}
              <line x1={ax} y1={ay} x2={px} y2={py}
                stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="4 3" />

              {/* Right angle mark */}
              <path d={`M${p1x},${p1y} L${p2x},${p2y} L${p3x},${p3y}`}
                fill="none" stroke="var(--text-muted)" strokeWidth={1.5} />

              {/* Projection vector */}
              {(() => {
                const dx = px - ox, dy = py - oy;
                const len = Math.sqrt(dx * dx + dy * dy);
                if (len < 2) return null;
                const ux = dx / len, uy = dy / len;
                const s = 7;
                const ax3 = px - ux * s * 1.5 - uy * s * 0.5;
                const ay3 = py - uy * s * 1.5 + ux * s * 0.5;
                const bx3 = px - ux * s * 1.5 + uy * s * 0.5;
                const by3 = py - uy * s * 1.5 - ux * s * 0.5;
                return (
                  <g>
                    <line x1={ox} y1={oy} x2={px} y2={py} stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" />
                    <path d={`M${px},${py} L${ax3},${ay3} L${bx3},${by3} Z`} fill="var(--accent)" />
                    <text x={px + 8} y={py - 8} fill="var(--accent)" fontSize={11} fontFamily="monospace">proj</text>
                  </g>
                );
              })()}

              <DraggableVector value={a} onChange={setA} color="#0284c7" label="a" coords={c} svgRef={svgRef} />
              <DraggableVector value={b} onChange={setB} color="#db2777" label="b" coords={c} svgRef={svgRef} />
            </>
          );
        }}
      </Grid2D>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        <p style={{ margin: "0 0 0.2rem" }}>
          proj_b(a) = <span style={{ color: "var(--accent)" }}>[{round2(proj[0])}, {round2(proj[1])}]</span>
          {"  "}|proj| = {round2(projNorm)}
        </p>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          perpendicular component = <span style={{ color: "#7c3aed" }}>[{round2(perp[0])}, {round2(perp[1])}]</span>
          {"  "}|perp| = {round2(perpNorm)}
        </p>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Green arrow = projection of <span style={{ color: "#0284c7" }}>a</span> onto <span style={{ color: "#db2777" }}>b</span>.
        The dashed line is the remainder — perpendicular to b.
      </p>
    </div>
  );
}
