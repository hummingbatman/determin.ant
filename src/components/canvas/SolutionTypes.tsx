"use client";
import React, { useState } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";

const WIDTH = 480, HEIGHT = 360;
const RANGE: [number, number] = [-5, 5];

const CASES = [
  {
    name: "One solution",
    label: "Lines cross at one point",
    description: "The two equations have different slopes, so the lines meet at exactly one point. There is a unique solution.",
    lines: [
      { a: 1, b: 1, c: 3, color: "#0284c7" },
      { a: 2, b: -1, c: 1, color: "#db2777" },
    ],
    solution: { x: 4/3, y: 5/3 },
    det: "≠ 0",
    detColor: "#15803d",
  },
  {
    name: "No solution",
    label: "Lines are parallel",
    description: "Same slope, different intercepts. The lines never meet — no (x, y) satisfies both equations simultaneously.",
    lines: [
      { a: 1, b: 2, c: 4, color: "#0284c7" },
      { a: 1, b: 2, c: 7, color: "#db2777" },
    ],
    solution: null,
    det: "= 0",
    detColor: "#db2777",
  },
  {
    name: "Infinite solutions",
    label: "Lines are the same",
    description: "One equation is a multiple of the other. They describe the same line — every point on it is a solution.",
    lines: [
      { a: 1, b: 2, c: 4, color: "#0284c7" },
      { a: 2, b: 4, c: 8, color: "#db2777" },
    ],
    solution: null,
    det: "= 0",
    detColor: "#b45309",
  },
];

export function SolutionTypes() {
  const [selected, setSelected] = useState(0);
  const cas = CASES[selected];
  const coords = useSVGCoordinates({ width: WIDTH, height: HEIGHT, range: RANGE });

  function linePoints(a: number, b: number, c: number) {
    const far = 7;
    if (Math.abs(b) > 0.001) {
      return [
        ...coords.toPixel(-far, (c - a * -far) / b),
        ...coords.toPixel(far, (c - a * far) / b),
      ];
    } else if (Math.abs(a) > 0.001) {
      const x = c / a;
      return [...coords.toPixel(x, -far), ...coords.toPixel(x, far)];
    }
    return null;
  }

  const integers = [-4, -3, -2, -1, 1, 2, 3, 4];
  const [ox, oy] = coords.toPixel(0, 0);

  const offset = selected === 2 ? 2 : 0; // offset 2nd line slightly when same

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        {CASES.map((c, i) => (
          <button key={c.name} onClick={() => setSelected(i)} style={{
            flex: 1, padding: "0.4rem 0.5rem",
            fontFamily: "monospace", fontSize: "0.75rem", textAlign: "center",
            background: i === selected ? "var(--accent)" : "var(--bg-card)",
            color: i === selected ? "#fff" : "var(--text-muted)",
            border: `1px solid ${i === selected ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "6px", cursor: "pointer",
          }}>{c.name}</button>
        ))}
      </div>

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

        {cas.lines.map((line, i) => {
          const pts = linePoints(line.a, line.b, line.c);
          if (!pts) return null;
          const off = i === 1 && selected === 2 ? 3 : 0;
          return (
            <line key={i}
              x1={pts[0]} y1={pts[1] + off}
              x2={pts[2]} y2={pts[3] + off}
              stroke={line.color} strokeWidth={i === 1 && selected === 2 ? 2 : 2.5}
              strokeLinecap="round"
              strokeDasharray={i === 1 && selected === 2 ? "6 4" : undefined}
              opacity={i === 1 && selected === 2 ? 0.7 : 1}
            />
          );
        })}

        {cas.solution && (() => {
          const [px, py] = coords.toPixel(cas.solution.x, cas.solution.y);
          return (
            <>
              <circle cx={px} cy={py} r={7} fill="#15803d" />
              <text x={px + 12} y={py - 8} fill="#15803d" fontSize={11} fontFamily="monospace" fontWeight={600}>
                ({Math.round(cas.solution.x * 100) / 100}, {Math.round(cas.solution.y * 100) / 100})
              </text>
            </>
          );
        })()}

        <text x={16} y={24} fontSize={12} fontFamily="monospace" fill="var(--text-muted)" fontWeight={600}>
          {cas.label}
        </text>
      </svg>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "0.875rem 1rem",
        display: "flex", flexDirection: "column", gap: "0.4rem",
      }}>
        <p style={{ margin: 0, fontSize: "0.87rem", color: "var(--text-muted)" }}>{cas.description}</p>
        <div style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
          <span style={{ color: "var(--text-faint)" }}>det(A) </span>
          <span style={{ color: cas.detColor, fontWeight: 600 }}>{cas.det}</span>
        </div>
      </div>
    </div>
  );
}
