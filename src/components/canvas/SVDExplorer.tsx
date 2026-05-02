"use client";
import React, { useState } from "react";
import { MatrixEditor } from "./MatrixEditor";
import { eigenvalues, transpose, multiply, multiplyVec, determinant } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";

function round3(n: number) { return Math.round(n * 1000) / 1000; }
function round2(n: number) { return Math.round(n * 100) / 100; }

/** Compute SVD of a 2×2 matrix. Returns U, Sigma (as [s1,s2]), V. */
function svd2x2(A: Mat2): { U: Mat2; sigma: [number, number]; V: Mat2 } {
  const At = transpose(A);
  const AtA: Mat2 = multiply(At, A);

  // Eigenvalues of AᵀA = σ²
  const t = AtA[0] + AtA[3];
  const d = AtA[0] * AtA[3] - AtA[1] * AtA[2];
  const disc = Math.max(0, t * t - 4 * d);
  const sqrtDisc = Math.sqrt(disc);
  const ev1 = (t + sqrtDisc) / 2;
  const ev2 = (t - sqrtDisc) / 2;

  const s1 = Math.sqrt(Math.max(0, ev1));
  const s2 = Math.sqrt(Math.max(0, ev2));

  // Eigenvector of AᵀA for ev1 (first right singular vector)
  function eigvec(ev: number): Vec2 {
    const a = AtA[0] - ev, b = AtA[1];
    const c = AtA[2], d2 = AtA[3] - ev;
    if (Math.abs(a) > Math.abs(c)) {
      if (Math.abs(a) > 1e-12) { const len = Math.sqrt(1 + (b / a) ** 2); return [-b / a / len, 1 / len]; }
    } else {
      if (Math.abs(c) > 1e-12) { const len = Math.sqrt(1 + (d2 / c) ** 2); return [1 / len, -d2 / c / len]; }
    }
    return ev === ev1 ? [1, 0] : [0, 1];
  }

  const v1 = eigvec(ev1);
  const v2: Vec2 = [-v1[1], v1[0]]; // orthogonal

  const V: Mat2 = [v1[0], v2[0], v1[1], v2[1]]; // columns are v1, v2

  // u1 = A·v1 / σ1
  const u1raw = multiplyVec(A, v1);
  const u1: Vec2 = s1 > 1e-12
    ? [u1raw[0] / s1, u1raw[1] / s1]
    : [1, 0];
  const u2: Vec2 = [-u1[1], u1[0]];

  const U: Mat2 = [u1[0], u2[0], u1[1], u2[1]];

  return { U, sigma: [s1, s2], V };
}

function ellipsePoints(a: number, b: number, angle: number, n = 48): Vec2[] {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 2 * Math.PI;
    const x = a * Math.cos(t), y = b * Math.sin(t);
    return [x * cos - y * sin, x * sin + y * cos];
  });
}

const W = 440, H = 280;

export function SVDExplorer() {
  const [matrix, setMatrix] = useState<Mat2>([2, 1, 0, 1.5]);
  const coords = useSVGCoordinates({ width: W, height: H, range: [-4, 4] });

  const { U, sigma, V } = svd2x2(matrix);

  // Angle of first left singular vector
  const uAngle = Math.atan2(U[2], U[0]);
  const ellipse = ellipsePoints(sigma[0], sigma[1], uAngle);

  // Unit circle
  const circle = Array.from({ length: 48 }, (_, i) => {
    const t = (i / 48) * 2 * Math.PI;
    return [Math.cos(t), Math.sin(t)] as Vec2;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <MatrixEditor value={matrix} onChange={setMatrix} />

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ background: "var(--bg-canvas)", borderRadius: "10px", display: "block" }}>

        {[-3, -2, -1, 1, 2, 3].map(i => {
          const [x] = coords.toPixel(i, 0);
          const [, y] = coords.toPixel(0, i);
          return (
            <g key={i}>
              <line x1={x} y1={0} x2={x} y2={H} stroke="#e4e4ee" strokeWidth={1} />
              <line x1={0} y1={y} x2={W} y2={y} stroke="#e4e4ee" strokeWidth={1} />
            </g>
          );
        })}
        {(() => {
          const [x0] = coords.toPixel(0, 0);
          const [, y0] = coords.toPixel(0, 0);
          return (
            <>
              <line x1={x0} y1={0} x2={x0} y2={H} stroke="#9090b8" strokeWidth={1.5} />
              <line x1={0} y1={y0} x2={W} y2={y0} stroke="#9090b8" strokeWidth={1.5} />
            </>
          );
        })()}

        {/* Unit circle */}
        <polyline
          points={[...circle, circle[0]].map(p => {
            const [px, py] = coords.toPixel(p[0], p[1]);
            return `${px},${py}`;
          }).join(" ")}
          fill="none" stroke="#aaaacc" strokeWidth={1} strokeDasharray="4 3"
        />

        {/* Image ellipse */}
        <polyline
          points={[...ellipse, ellipse[0]].map(p => {
            const [px, py] = coords.toPixel(p[0], p[1]);
            return `${px},${py}`;
          }).join(" ")}
          fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={2}
        />

        {/* Singular vectors */}
        {[0, 1].map(i => {
          const [ox, oy] = coords.toPixel(0, 0);
          const sv: Vec2 = [U[i * 2] * sigma[i], U[i * 2 + 1] * sigma[i]];
          const [sx, sy] = coords.toPixel(sv[0], sv[1]);
          const dx = sx - ox, dy = sy - oy;
          const len = Math.sqrt(dx ** 2 + dy ** 2);
          if (len < 2) return null;
          const ux = dx / len, uy = dy / len;
          const s = 7;
          const color = i === 0 ? "#0284c7" : "#db2777";
          return (
            <g key={i}>
              <line x1={ox} y1={oy} x2={sx} y2={sy} stroke={color} strokeWidth={2} />
              <path d={`M${sx},${sy} L${sx - ux * s * 1.5 - uy * s * 0.5},${sy - uy * s * 1.5 + ux * s * 0.5} L${sx - ux * s * 1.5 + uy * s * 0.5},${sy - uy * s * 1.5 - ux * s * 0.5} Z`} fill={color} />
              <text x={sx + ux * 12} y={sy + uy * 12} fill={color} fontSize={11} fontFamily="monospace" textAnchor="middle">σ{i + 1}</text>
            </g>
          );
        })}
      </svg>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        <p style={{ margin: "0 0 0.2rem", fontWeight: 700 }}>Singular values:</p>
        <p style={{ margin: "0 0 0.2rem" }}>
          <span style={{ color: "#0284c7" }}>σ₁ = {round2(sigma[0])}</span>
          {"  "}
          <span style={{ color: "#db2777" }}>σ₂ = {round2(sigma[1])}</span>
        </p>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          Condition number σ₁/σ₂ = {sigma[1] > 1e-9 ? round2(sigma[0] / sigma[1]) : "∞"}
          · · rank = {sigma[1] > 0.01 ? 2 : sigma[0] > 0.01 ? 1 : 0}
        </p>
      </div>

      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        The dashed circle = inputs. The green ellipse = where A maps the unit circle.
        Its semi-axes are σ₁ and σ₂.
      </p>
    </div>
  );
}
