"use client";
import React, { useState } from "react";
import type { Mat2 } from "@/lib/math/mat2";

function round3(n: number) { return Math.round(n * 1000) / 1000; }

function luDecompose(A: Mat2): { L: Mat2; U: Mat2 } | null {
  const [a, b, c, d] = A;
  if (Math.abs(a) < 1e-12) return null; // pivot is zero
  const l21 = c / a;
  const u11 = a, u12 = b;
  const u22 = d - l21 * b;
  const L: Mat2 = [1, 0, l21, 1];
  const U: Mat2 = [u11, u12, 0, u22];
  return { L, U };
}

function MatDisplay({ label, m, color, note }: { label: string; m: Mat2; color?: string; note?: string }) {
  const fmt = (n: number) => {
    const r = round3(n);
    return r === 0 ? "0" : r.toString();
  };
  return (
    <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.82rem" }}>
      <div style={{ color: color || "var(--text)", fontWeight: 700, marginBottom: "0.2rem" }}>
        {label}
        {note && <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.72rem", marginLeft: "0.3rem" }}>{note}</span>}
      </div>
      <div style={{
        display: "inline-grid", gridTemplateColumns: "1fr 1fr",
        gap: "0.15rem 0.7rem",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "6px", padding: "0.5rem 0.8rem",
        color: color || "var(--text)",
      }}>
        {m.map((v, i) => <span key={i}>{fmt(v)}</span>)}
      </div>
    </div>
  );
}

const PRESETS: { label: string; A: Mat2 }[] = [
  { label: "Simple", A: [2, 1, 4, 3] },
  { label: "Upper tri", A: [3, 2, 0, 5] },
  { label: "Symmetric", A: [4, 2, 2, 3] },
  { label: "Near-singular", A: [1, 2, 2, 4.01] },
];

export function LUDecomposition() {
  const [matrix, setMatrix] = useState<Mat2>([2, 1, 4, 3]);

  const result = luDecompose(matrix);

  function update(idx: number, val: string) {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    const next = [...matrix] as Mat2;
    next[idx] = n;
    setMatrix(next);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => setMatrix(p.A)}
            style={{
              padding: "0.3rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-muted)", cursor: "pointer",
            }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Matrix editor */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.2rem" }}>A</div>
          <div style={{
            display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "6px", padding: "0.5rem",
          }}>
            {matrix.map((v, i) => (
              <input key={i} type="number" step="0.5" defaultValue={v}
                onChange={e => update(i, e.target.value)}
                style={{
                  width: "52px", padding: "0.3rem", textAlign: "center",
                  border: "1px solid var(--border)", borderRadius: "4px",
                  background: "var(--bg)", color: "var(--text)", fontFamily: "monospace", fontSize: "0.82rem",
                }} />
            ))}
          </div>
        </div>
      </div>

      {result === null ? (
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "8px", padding: "1rem", fontSize: "0.85rem", color: "#f59e0b",
        }}>
          Zero pivot — partial pivoting needed (swap rows first).
          Basic LU requires a non-zero top-left entry.
        </div>
      ) : (
        <>
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "0.75rem", fontFamily: "monospace", fontSize: "0.82rem",
            color: "var(--text-muted)", textAlign: "center",
          }}>
            A = L · U
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <MatDisplay label="L" m={result.L} color="#0284c7" note="(lower, 1s on diag)" />
            <span style={{ fontFamily: "monospace", color: "var(--text-muted)", fontSize: "1.1rem" }}>×</span>
            <MatDisplay label="U" m={result.U} color="#db2777" note="(upper triangular)" />
          </div>

          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
            color: "var(--text)", lineHeight: 1.8,
          }}>
            <p style={{ margin: "0 0 0.2rem" }}>
              Multiplier: L[2,1] = {round3(result.L[2])} (how much row 1 was subtracted from row 2)
            </p>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              det(A) = det(L)·det(U) = 1 · {round3(result.U[0])}·{round3(result.U[3])} = {round3(result.U[0] * result.U[3])}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
