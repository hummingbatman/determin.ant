"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { scale } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function r2(n: number) { return Math.round(n * 100) / 100; }

function scalarLabel(s: number) {
  if (s === 0) return "zero — the vector vanishes";
  if (s === 1) return "no change";
  if (s === -1) return "direction flips, length unchanged";
  if (s < 0) return "direction flips and length scales";
  if (s < 1) return "shrinks";
  return "stretches";
}

export function ScalarMultiplication() {
  const [v, setV] = useState<Vec2>([2, 2]);
  const [s, setS] = useState(1.5);
  const scaled = scale(v, s);

  const norm = Math.sqrt(v[0] ** 2 + v[1] ** 2);
  const scaledNorm = Math.abs(s) * norm;

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <div style={{ marginBottom: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        move the slider — drag the vector to change its direction
      </div>

      <Grid2D width={480} height={400} range={[-5, 5]}>
        {({ toMath, toPixel, svgRef }) => {
          const coords = { toMath, toPixel };
          return (
            <>
              {/* Original vector (ghost) */}
              <DraggableVector
                value={v}
                onChange={setV}
                color="rgba(2,132,199,0.25)"
                interactive={false}
                coords={coords}
                svgRef={svgRef}
              />
              {/* Scaled vector */}
              {Math.abs(scaled[0]) > 0.05 || Math.abs(scaled[1]) > 0.05 ? (
                <DraggableVector
                  value={scaled}
                  color="#1d4ed8"
                  label={`${r2(s)}v`}
                  interactive={false}
                  coords={coords}
                  svgRef={svgRef}
                />
              ) : null}
              {/* Draggable handle on original */}
              <DraggableVector
                value={v}
                onChange={setV}
                color="rgba(2,132,199,0.4)"
                label="v"
                coords={coords}
                svgRef={svgRef}
              />
            </>
          );
        }}
      </Grid2D>

      {/* Slider */}
      <div style={{
        marginTop: "1rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.9rem", color: "var(--text-muted)" }}>scalar</span>
          <span style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, color: "#1d4ed8", minWidth: "3rem", textAlign: "right" }}>
            {r2(s)}
          </span>
        </div>
        <input
          type="range"
          min={-3} max={3} step={0.05}
          value={s}
          onChange={(e) => setS(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: "#15803d" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-faint)", fontFamily: "monospace", marginTop: "0.25rem" }}>
          <span>−3</span><span>0</span><span>3</span>
        </div>

        <div style={{ marginTop: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", fontFamily: "monospace", fontSize: "0.85rem" }}>
          <div style={{ color: "var(--text-muted)" }}>
            {r2(s)} × [{r2(v[0])}, {r2(v[1])}]{" "}
            <span style={{ color: "var(--text-faint)" }}>=</span>{" "}
            <span style={{ color: "#1d4ed8", fontWeight: 600 }}>[{r2(scaled[0])}, {r2(scaled[1])}]</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
            <span>|v| = {r2(norm)}</span>
            <span>|{r2(s)}v| = {r2(scaledNorm)}</span>
          </div>
          <div style={{ color: "var(--text-faint)", fontSize: "0.78rem", marginTop: "0.1rem" }}>
            {scalarLabel(s)}
          </div>
        </div>
      </div>
    </div>
  );
}
