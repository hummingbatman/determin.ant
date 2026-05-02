"use client";
import React, { useState, useMemo } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { add, scale, norm } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function r2(n: number) { return Math.round(n * 100) / 100; }

function cross2d(a: Vec2, b: Vec2) {
  return a[0] * b[1] - a[1] * b[0];
}

export function SpanVisualizer() {
  const [v1, setV1] = useState<Vec2>([2, 1]);
  const [v2, setV2] = useState<Vec2>([-1, 2]);

  const det = cross2d(v1, v2);
  const isParallel = Math.abs(det) < 0.15;
  const spans2D = !isParallel;

  // When parallel, compute the shared direction for the line label
  const lineAngle = isParallel && norm(v1) > 0.01
    ? Math.atan2(v1[1], v1[0]) * (180 / Math.PI)
    : 0;

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <div style={{ marginBottom: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        drag the vectors — watch the span change
      </div>

      <Grid2D width={480} height={400} range={[-5, 5]}>
        {({ toMath, toPixel, svgRef }) => {
          const coords = { toMath, toPixel };
          const [ox, oy] = toPixel(0, 0);

          return (
            <>
              {/* Span shading */}
              {spans2D ? (
                <rect x={0} y={0} width={480} height={400}
                  fill="rgba(21,128,61,0.07)" />
              ) : (
                /* Line through origin in v1 direction */
                (() => {
                  const big = 20;
                  const [ax, ay] = toPixel(v1[0] * big, v1[1] * big);
                  const [bx, by] = toPixel(-v1[0] * big, -v1[1] * big);
                  return (
                    <line x1={bx} y1={by} x2={ax} y2={ay}
                      stroke="rgba(21,128,61,0.35)" strokeWidth={2} strokeDasharray="6 4" />
                  );
                })()
              )}

              <DraggableVector value={v1} onChange={setV1} color="#0284c7" label="v₁" coords={coords} svgRef={svgRef} />
              <DraggableVector value={v2} onChange={setV2} color="#db2777" label="v₂" coords={coords} svgRef={svgRef} />

              {/* Span label */}
              <text x={24} y={24} fontSize={12} fill="rgba(21,128,61,0.8)" fontFamily="monospace" fontWeight={600}>
                {spans2D ? "span = all of ℝ²" : "span = a line"}
              </text>
            </>
          );
        }}
      </Grid2D>

      <div style={{
        marginTop: "0.75rem",
        background: isParallel ? "rgba(180,83,9,0.06)" : "rgba(21,128,61,0.06)",
        border: `1px solid ${isParallel ? "rgba(180,83,9,0.2)" : "rgba(21,128,61,0.2)"}`,
        borderRadius: "8px",
        padding: "0.75rem 1.25rem",
        fontFamily: "monospace",
        fontSize: "0.85rem",
      }}>
        <div style={{ fontWeight: 600, color: isParallel ? "#b45309" : "#15803d", marginBottom: "0.25rem" }}>
          {isParallel
            ? "⚠ Vectors are parallel — span is just a line"
            : "✓ Vectors are independent — span is all of 2D space"}
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
          v₁ = [{r2(v1[0])}, {r2(v1[1])}] &nbsp;·&nbsp; v₂ = [{r2(v2[0])}, {r2(v2[1])}]
        </div>
      </div>
    </div>
  );
}
