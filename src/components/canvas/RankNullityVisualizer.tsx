"use client";
import React, { useState } from "react";
import { DraggableVector } from "./DraggableVector";
import { Grid2D } from "./Grid2D";
import { determinant } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

export function RankNullityVisualizer() {
  const [col1, setCol1] = useState<Vec2>([2, 1]);
  const [col2, setCol2] = useState<Vec2>([0, 2]);

  const A: Mat2 = [col1[0], col2[0], col1[1], col2[1]];
  const det = determinant(A);
  const isFullRank = Math.abs(det) > 1e-9;
  const rank = isFullRank ? 2 : (
    (Math.abs(col1[0]) > 1e-9 || Math.abs(col1[1]) > 1e-9) ||
    (Math.abs(col2[0]) > 1e-9 || Math.abs(col2[1]) > 1e-9) ? 1 : 0
  );
  const nullity = 2 - rank;

  const BAR_W = 360;
  const rankW = (rank / 2) * BAR_W;
  const nullW = (nullity / 2) * BAR_W;

  // Null space vector (when rank = 1)
  const nullVec: Vec2 | null = rank === 1 ? (() => {
    const ref = (Math.abs(col1[0]) > 1e-9 || Math.abs(col1[1]) > 1e-9) ? col1 : col2;
    const len = Math.sqrt(ref[0] ** 2 + ref[1] ** 2);
    return len > 1e-9 ? [-ref[1] / len, ref[0] / len] : null;
  })() : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      <Grid2D width={440} height={360} range={[-5, 5]}>
        {({ svgRef, ...c }) => (
          <>
            {/* Column space line when rank 1 */}
            {rank === 1 && (() => {
              const ref = (Math.abs(col1[0]) > 1e-9 || Math.abs(col1[1]) > 1e-9) ? col1 : col2;
              const s = 10;
              const [ax, ay] = c.toPixel(ref[0] * s, ref[1] * s);
              const [bx, by] = c.toPixel(-ref[0] * s, -ref[1] * s);
              return <line x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 3" opacity={0.5} />;
            })()}
            {/* Null space line when rank 1 */}
            {nullVec && (() => {
              const s = 10;
              const [ax, ay] = c.toPixel(nullVec[0] * s, nullVec[1] * s);
              const [bx, by] = c.toPixel(-nullVec[0] * s, -nullVec[1] * s);
              return <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 3" opacity={0.6} />;
            })()}
            <DraggableVector value={col1} onChange={setCol1} color="#0284c7" label="col₁" coords={c} svgRef={svgRef} />
            <DraggableVector value={col2} onChange={setCol2} color="#db2777" label="col₂" coords={c} svgRef={svgRef} />
          </>
        )}
      </Grid2D>

      {/* Rank-Nullity bar */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1.25rem",
      }}>
        <p style={{ margin: "0 0 0.75rem", fontFamily: "monospace", fontSize: "0.82rem", color: "var(--text)", fontWeight: 700 }}>
          rank + nullity = n &nbsp;→&nbsp; {rank} + {nullity} = 2
        </p>
        <div style={{ display: "flex", borderRadius: "6px", overflow: "hidden", height: "32px", width: "100%" }}>
          <div style={{
            flex: rank, background: "var(--accent)", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontFamily: "monospace", fontSize: "0.75rem",
            transition: "flex 0.3s",
          }}>
            {rank > 0 && `rank = ${rank}`}
          </div>
          <div style={{
            flex: nullity, background: "#f59e0b", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontFamily: "monospace", fontSize: "0.75rem",
            transition: "flex 0.3s",
          }}>
            {nullity > 0 && `nullity = ${nullity}`}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
          <span><span style={{ color: "var(--accent)" }}>■</span> column space (dim = {rank})</span>
          <span><span style={{ color: "#f59e0b" }}>■</span> null space (dim = {nullity})</span>
        </div>
      </div>

      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Drag the column vectors until they&apos;re parallel. The rank drops to 1, nullity rises to 1 — they always sum to 2.
      </p>
    </div>
  );
}
