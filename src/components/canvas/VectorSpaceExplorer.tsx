"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { determinant } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

export function VectorSpaceExplorer() {
  const [col1, setCol1] = useState<Vec2>([2, 1]);
  const [col2, setCol2] = useState<Vec2>([0, 2]);

  const A: Mat2 = [col1[0], col2[0], col1[1], col2[1]];
  const det = determinant(A);
  const isFullRank = Math.abs(det) > 1e-9;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={420} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);
          const far = 5;

          // Column space: if rank 1, it's a line through col1
          const nullVec: Vec2 | null = !isFullRank && (Math.abs(col1[0]) > 1e-9 || Math.abs(col1[1]) > 1e-9)
            ? [col1[1], -col1[0]]
            : null;

          return (
            <>
              {/* Column space shading (rank 2 → whole plane, rank 1 → line) */}
              {!isFullRank && nullVec && (() => {
                const scale = 10;
                const [ax, ay] = c.toPixel(nullVec[0] * scale, nullVec[1] * scale);
                const [bx, by] = c.toPixel(-nullVec[0] * scale, -nullVec[1] * scale);
                return (
                  <line x1={ax} y1={ay} x2={bx} y2={by}
                    stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 4" opacity={0.6} />
                );
              })()}

              {/* Null space direction when rank-deficient */}
              {!isFullRank && (() => {
                // null space: col1 is parallel to col2 → null space vector is perpendicular-ish
                const n: Vec2 = [col2[0], col2[1]];
                const len = Math.sqrt(n[0] ** 2 + n[1] ** 2);
                if (len < 1e-9) return null;
                const nullDir: Vec2 = [-n[1] / len, n[0] / len];
                const scale = 5;
                const [ax, ay] = c.toPixel(nullDir[0] * scale, nullDir[1] * scale);
                const [bx, by] = c.toPixel(-nullDir[0] * scale, -nullDir[1] * scale);
                return (
                  <line x1={ax} y1={ay} x2={bx} y2={by}
                    stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7} />
                );
              })()}

              {/* Origin dot */}
              <circle cx={ox} cy={oy} r={3} fill="var(--text-muted)" />

              <DraggableVector value={col1} onChange={setCol1} color="#0284c7" label="col₁" coords={c} svgRef={svgRef} />
              <DraggableVector value={col2} onChange={setCol2} color="#db2777" label="col₂" coords={c} svgRef={svgRef} />
            </>
          );
        }}
      </Grid2D>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)",
      }}>
        <p style={{ margin: "0 0 0.3rem" }}>
          Matrix A = [col₁ | col₂] =&nbsp;
          [[{round2(col1[0])}, {round2(col2[0])}], [{round2(col1[1])}, {round2(col2[1])}]]
        </p>
        <p style={{ margin: "0 0 0.3rem" }}>
          det(A) = {round2(det)}
        </p>
        {isFullRank ? (
          <p style={{ margin: 0, color: "var(--accent)" }}>
            Column space = all of ℝ² · · Null space = just {"{0}"}
          </p>
        ) : (
          <p style={{ margin: 0, color: "#dc2626" }}>
            Column space = a line (rank 1) · · Null space = a line{" "}
            <span style={{ color: "#f59e0b" }}>(shown dashed)</span>
          </p>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Drag the column vectors. Make them parallel to collapse the column space to a line.
      </p>
    </div>
  );
}
