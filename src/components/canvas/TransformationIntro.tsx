"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { rotation, scaling, shearX } from "@/lib/math/transforms";
import { identity } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";

const PRESETS: { name: string; label: string; matrix: Mat2 }[] = [
  { name: "Identity", label: "Nothing changes", matrix: identity() },
  { name: "Rotate 45°", label: "Everything rotates", matrix: rotation(Math.PI / 4) },
  { name: "Rotate 90°", label: "Quarter turn", matrix: rotation(Math.PI / 2) },
  { name: "Scale ×2", label: "Space stretches out", matrix: scaling(2, 2) },
  { name: "Squash", label: "Stretch x, shrink y", matrix: scaling(2, 0.5) },
  { name: "Shear", label: "Slant — lines stay parallel", matrix: shearX(1) },
];

export function TransformationIntro() {
  const [selected, setSelected] = useState(0);
  const { matrix, label } = PRESETS[selected];

  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <div style={{ marginBottom: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        pick a transformation — see what it does to the grid
      </div>

      <TransformGrid matrix={matrix} width={480} height={380} />

      {/* Preset buttons */}
      <div style={{
        marginTop: "0.75rem",
        display: "flex", flexWrap: "wrap", gap: "0.4rem",
      }}>
        {PRESETS.map((p, i) => (
          <button key={p.name} onClick={() => setSelected(i)} style={{
            padding: "0.4rem 0.75rem",
            fontFamily: "monospace", fontSize: "0.8rem",
            background: i === selected ? "var(--accent)" : "var(--bg-card)",
            color: i === selected ? "#fff" : "var(--text-muted)",
            border: `1px solid ${i === selected ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "6px", cursor: "pointer",
            fontWeight: i === selected ? 600 : 400,
          }}>
            {p.name}
          </button>
        ))}
      </div>

      <div style={{
        marginTop: "0.75rem",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "0.65rem 1rem",
        fontFamily: "monospace", fontSize: "0.85rem", color: "var(--text-muted)",
      }}>
        <span style={{ color: "var(--text)", fontWeight: 600 }}>{PRESETS[selected].name}:</span>{" "}
        {label}. The <span style={{ color: "#0284c7", fontWeight: 600 }}>blue arrow</span> shows
        where î goes; the <span style={{ color: "#db2777", fontWeight: 600 }}>pink arrow</span> shows where ĵ goes.
      </div>
    </div>
  );
}
