"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { norm } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

export function CrossProductVisualizer() {
  const [a, setA] = useState<Vec2>([3, 0]);
  const [b, setB] = useState<Vec2>([1, 2]);

  const cross = a[0] * b[1] - a[1] * b[0]; // signed area (z-component of 3D cross product)
  const area = Math.abs(cross);
  const isPositive = cross > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={400} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);
          const [ax2, ay2] = c.toPixel(a[0], a[1]);
          const [bx2, by2] = c.toPixel(b[0], b[1]);
          const [cx2, cy2] = c.toPixel(a[0] + b[0], a[1] + b[1]);

          return (
            <>
              {/* Parallelogram */}
              <polygon
                points={`${ox},${oy} ${ax2},${ay2} ${cx2},${cy2} ${bx2},${by2}`}
                fill={isPositive ? "rgba(21,128,61,0.2)" : "rgba(220,38,38,0.2)"}
                stroke={isPositive ? "var(--accent)" : "#dc2626"}
                strokeWidth={1}
              />

              {/* Out-of-plane arrow (shows direction of 3D cross product) */}
              {area > 0.1 && (() => {
                const cx3 = (ox + ax2 + cx2 + bx2) / 4;
                const cy3 = (oy + ay2 + cy2 + by2) / 4;
                const dir = isPositive ? -1 : 1;
                const tipY = cy3 + dir * 30;
                return (
                  <g>
                    <line x1={cx3} y1={cy3} x2={cx3} y2={tipY}
                      stroke="#7c3aed" strokeWidth={2} strokeDasharray="3 2" />
                    <path
                      d={`M${cx3},${tipY} L${cx3 - 5},${tipY - dir * 10} L${cx3 + 5},${tipY - dir * 10} Z`}
                      fill="#7c3aed"
                    />
                    <text x={cx3 + 8} y={tipY} fill="#7c3aed" fontSize={10} fontFamily="monospace">
                      {isPositive ? "+z" : "−z"}
                    </text>
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
          a × b = a₁b₂ − a₂b₁ = {round2(a[0])}·{round2(b[1])} − {round2(a[1])}·{round2(b[0])} ={" "}
          <span style={{ color: isPositive ? "var(--accent)" : "#dc2626", fontWeight: 700 }}>
            {round2(cross)}
          </span>
        </p>
        <p style={{ margin: "0 0 0.2rem" }}>
          Parallelogram area = |a × b| = {round2(area)}
        </p>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          Sign: {isPositive ? "positive (+z out of screen) — b is counter-clockwise from a" : cross < 0 ? "negative (−z into screen) — b is clockwise from a" : "zero — a and b are parallel"}
        </p>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        The shaded parallelogram has area = |a × b|. The purple arrow shows the 3D cross product direction (right-hand rule).
      </p>
    </div>
  );
}
