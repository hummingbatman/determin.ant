"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { determinant } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

const PRESETS: { label: string; col1: Vec2; col2: Vec2 }[] = [
  { label: "Rank 2", col1: [2, 0], col2: [0, 2] },
  { label: "Rank 1", col1: [1, 2], col2: [2, 4] },
  { label: "Rank 0", col1: [0, 0], col2: [0, 0] },
];

export function RankVisualizer() {
  const [col1, setCol1] = useState<Vec2>([2, 0]);
  const [col2, setCol2] = useState<Vec2>([1, 2]);

  const A: Mat2 = [col1[0], col2[0], col1[1], col2[1]];
  const det = determinant(A);

  const col1Zero = Math.abs(col1[0]) < 1e-9 && Math.abs(col1[1]) < 1e-9;
  const col2Zero = Math.abs(col2[0]) < 1e-9 && Math.abs(col2[1]) < 1e-9;
  const colsParallel = !col1Zero && !col2Zero &&
    Math.abs(col1[0] * col2[1] - col1[1] * col2[0]) < 1e-9;

  const rank = (col1Zero && col2Zero) ? 0 : (colsParallel || (col1Zero || col2Zero)) ? 1 : 2;

  const rankColor = rank === 2 ? "var(--accent)" : rank === 1 ? "#f59e0b" : "#dc2626";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => { setCol1(p.col1); setCol2(p.col2); }}
            style={{
              padding: "0.3rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-muted)", cursor: "pointer",
            }}>
            {p.label}
          </button>
        ))}
      </div>

      <Grid2D width={440} height={380} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);

          return (
            <>
              {/* Column-space line for rank-1 case */}
              {rank === 1 && !col1Zero && (() => {
                const ref = col1Zero ? col2 : col1;
                const scale = 10;
                const [ax, ay] = c.toPixel(ref[0] * scale, ref[1] * scale);
                const [bx, by] = c.toPixel(-ref[0] * scale, -ref[1] * scale);
                return <line x1={ax} y1={ay} x2={bx} y2={by}
                  stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 3" opacity={0.5} />;
              })()}

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
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
          <span style={{ color: "var(--text)" }}>rank(A) =</span>
          <span style={{
            fontSize: "1.5rem", fontWeight: 800, color: rankColor,
          }}>{rank}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
            {rank === 2 && "— full rank, invertible"}
            {rank === 1 && "— column space is a line"}
            {rank === 0 && "— zero matrix"}
          </span>
        </div>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          det(A) = {round2(det)} · · col₁=[{round2(col1[0])},{round2(col1[1])}] col₂=[{round2(col2[0])},{round2(col2[1])}]
        </p>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Drag the column vectors or try the presets above.
      </p>
    </div>
  );
}
