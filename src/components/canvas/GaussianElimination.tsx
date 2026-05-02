"use client";
import React, { useState } from "react";
import { gaussianElimination2x2 } from "@/lib/math/solvers";
import type { AugmentedRow } from "@/lib/math/solvers";

function r3(n: number) { return Math.round(n * 1000) / 1000; }

const EXAMPLES: { label: string; r1: AugmentedRow; r2: AugmentedRow }[] = [
  { label: "Unique solution",   r1: [2, 1, 5],  r2: [4, -1, 7] },
  { label: "No solution",       r1: [1, 2, 3],  r2: [2, 4, 8]  },
  { label: "Infinite solutions",r1: [1, 2, 3],  r2: [2, 4, 6]  },
  { label: "Needs row swap",    r1: [0, 1, 3],  r2: [2, 1, 5]  },
];

function MatrixRow({ row, highlight, label }: { row: AugmentedRow; highlight?: boolean; label?: string }) {
  const style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "56px 56px 12px 56px",
    gap: "0.25rem",
    alignItems: "center",
    padding: "0.3rem 0.5rem",
    borderRadius: "6px",
    background: highlight ? "rgba(21,128,61,0.08)" : "transparent",
    border: highlight ? "1px solid rgba(21,128,61,0.2)" : "1px solid transparent",
    fontFamily: "monospace",
    fontSize: "0.95rem",
    transition: "background 0.2s",
  };
  return (
    <div style={style}>
      <span style={{ textAlign: "center", color: "var(--text)", fontWeight: 600 }}>{r3(row[0])}</span>
      <span style={{ textAlign: "center", color: "var(--text)", fontWeight: 600 }}>{r3(row[1])}</span>
      <span style={{ textAlign: "center", color: "var(--text-faint)" }}>│</span>
      <span style={{ textAlign: "center", color: "#15803d", fontWeight: 600 }}>{r3(row[2])}</span>
    </div>
  );
}

export function GaussianElimination() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [step, setStep] = useState(0);

  const ex = EXAMPLES[exampleIdx];
  const { steps, solution } = gaussianElimination2x2(ex.r1, ex.r2);
  const current = steps[Math.min(step, steps.length - 1)];
  const isLast = step >= steps.length - 1;

  function changeExample(idx: number) {
    setExampleIdx(idx);
    setStep(0);
  }

  return (
    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
        step through the row reduction
      </div>

      {/* Example picker */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {EXAMPLES.map((e, i) => (
          <button key={e.label} onClick={() => changeExample(i)} style={{
            padding: "0.35rem 0.7rem", fontFamily: "monospace", fontSize: "0.75rem",
            background: i === exampleIdx ? "var(--accent)" : "var(--bg-card)",
            color: i === exampleIdx ? "#fff" : "var(--text-muted)",
            border: `1px solid ${i === exampleIdx ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "6px", cursor: "pointer",
          }}>{e.label}</button>
        ))}
      </div>

      {/* Matrix display */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "10px", padding: "1.25rem",
        display: "flex", flexDirection: "column", gap: "0.5rem",
      }}>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "56px 56px 12px 56px", gap: "0.25rem", paddingLeft: "0.5rem" }}>
          {["x", "y", "", "="].map((h, i) => (
            <span key={i} style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-faint)", fontFamily: "monospace" }}>{h}</span>
          ))}
        </div>

        <MatrixRow row={current.matrix[0]} highlight={current.operation === "swap"} />
        <MatrixRow row={current.matrix[1]} highlight={current.operation !== "none" && current.operation !== "swap"} />

        {/* Step counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
          <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-faint)" }}>
            step {Math.min(step + 1, steps.length)} / {steps.length}
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[0, 1, 2, 3, 4].slice(0, steps.length).map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i <= step ? "var(--accent)" : "var(--border)",
                cursor: "pointer",
              }} onClick={() => setStep(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* Operation description */}
      <div style={{
        background: step === 0 ? "var(--bg-card)" : "rgba(21,128,61,0.06)",
        border: `1px solid ${step === 0 ? "var(--border)" : "rgba(21,128,61,0.2)"}`,
        borderRadius: "8px", padding: "0.75rem 1rem",
        fontFamily: "monospace", fontSize: "0.87rem",
        color: step === 0 ? "var(--text-muted)" : "#15803d",
      }}>
        {current.description}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
          flex: 1, padding: "0.5rem", fontFamily: "monospace", fontSize: "0.85rem",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "6px", cursor: step === 0 ? "not-allowed" : "pointer",
          color: step === 0 ? "var(--text-faint)" : "var(--text-muted)",
        }}>← Previous</button>
        <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={isLast} style={{
          flex: 1, padding: "0.5rem", fontFamily: "monospace", fontSize: "0.85rem",
          background: isLast ? "var(--bg-card)" : "var(--accent)",
          border: "1px solid var(--border)",
          borderRadius: "6px", cursor: isLast ? "not-allowed" : "pointer",
          color: isLast ? "var(--text-faint)" : "#fff", fontWeight: isLast ? 400 : 600,
        }}>Next step →</button>
      </div>

      {/* Solution */}
      {isLast && (
        <div style={{
          background: solution.type === "unique" ? "rgba(21,128,61,0.08)" : "rgba(180,83,9,0.08)",
          border: `1px solid ${solution.type === "unique" ? "rgba(21,128,61,0.25)" : "rgba(180,83,9,0.25)"}`,
          borderRadius: "8px", padding: "0.75rem 1rem",
          fontFamily: "monospace", fontSize: "0.87rem",
          color: solution.type === "unique" ? "#15803d" : "#b45309",
          fontWeight: 600,
        }}>
          {solution.type === "unique" && `Solution: x = ${r3(solution.x!)}, y = ${r3(solution.y!)}`}
          {solution.type === "none" && "No solution — system is inconsistent"}
          {solution.type === "infinite" && "Infinite solutions — system is dependent"}
        </div>
      )}
    </div>
  );
}
