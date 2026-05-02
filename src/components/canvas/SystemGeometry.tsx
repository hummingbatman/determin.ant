"use client";
import React, { useState } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import { solve2x2 } from "@/lib/math/solvers";
import type { AugmentedRow } from "@/lib/math/solvers";

function r2(n: number) { return Math.round(n * 100) / 100; }

const WIDTH = 480, HEIGHT = 400;
const RANGE: [number, number] = [-6, 6];

interface LineConfig { a: number; b: number; c: number; color: string; label: string }

function LineSliders({ line, onChange, color }: {
  line: LineConfig;
  onChange: (l: LineConfig) => void;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      {(["a", "b", "c"] as const).map((key) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color, width: "12px" }}>{key}</span>
          <input type="range" min={-4} max={4} step={0.25} value={line[key]}
            onChange={(e) => onChange({ ...line, [key]: parseFloat(e.target.value) })}
            style={{ flex: 1, accentColor: color }} />
          <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", width: "32px", textAlign: "right" }}>
            {r2(line[key])}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SystemGeometry() {
  const [line1, setLine1] = useState<LineConfig>({ a: 1, b: 1, c: 3, color: "#0284c7", label: "L₁" });
  const [line2, setLine2] = useState<LineConfig>({ a: 2, b: -1, c: 1, color: "#db2777", label: "L₂" });

  const coords = useSVGCoordinates({ width: WIDTH, height: HEIGHT, range: RANGE });
  const row1: AugmentedRow = [line1.a, line1.b, line1.c];
  const row2: AugmentedRow = [line2.a, line2.b, line2.c];
  const sol = solve2x2(row1, row2);

  function linePoints(a: number, b: number, c: number): [number, number, number, number] | null {
    const far = 8;
    if (Math.abs(b) > 0.001) {
      const x1 = -far, y1 = (c - a * x1) / b;
      const x2 = far, y2 = (c - a * x2) / b;
      const [px1, py1] = coords.toPixel(x1, y1);
      const [px2, py2] = coords.toPixel(x2, y2);
      return [px1, py1, px2, py2];
    } else if (Math.abs(a) > 0.001) {
      const x = c / a;
      const [px, py1] = coords.toPixel(x, -far);
      const [, py2] = coords.toPixel(x, far);
      return [px, py1, px, py2];
    }
    return null;
  }

  const pts1 = linePoints(line1.a, line1.b, line1.c);
  const pts2 = linePoints(line2.a, line2.b, line2.c);

  const [intX, intY] = sol.type === "unique" && sol.x !== undefined
    ? coords.toPixel(sol.x, sol.y!)
    : [0, 0];

  const [ox, oy] = coords.toPixel(0, 0);

  // grid
  const integers = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <svg width={WIDTH} height={HEIGHT} style={{ background: "var(--bg-canvas)", display: "block", borderRadius: "10px" }}>
        {integers.map(i => {
          const [x] = coords.toPixel(i, 0);
          const [, y] = coords.toPixel(0, i);
          return (
            <g key={i}>
              <line x1={x} y1={0} x2={x} y2={HEIGHT} stroke="#e4e4ee" strokeWidth={1} />
              <line x1={0} y1={y} x2={WIDTH} y2={y} stroke="#e4e4ee" strokeWidth={1} />
            </g>
          );
        })}
        <line x1={ox} y1={0} x2={ox} y2={HEIGHT} stroke="#9090b8" strokeWidth={1.5} />
        <line x1={0} y1={oy} x2={WIDTH} y2={oy} stroke="#9090b8" strokeWidth={1.5} />

        {pts1 && <line x1={pts1[0]} y1={pts1[1]} x2={pts1[2]} y2={pts1[3]} stroke={line1.color} strokeWidth={2.5} strokeLinecap="round" />}
        {pts2 && <line x1={pts2[0]} y1={pts2[1]} x2={pts2[2]} y2={pts2[3]} stroke={line2.color} strokeWidth={2.5} strokeLinecap="round" />}

        {/* Equation labels */}
        {pts1 && (
          <text x={pts1[2] - 50} y={pts1[3] - 8} fill={line1.color} fontSize={11} fontFamily="monospace">
            {r2(line1.a)}x + {r2(line1.b)}y = {r2(line1.c)}
          </text>
        )}
        {pts2 && (
          <text x={pts2[2] - 50} y={pts2[3] + 14} fill={line2.color} fontSize={11} fontFamily="monospace">
            {r2(line2.a)}x + {r2(line2.b)}y = {r2(line2.c)}
          </text>
        )}

        {/* Intersection */}
        {sol.type === "unique" && (
          <>
            <circle cx={intX} cy={intY} r={6} fill="#15803d" />
            <text x={intX + 10} y={intY - 8} fill="#15803d" fontSize={11} fontFamily="monospace" fontWeight={600}>
              ({r2(sol.x!)}, {r2(sol.y!)})
            </text>
          </>
        )}
      </svg>

      <div style={{
        marginTop: "0.75rem", background: "var(--bg-card)",
        border: "1px solid var(--border)", borderRadius: "8px",
        padding: "0.875rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: line1.color, fontFamily: "monospace", marginBottom: "0.35rem", fontWeight: 600 }}>Line 1: a·x + b·y = c</div>
            <LineSliders line={line1} onChange={setLine1} color={line1.color} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: line2.color, fontFamily: "monospace", marginBottom: "0.35rem", fontWeight: 600 }}>Line 2: a·x + b·y = c</div>
            <LineSliders line={line2} onChange={setLine2} color={line2.color} />
          </div>
        </div>
        <div style={{
          borderTop: "1px solid var(--border)", paddingTop: "0.6rem",
          fontFamily: "monospace", fontSize: "0.85rem",
          color: sol.type === "unique" ? "#15803d" : sol.type === "none" ? "#db2777" : "#b45309",
          fontWeight: 600,
        }}>
          {sol.type === "unique" && `✓ One solution: x = ${r2(sol.x!)}, y = ${r2(sol.y!)}`}
          {sol.type === "none" && "✗ No solution — lines are parallel"}
          {sol.type === "infinite" && "∞ Infinite solutions — lines are identical"}
        </div>
      </div>
    </div>
  );
}
