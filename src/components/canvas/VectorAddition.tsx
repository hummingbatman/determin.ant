"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { add } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function r2(n: number) { return Math.round(n * 100) / 100; }

export function VectorAddition() {
  const [v1, setV1] = useState<Vec2>([3, 1]);
  const [v2, setV2] = useState<Vec2>([1, 3]);
  const sum = add(v1, v2);

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <div style={{ marginBottom: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        drag either vector — the sum updates instantly
      </div>

      <Grid2D width={480} height={420} range={[-5, 5]}>
        {({ toMath, toPixel, svgRef }) => {
          const coords = { toMath, toPixel };

          // Parallelogram fill
          const [ox, oy] = toPixel(0, 0);
          const [v1x, v1y] = toPixel(v1[0], v1[1]);
          const [v2x, v2y] = toPixel(v2[0], v2[1]);
          const [sx, sy] = toPixel(sum[0], sum[1]);
          const parallelogram = `M${ox},${oy} L${v1x},${v1y} L${sx},${sy} L${v2x},${v2y} Z`;

          return (
            <>
              {/* Parallelogram shading */}
              <path
                d={parallelogram}
                fill="rgba(21,128,61,0.07)"
                stroke="rgba(21,128,61,0.2)"
                strokeWidth={1}
                strokeDasharray="4 3"
              />

              {/* v1 placed at tip of v2 (tip-to-tail) */}
              <DraggableVector
                value={v1}
                origin={v2}
                color="#0284c7"
                interactive={false}
                coords={coords}
                svgRef={svgRef}
              />
              {/* v2 placed at tip of v1 (tip-to-tail) */}
              <DraggableVector
                value={v2}
                origin={v1}
                color="#db2777"
                interactive={false}
                coords={coords}
                svgRef={svgRef}
              />

              {/* Sum vector */}
              <DraggableVector
                value={sum}
                color="#15803d"
                label="v₁ + v₂"
                interactive={false}
                coords={coords}
                svgRef={svgRef}
              />

              {/* v1 from origin */}
              <DraggableVector
                value={v1}
                onChange={setV1}
                color="#0284c7"
                label="v₁"
                coords={coords}
                svgRef={svgRef}
              />
              {/* v2 from origin */}
              <DraggableVector
                value={v2}
                onChange={setV2}
                color="#db2777"
                label="v₂"
                coords={coords}
                svgRef={svgRef}
              />
            </>
          );
        }}
      </Grid2D>

      {/* Readout */}
      <div style={{
        marginTop: "0.75rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "0.75rem 1.25rem",
        fontFamily: "monospace",
        fontSize: "0.875rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
      }}>
        <div>
          <span style={{ color: "#0284c7" }}>v₁</span>
          <span style={{ color: "var(--text-muted)" }}> = [{r2(v1[0])}, {r2(v1[1])}]</span>
        </div>
        <div>
          <span style={{ color: "#db2777" }}>v₂</span>
          <span style={{ color: "var(--text-muted)" }}> = [{r2(v2[0])}, {r2(v2[1])}]</span>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.3rem", marginTop: "0.1rem" }}>
          <span style={{ color: "#15803d", fontWeight: 600 }}>v₁ + v₂</span>
          <span style={{ color: "var(--text-muted)" }}> = [{r2(v1[0])} + {r2(v2[0])}, {r2(v1[1])} + {r2(v2[1])}]</span>
          <span style={{ color: "#15803d", fontWeight: 600 }}> = [{r2(sum[0])}, {r2(sum[1])}]</span>
        </div>
      </div>
    </div>
  );
}
