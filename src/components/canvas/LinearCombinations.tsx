"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { add, scale } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function r2(n: number) { return Math.round(n * 100) / 100; }

const TARGET: Vec2 = [3, 2];

export function LinearCombinations() {
  const [v1] = useState<Vec2>([2, 0]);
  const [v2] = useState<Vec2>([0, 2]);
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);

  const av1 = scale(v1, a);
  const bv2 = scale(v2, b);
  const result = add(av1, bv2);

  const close =
    Math.abs(result[0] - TARGET[0]) < 0.15 &&
    Math.abs(result[1] - TARGET[1]) < 0.15;

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <div style={{ marginBottom: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        adjust the sliders — try to land on the{" "}
        <span style={{ color: "#b45309", fontWeight: 600 }}>★ target</span>
      </div>

      <Grid2D width={480} height={400} range={[-5, 5]}>
        {({ toMath, toPixel, svgRef }) => {
          const coords = { toMath, toPixel };
          const [tx, ty] = toPixel(TARGET[0], TARGET[1]);

          return (
            <>
              {/* Target */}
              <text x={tx} y={ty - 10} textAnchor="middle" fontSize={18} fill="#b45309">★</text>
              <text x={tx + 14} y={ty - 8} fontSize={11} fill="#b45309" fontFamily="monospace">
                [{TARGET[0]}, {TARGET[1]}]
              </text>

              {/* av1 from origin */}
              <DraggableVector value={av1} color="#0284c7" label={`${r2(a)}v₁`} interactive={false} coords={coords} svgRef={svgRef} />
              {/* bv2 from tip of av1 */}
              <DraggableVector value={bv2} origin={av1} color="#db2777" label={`${r2(b)}v₂`} interactive={false} coords={coords} svgRef={svgRef} />
              {/* Result */}
              <DraggableVector value={result} color={close ? "#15803d" : "#6b7280"} label={close ? "✓" : ""} interactive={false} coords={coords} svgRef={svgRef} />
            </>
          );
        }}
      </Grid2D>

      {/* Sliders */}
      <div style={{
        marginTop: "0.75rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}>
        {[
          { label: "a", value: a, set: setA, color: "#0284c7", vec: v1 },
          { label: "b", value: b, set: setB, color: "#db2777", vec: v2 },
        ].map(({ label, value, set, color, vec }) => (
          <div key={label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem", fontFamily: "monospace", fontSize: "0.85rem" }}>
              <span style={{ color }}>
                {label} = {r2(value)}
              </span>
              <span style={{ color: "var(--text-muted)" }}>
                {r2(value)} × [{r2(vec[0])}, {r2(vec[1])}] = [{r2(value * vec[0])}, {r2(value * vec[1])}]
              </span>
            </div>
            <input type="range" min={-3} max={3} step={0.05} value={value}
              onChange={(e) => set(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: color }} />
          </div>
        ))}

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.6rem", fontFamily: "monospace", fontSize: "0.85rem" }}>
          <span style={{ color: "#0284c7" }}>{r2(a)}v₁</span>
          <span style={{ color: "var(--text-muted)" }}> + </span>
          <span style={{ color: "#db2777" }}>{r2(b)}v₂</span>
          <span style={{ color: "var(--text-muted)" }}> = [{r2(av1[0])} + {r2(bv2[0])}, {r2(av1[1])} + {r2(bv2[1])}] = </span>
          <span style={{ color: close ? "#15803d" : "#1d4ed8", fontWeight: 600 }}>[{r2(result[0])}, {r2(result[1])}]</span>
          {close && <span style={{ color: "#15803d", marginLeft: "0.5rem" }}>✓ on target!</span>}
        </div>
      </div>
    </div>
  );
}
