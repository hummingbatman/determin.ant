"use client";
import React, { useState } from "react";
import { MatrixEditor } from "./MatrixEditor";
import { eigenvalues, eigenvectors, inverse, multiply, determinant } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

function round3(n: number) { return Math.round(n * 1000) / 1000; }
function fmt(n: number) { return round3(n).toString().padStart(6); }

function MatDisplay({ label, m, color }: { label: string; m: Mat2; color?: string }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.82rem" }}>
      <div style={{ color: color || "var(--text)", fontWeight: 700, marginBottom: "0.25rem" }}>{label}</div>
      <div style={{
        display: "inline-grid", gridTemplateColumns: "1fr 1fr",
        gap: "0.2rem 0.6rem",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "6px", padding: "0.5rem 0.75rem",
        color: color || "var(--text)",
      }}>
        <span>{round3(m[0])}</span><span>{round3(m[1])}</span>
        <span>{round3(m[2])}</span><span>{round3(m[3])}</span>
      </div>
    </div>
  );
}

export function DiagonalizationVisualizer() {
  const [matrix, setMatrix] = useState<Mat2>([3, 1, 1, 3]);

  const evs = eigenvalues(matrix);
  const evecs = eigenvectors(matrix);

  const canDiagonalize = evs !== null && evecs !== null &&
    Math.abs(determinant([evecs[0][0], evecs[1][0], evecs[0][1], evecs[1][1]])) > 1e-9;

  let P: Mat2 | null = null;
  let D: Mat2 | null = null;
  let Pinv: Mat2 | null = null;
  let PDP: Mat2 | null = null;

  if (canDiagonalize && evs && evecs) {
    P = [evecs[0][0], evecs[1][0], evecs[0][1], evecs[1][1]];
    D = [evs[0], 0, 0, evs[1]];
    Pinv = inverse(P);
    if (Pinv) PDP = multiply(multiply(P, D), Pinv);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      <MatrixEditor value={matrix} onChange={setMatrix} />

      {!canDiagonalize ? (
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "8px", padding: "1rem", fontSize: "0.85rem", color: "#f59e0b",
        }}>
          {evs === null
            ? "This matrix has complex eigenvalues — it cannot be diagonalized over ℝ."
            : "This matrix cannot be diagonalized (repeated eigenvalue with insufficient eigenvectors)."}
        </div>
      ) : (
        <>
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}>
            <p style={{ margin: "0 0 0.4rem", color: "var(--text)", fontWeight: 600 }}>A = P · D · P⁻¹</p>
            <p style={{ margin: 0 }}>Columns of P are the eigenvectors. D has eigenvalues on the diagonal.</p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            {P && <MatDisplay label="P" m={P} color="#0284c7" />}
            {D && <MatDisplay label="D" m={D} color="var(--accent)" />}
            {Pinv && <MatDisplay label="P⁻¹" m={Pinv} color="#db2777" />}
          </div>

          {PDP && (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              <MatDisplay label="A (original)" m={matrix} />
              <span style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>=</span>
              <MatDisplay label="P·D·P⁻¹" m={PDP} color="var(--accent)" />
            </div>
          )}
        </>
      )}
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Try a rotation matrix — it can&apos;t be diagonalized over ℝ.
      </p>
    </div>
  );
}
