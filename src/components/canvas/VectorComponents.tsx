"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import type { Vec2 } from "@/lib/math/vec2";

function r2(n: number) { return Math.round(n * 100) / 100; }

export function VectorComponents() {
  const [v, setV] = useState<Vec2>([3, 2]);

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      {/* Label above */}
      <div style={{ marginBottom: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        drag the tip of the arrow
      </div>

      <Grid2D width={480} height={420} range={[-5, 5]}>
        {({ toMath, toPixel, svgRef }) => {
          const coords = { toMath, toPixel };
          const [x2, y2] = toPixel(v[0], v[1]);
          const [x0, y0] = toPixel(0, 0);
          const [xComp, yComp] = toPixel(v[0], 0);

          return (
            <>
              {/* x-component dashed line */}
              <line x1={x0} y1={y0} x2={xComp} y2={y0}
                stroke="var(--vec1)" strokeWidth={2} strokeDasharray="5 4" opacity={0.6} />
              {/* y-component dashed line */}
              <line x1={xComp} y1={y0} x2={xComp} y2={y2}
                stroke="var(--vec2)" strokeWidth={2} strokeDasharray="5 4" opacity={0.6} />

              {/* x label */}
              <text
                x={(x0 + xComp) / 2} y={y0 + 18}
                fill="var(--vec1)" fontSize={12} fontFamily="monospace" textAnchor="middle"
              >
                x = {r2(v[0])}
              </text>
              {/* y label */}
              <text
                x={xComp + (v[0] >= 0 ? 28 : -28)} y={(y0 + y2) / 2}
                fill="var(--vec2)" fontSize={12} fontFamily="monospace" textAnchor="middle"
              >
                y = {r2(v[1])}
              </text>

              {/* The vector */}
              <DraggableVector
                value={v}
                onChange={setV}
                color="#1d4ed8"
                label="v"
                coords={coords}
                svgRef={svgRef}
              />
            </>
          );
        }}
      </Grid2D>

      {/* Readout below */}
      <div style={{
        marginTop: "0.75rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "0.75rem 1.25rem",
        fontFamily: "monospace",
        fontSize: "0.9rem",
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
      }}>
        <span>
          <span style={{ color: "var(--text-muted)" }}>v = [</span>
          <span style={{ color: "var(--vec1)", fontWeight: 600 }}>{r2(v[0])}</span>
          <span style={{ color: "var(--text-muted)" }}>, </span>
          <span style={{ color: "var(--vec2)", fontWeight: 600 }}>{r2(v[1])}</span>
          <span style={{ color: "var(--text-muted)" }}>]</span>
        </span>
        <span style={{ color: "var(--text-muted)" }}>
          |v| = <span style={{ color: "var(--text)" }}>{r2(Math.sqrt(v[0] ** 2 + v[1] ** 2))}</span>
        </span>
      </div>
    </div>
  );
}
