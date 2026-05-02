"use client";
import React, { useState } from "react";
import type { Mat2 } from "@/lib/math/mat2";

function round3(n: number) { return Math.round(n * 1000) / 1000; }
function round2(n: number) { return Math.round(n * 100) / 100; }

function applyMarkov(T: Mat2, dist: [number, number]): [number, number] {
  return [
    T[0] * dist[0] + T[1] * dist[1],
    T[2] * dist[0] + T[3] * dist[1],
  ];
}

function stationaryDist(T: Mat2): [number, number] {
  // Stationary: π₁ = T[0]π₁ + T[1]π₂  and  π₁ + π₂ = 1
  // (T[1]) / (1 - T[0] + T[1]) = π₂
  const denom = (1 - T[0] + T[1]);
  if (Math.abs(denom) < 1e-9) return [0.5, 0.5];
  const pi2 = T[1] / denom;
  return [1 - pi2, pi2];
}

const PRESETS = [
  { label: "Slow mixing", T: [0.9, 0.1, 0.2, 0.8] as Mat2 },
  { label: "Fast mixing", T: [0.4, 0.6, 0.5, 0.5] as Mat2 },
  { label: "Asymmetric", T: [0.7, 0.05, 0.3, 0.95] as Mat2 },
];

const BAR_STEPS = 20;

export function MarkovChain() {
  const [T, setT] = useState<Mat2>([0.9, 0.1, 0.2, 0.8]);
  const [initP, setInitP] = useState(0.9); // initial P(state A)
  const [steps, setSteps] = useState(15);

  // Build history of distributions
  let dist: [number, number] = [initP, 1 - initP];
  const history: [number, number][] = [dist];
  for (let i = 0; i < steps; i++) {
    dist = applyMarkov(T, dist);
    history.push(dist);
  }

  const stationary = stationaryDist(T);
  const isValid = T[0] + T[1] > 0.999 && T[0] + T[1] < 1.001 && T[2] + T[3] > 0.999 && T[2] + T[3] < 1.001;

  function updateT(idx: number, val: string) {
    const n = Math.max(0, Math.min(1, parseFloat(val)));
    if (isNaN(n)) return;
    const next = [...T] as Mat2;
    next[idx] = n;
    // Normalize the row
    if (idx === 0) next[1] = parseFloat((1 - n).toFixed(3));
    if (idx === 1) next[0] = parseFloat((1 - n).toFixed(3));
    if (idx === 2) next[3] = parseFloat((1 - n).toFixed(3));
    if (idx === 3) next[2] = parseFloat((1 - n).toFixed(3));
    setT(next);
  }

  const BAR_H = 24;
  const BAR_W = 340;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => setT(p.T)}
            style={{
              padding: "0.3rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-muted)", cursor: "pointer",
            }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Transition matrix */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.4rem" }}>Transition matrix T</div>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: "0.3rem", alignItems: "center" }}>
            <span style={{ color: "var(--text-muted)" }}></span>
            <span style={{ color: "#0284c7", textAlign: "center" }}>→A</span>
            <span style={{ color: "#db2777", textAlign: "center" }}>→B</span>
            <span style={{ color: "#0284c7" }}>from A</span>
            {[0, 1].map(i => (
              <input key={i} type="number" min="0" max="1" step="0.05" value={round3(T[i])}
                onChange={e => updateT(i, e.target.value)}
                style={{
                  width: "56px", padding: "0.25rem", textAlign: "center",
                  border: "1px solid var(--border)", borderRadius: "4px",
                  background: "var(--bg)", color: "var(--text)", fontFamily: "monospace", fontSize: "0.82rem",
                }} />
            ))}
            <span style={{ color: "#db2777" }}>from B</span>
            {[2, 3].map(i => (
              <input key={i} type="number" min="0" max="1" step="0.05" value={round3(T[i])}
                onChange={e => updateT(i, e.target.value)}
                style={{
                  width: "56px", padding: "0.25rem", textAlign: "center",
                  border: "1px solid var(--border)", borderRadius: "4px",
                  background: "var(--bg)", color: "var(--text)", fontFamily: "monospace", fontSize: "0.82rem",
                }} />
            ))}
          </div>
        </div>

        <div style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.4rem" }}>Initial distribution</div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#0284c7" }}>P(A)</span>
            <input type="range" min={0} max={1} step={0.01} value={initP}
              onChange={e => setInitP(parseFloat(e.target.value))} style={{ width: "100px" }} />
            <span>{round2(initP)}</span>
          </label>
        </div>
      </div>

      {/* Distribution over time */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-muted)", marginBottom: "2px" }}>
          <span>Step 0</span>
          <span>Step {steps}</span>
        </div>
        {history.slice(0, steps + 1).map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.68rem", fontFamily: "monospace", color: "var(--text-faint)", width: "16px", textAlign: "right" }}>{i}</span>
            <div style={{ flex: 1, height: "16px", display: "flex", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ flex: d[0], background: "#0284c7", transition: "flex 0.2s" }} />
              <div style={{ flex: d[1], background: "#db2777", transition: "flex 0.2s" }} />
            </div>
            <span style={{ fontSize: "0.68rem", fontFamily: "monospace", color: "var(--text-muted)", width: "36px" }}>
              {round2(d[0])}
            </span>
          </div>
        ))}
        {/* Stationary */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.6, marginTop: "4px" }}>
          <span style={{ fontSize: "0.68rem", fontFamily: "monospace", color: "var(--accent)", width: "16px", textAlign: "right" }}>∞</span>
          <div style={{ flex: 1, height: "16px", display: "flex", borderRadius: "3px", overflow: "hidden", border: "1px dashed var(--accent)" }}>
            <div style={{ flex: stationary[0], background: "#0284c7" }} />
            <div style={{ flex: stationary[1], background: "#db2777" }} />
          </div>
          <span style={{ fontSize: "0.68rem", fontFamily: "monospace", color: "var(--accent)", width: "36px" }}>
            {round2(stationary[0])}
          </span>
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem", fontFamily: "monospace" }}>
        <span style={{ color: "var(--text-muted)" }}>Steps</span>
        <input type="range" min={5} max={30} value={steps} onChange={e => setSteps(parseInt(e.target.value))} style={{ flex: 1 }} />
        <span style={{ color: "var(--text)" }}>{steps}</span>
      </label>

      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        <span style={{ color: "#0284c7" }}>■</span> State A &nbsp; <span style={{ color: "#db2777" }}>■</span> State B &nbsp;
        The dashed bar is the stationary distribution (the eigenvector with λ=1).
      </p>
    </div>
  );
}
