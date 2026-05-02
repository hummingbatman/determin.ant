"use client";
import React, { useState } from "react";

const SIZE = 8;

/** A simple 8×8 gradient-ish pattern to approximate */
function makeMatrix(): number[][] {
  const M: number[][] = [];
  for (let r = 0; r < SIZE; r++) {
    const row: number[] = [];
    for (let c = 0; c < SIZE; c++) {
      // Simple pattern: diagonal stripes + a bump
      const base = ((r + c) / (2 * SIZE)) * 200;
      const bump = r === 3 || r === 4 ? 60 : 0;
      row.push(Math.round(base + bump));
    }
    M.push(row);
  }
  return M;
}

/** Outer product of two vectors */
function outer(u: number[], v: number[]): number[][] {
  return u.map(ui => v.map(vi => ui * vi));
}

/** Matrix add */
function matAdd(A: number[][], B: number[][]): number[][] {
  return A.map((row, r) => row.map((val, c) => val + B[r][c]));
}

/** Simple power iteration SVD for one singular value + vectors */
function topSingularPair(M: number[][]): { sigma: number; u: number[]; v: number[] } {
  const n = M.length, m = M[0].length;
  // Start with a random-ish vector
  let v: number[] = Array.from({ length: m }, (_, i) => Math.cos(i));
  const normalize = (x: number[]) => {
    const len = Math.sqrt(x.reduce((s, xi) => s + xi * xi, 0));
    return len < 1e-12 ? x : x.map(xi => xi / len);
  };
  v = normalize(v);
  for (let iter = 0; iter < 40; iter++) {
    // u = Mv
    const u: number[] = Array(n).fill(0);
    for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) u[r] += M[r][c] * v[c];
    const un = normalize(u);
    // v = Mᵀu
    const vn2: number[] = Array(m).fill(0);
    for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) vn2[c] += M[r][c] * un[r];
    v = normalize(vn2);
  }
  const u2: number[] = Array(n).fill(0);
  for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) u2[r] += M[r][c] * v[c];
  const sigma = Math.sqrt(u2.reduce((s, x) => s + x * x, 0));
  const uNorm = normalize(u2);
  return { sigma, u: uNorm, v };
}

/** Deflate matrix: M = M - σ·u·vᵀ */
function deflate(M: number[][], sigma: number, u: number[], v: number[]): number[][] {
  return M.map((row, r) => row.map((val, c) => val - sigma * u[r] * v[c]));
}

function clamp(x: number): number { return Math.max(0, Math.min(255, Math.round(x))); }

const ORIGINAL = makeMatrix();
const MAX_RANK = 4;

// Precompute all rank-k approximations
const APPROXS: number[][][][] = [];
let working = ORIGINAL.map(r => [...r]);
const sigmas: number[] = [], us: number[][] = [], vs: number[][] = [];
for (let k = 0; k < MAX_RANK; k++) {
  const { sigma, u, v } = topSingularPair(working);
  sigmas.push(sigma);
  us.push(u);
  vs.push(v);
  working = deflate(working, sigma, u, v);
}

function approxAtRank(k: number): number[][] {
  if (k === 0) return Array.from({ length: SIZE }, () => Array(SIZE).fill(128));
  let A = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  for (let i = 0; i < k; i++) {
    const outer2 = outer(us[i], vs[i]);
    A = matAdd(A, outer2.map(row => row.map(v2 => v2 * sigmas[i])));
  }
  return A;
}

const CELL = 36;

function MatrixDisplay({ data, label }: { data: number[][]; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <svg width={SIZE * CELL} height={SIZE * CELL} style={{ display: "block", borderRadius: "6px", overflow: "hidden" }}>
        {data.map((row, r) =>
          row.map((val, c) => {
            const gray = clamp(val);
            return (
              <rect key={`${r}-${c}`}
                x={c * CELL} y={r * CELL} width={CELL} height={CELL}
                fill={`rgb(${gray},${gray},${gray})`}
              />
            );
          })
        )}
      </svg>
      <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

export function ImageCompression() {
  const [rank, setRank] = useState(1);

  const approx = approxAtRank(rank);
  const totalVals = SIZE * SIZE;
  const storedVals = rank * (SIZE + SIZE + 1);
  const compressionPct = Math.round((1 - storedVals / totalVals) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
        <MatrixDisplay data={ORIGINAL} label="original (rank 4)" />
        <MatrixDisplay data={approx} label={`rank-${rank} approx`} />
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--text-muted)" }}>Rank</span>
          <input type="range" min={1} max={MAX_RANK} step={1} value={rank}
            onChange={e => setRank(parseInt(e.target.value))}
            style={{ flex: 1 }} />
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.1rem" }}>{rank}</span>
        </label>
        <p style={{ margin: "0 0 0.2rem" }}>
          Original storage: {totalVals} values
        </p>
        <p style={{ margin: "0 0 0.2rem" }}>
          Rank-{rank} storage: {storedVals} values ({rank} × (u + v + σ))
        </p>
        {rank < MAX_RANK ? (
          <p style={{ margin: 0, color: "var(--accent)" }}>
            {compressionPct}% smaller · · with some loss
          </p>
        ) : (
          <p style={{ margin: 0, color: "var(--text-muted)" }}>Full rank — exact reconstruction</p>
        )}
      </div>

      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Each rank-1 piece is one singular value + two vectors. Drag the slider to add more pieces.
      </p>
    </div>
  );
}
