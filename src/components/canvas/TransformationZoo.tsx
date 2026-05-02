"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { rotation, scaling, shearX, shearY, reflection } from "@/lib/math/transforms";
import { identity } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import { determinant } from "@/lib/math/mat2";
import { Math as MathDisplay } from "@/components/ui/Math";

function r2(n: number) { return Math.round(n * 100) / 100; }

const ZOO: {
  name: string;
  matrix: Mat2;
  formula: string;
  description: string;
}[] = [
  {
    name: "Identity",
    matrix: identity(),
    formula: "\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}",
    description: "Does nothing. Every vector stays exactly where it is.",
  },
  {
    name: "Rotation",
    matrix: rotation(Math.PI / 4),
    formula: "\\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\\\sin\\theta & \\cos\\theta\\end{bmatrix}",
    description: "Rotates every point around the origin. Preserves lengths and angles.",
  },
  {
    name: "Uniform scale",
    matrix: scaling(2, 2),
    formula: "\\begin{bmatrix}s&0\\\\0&s\\end{bmatrix}",
    description: "Zooms in or out uniformly. Shapes stay the same, just bigger or smaller.",
  },
  {
    name: "Non-uniform scale",
    matrix: scaling(2, 0.5),
    formula: "\\begin{bmatrix}s_x&0\\\\0&s_y\\end{bmatrix}",
    description: "Stretches or squashes different axes independently. Circles become ellipses.",
  },
  {
    name: "Shear X",
    matrix: shearX(1),
    formula: "\\begin{bmatrix}1&k\\\\0&1\\end{bmatrix}",
    description: "Slants horizontally. Vertical lines tilt; horizontal lines stay horizontal.",
  },
  {
    name: "Shear Y",
    matrix: shearY(1),
    formula: "\\begin{bmatrix}1&0\\\\k&1\\end{bmatrix}",
    description: "Slants vertically. Horizontal lines tilt; vertical lines stay.",
  },
  {
    name: "Reflect x-axis",
    matrix: reflection([1, 0]),
    formula: "\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}",
    description: "Flips everything over the x-axis. y-coordinates negate.",
  },
  {
    name: "Reflect y=x",
    matrix: reflection([1, 1]),
    formula: "\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}",
    description: "Flips over the diagonal. x and y coordinates swap.",
  },
  {
    name: "Projection",
    matrix: [1, 0, 0, 0],
    formula: "\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}",
    description: "Squashes everything onto the x-axis. Determinant = 0 — information is lost.",
  },
];

export function TransformationZoo() {
  const [selected, setSelected] = useState(0);
  const entry = ZOO[selected];
  const det = determinant(entry.matrix);

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <TransformGrid matrix={entry.matrix} width={480} height={300} />

      {/* Zoo grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
        {ZOO.map((z, i) => (
          <button key={z.name} onClick={() => setSelected(i)} style={{
            padding: "0.4rem 0.5rem",
            fontFamily: "monospace", fontSize: "0.72rem",
            background: i === selected ? "var(--accent)" : "var(--bg-card)",
            color: i === selected ? "#fff" : "var(--text-muted)",
            border: `1px solid ${i === selected ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "6px", cursor: "pointer", textAlign: "left",
          }}>
            {z.name}
          </button>
        ))}
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "0.875rem 1.1rem",
        display: "flex", flexDirection: "column", gap: "0.5rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{entry.name}</div>
            <div style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{entry.description}</div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <MathDisplay tex={entry.formula} />
          </div>
        </div>
        <div style={{ fontSize: "0.78rem", fontFamily: "monospace", color: det === 0 ? "#b45309" : det < 0 ? "#db2777" : "#15803d" }}>
          det = {r2(det)} · {det === 0 ? "collapses space" : det < 0 ? "flips orientation" : "preserves orientation"}
        </div>
      </div>
    </div>
  );
}
