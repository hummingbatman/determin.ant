"use client";
import React, { useState } from "react";
import { MatrixEditor } from "./MatrixEditor";
import { eigenvalues, determinant, trace } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";

function round3(n: number) { return Math.round(n * 1000) / 1000; }
function round2(n: number) { return Math.round(n * 100) / 100; }

function sign(n: number): string {
  return n < 0 ? `− ${Math.abs(round3(n))}` : `+ ${round3(n)}`;
}

export function CharPolyExplorer() {
  const [matrix, setMatrix] = useState<Mat2>([3, 1, 1, 3]);

  const t = trace(matrix);
  const d = determinant(matrix);
  const evs = eigenvalues(matrix);
  const disc = t * t - 4 * d;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      <MatrixEditor value={matrix} onChange={setMatrix} />

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1.25rem", fontFamily: "monospace", fontSize: "0.85rem",
        color: "var(--text)", lineHeight: 1.9,
      }}>
        <p style={{ margin: "0 0 0.5rem", fontWeight: 700, color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Characteristic polynomial
        </p>

        <p style={{ margin: "0 0 0.25rem" }}>
          det(A − λI) = 0
        </p>
        <p style={{ margin: "0 0 0.25rem" }}>
          λ² − tr(A)·λ + det(A) = 0
        </p>
        <p style={{ margin: "0 0 0.75rem", color: "var(--accent)" }}>
          λ² − {round3(t)}λ {sign(d)} = 0
        </p>

        <p style={{ margin: "0 0 0.25rem", color: "var(--text-muted)", fontSize: "0.78rem" }}>
          tr(A) = {round3(t)} · · det(A) = {round3(d)} · · Δ = {round3(disc)}
        </p>

        {disc < 0 ? (
          <p style={{ margin: "0.75rem 0 0", color: "#f59e0b", fontWeight: 600 }}>
            Δ &lt; 0 → complex eigenvalues (no real solutions)
          </p>
        ) : evs ? (
          <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "var(--accent-dim)", borderRadius: "6px" }}>
            <p style={{ margin: "0 0 0.25rem", fontWeight: 700 }}>Real eigenvalues:</p>
            <p style={{ margin: "0 0 0.1rem" }}>λ₁ = {round2(evs[0])}</p>
            <p style={{ margin: 0 }}>λ₂ = {round2(evs[1])}</p>
          </div>
        ) : null}
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontSize: "0.82rem",
        color: "var(--text-muted)",
      }}>
        <strong style={{ color: "var(--text)" }}>Quick check:</strong> λ₁ + λ₂ = tr(A) = {round3(t)}
        {evs && ` ✓ (${round2(evs[0])} + ${round2(evs[1])} = ${round2(evs[0] + evs[1])})`}
        <br />
        λ₁ · λ₂ = det(A) = {round3(d)}
        {evs && ` ✓ (${round2(evs[0])} × ${round2(evs[1])} = ${round2(evs[0] * evs[1])})`}
      </div>

      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Edit the matrix. Watch how tr(A) and det(A) determine the eigenvalues.
      </p>
    </div>
  );
}
