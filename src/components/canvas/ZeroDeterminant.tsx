"use client";
import React, { useState } from "react";
import { TransformGrid } from "./TransformGrid";
import { determinant } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";

function r3(n: number) { return Math.round(n * 1000) / 1000; }

// Parameterize: first column [cos θ, sin θ], second column [a·cos θ, a·sin θ]
// This guarantees det = 0 for any θ and a≠1

export function ZeroDeterminant() {
  const [theta, setTheta] = useState(0.5);
  const [d, setD] = useState(0.5); // how close to singular (0 = fully singular, 1 = identity-ish)

  // Build a matrix that transitions from identity toward singular
  // M = [1-d*s²,  d*sc; d*sc, 1-d*c²] — approaches projection as d→1
  const c = Math.cos(theta), s = Math.sin(theta);
  const matrix: Mat2 = [
    1 - d * s * s,  d * s * c,
    d * s * c,      1 - d * c * c,
  ];

  const det = determinant(matrix);
  const pct = Math.round(Math.abs(det) * 100);

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        drag the sliders — approach det = 0 and watch the grid collapse
      </div>

      <div style={{ position: "relative" }}>
        <TransformGrid matrix={matrix} width={480} height={360} showBasisVectors />
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: "rgba(255,255,255,0.92)", border: "1px solid var(--border)",
          borderRadius: "8px", padding: "0.4rem 0.75rem",
          fontFamily: "monospace", fontSize: "0.9rem",
        }}>
          <span style={{ color: "var(--text-muted)" }}>det = </span>
          <span style={{ fontWeight: 700, color: Math.abs(det) < 0.05 ? "#db2777" : Math.abs(det) < 0.3 ? "#b45309" : "#15803d" }}>
            {r3(det)}
          </span>
        </div>
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "0.65rem",
      }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem", fontFamily: "monospace", fontSize: "0.82rem" }}>
            <span style={{ color: "var(--text-muted)" }}>collapse direction (θ)</span>
            <span style={{ color: "var(--text)" }}>{r3(theta)} rad</span>
          </div>
          <input type="range" min={0} max={Math.PI} step={0.05} value={theta}
            onChange={e => setTheta(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#0284c7" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem", fontFamily: "monospace", fontSize: "0.82rem" }}>
            <span style={{ color: "var(--text-muted)" }}>how singular (0 = identity, 1 = fully collapsed)</span>
            <span style={{ color: Math.abs(det) < 0.05 ? "#db2777" : "var(--text)" }}>{r3(d)}</span>
          </div>
          <input type="range" min={0} max={1} step={0.01} value={d}
            onChange={e => setD(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#db2777" }} />
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.6rem", fontSize: "0.82rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
          {Math.abs(det) < 0.05
            ? "⚠ Nearly singular — the entire plane is being squashed onto one line"
            : Math.abs(det) < 0.3
            ? "Getting close — notice the grid lines bunching together"
            : `Area scaling: ${pct}% of original`}
        </div>
      </div>
    </div>
  );
}
