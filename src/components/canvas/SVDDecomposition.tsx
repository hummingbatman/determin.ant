"use client";
import React, { useState } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import { multiplyVec, multiply, transpose } from "@/lib/math/mat2";
import type { Mat2 } from "@/lib/math/mat2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function rotation(theta: number): Mat2 {
  return [Math.cos(theta), -Math.sin(theta), Math.sin(theta), Math.cos(theta)];
}

function ellipsePoints(a: number, b: number, n = 48): Vec2[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 2 * Math.PI;
    return [a * Math.cos(t), b * Math.sin(t)];
  });
}

const W = 440, H = 180;

function StepSVG({ title, points, color }: { title: string; points: Vec2[]; color: string }) {
  const coords = useSVGCoordinates({ width: W / 3 - 8, height: H, range: [-3, 3] });
  const w = W / 3 - 8;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
      <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`}
        style={{ background: "var(--bg-canvas)", borderRadius: "8px", display: "block" }}>
        {[-2, -1, 1, 2].map(i => {
          const [x] = coords.toPixel(i, 0);
          const [, y] = coords.toPixel(0, i);
          return (
            <g key={i}>
              <line x1={x} y1={0} x2={x} y2={H} stroke="#e4e4ee" strokeWidth={0.7} />
              <line x1={0} y1={y} x2={w} y2={y} stroke="#e4e4ee" strokeWidth={0.7} />
            </g>
          );
        })}
        {(() => {
          const [x0] = coords.toPixel(0, 0);
          const [, y0] = coords.toPixel(0, 0);
          return (
            <>
              <line x1={x0} y1={0} x2={x0} y2={H} stroke="#9090b8" strokeWidth={1} />
              <line x1={0} y1={y0} x2={w} y2={y0} stroke="#9090b8" strokeWidth={1} />
            </>
          );
        })()}
        <polyline
          points={[...points, points[0]].map(p => {
            const [px, py] = coords.toPixel(p[0], p[1]);
            return `${px},${py}`;
          }).join(" ")}
          fill={color + "33"} stroke={color} strokeWidth={1.5}
        />
      </svg>
      <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-muted)" }}>{title}</span>
    </div>
  );
}

export function SVDDecomposition() {
  const [thetaV, setThetaV] = useState(0.4);
  const [sigma1, setSigma1] = useState(2.2);
  const [sigma2, setSigma2] = useState(0.7);
  const [thetaU, setThetaU] = useState(0.9);

  const Vt = transpose(rotation(thetaV));
  const Sigma: Mat2 = [sigma1, 0, 0, sigma2];
  const U = rotation(thetaU);
  const A = multiply(multiply(U, Sigma), Vt);

  // Step 0: unit circle
  const circle = ellipsePoints(1, 1);
  // Step 1: after Vᵀ (rotate)
  const afterVt = circle.map(p => multiplyVec(Vt, p));
  // Step 2: after Σ (stretch)
  const afterSigma = afterVt.map(p => multiplyVec(Sigma, p));
  // Step 3: after U (rotate)
  const afterU = afterSigma.map(p => multiplyVec(U, p));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}>
        <StepSVG title="1. unit circle" points={circle} color="#aaaacc" />
        <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>→</span>
        <StepSVG title="2. Vᵀ rotates" points={afterVt} color="#0284c7" />
        <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>→</span>
        <StepSVG title="3. Σ stretches" points={afterSigma} color="#f59e0b" />
        <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>→</span>
        <StepSVG title="4. U rotates" points={afterU} color="var(--accent)" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {[
          { label: "Vᵀ angle (θ)", value: thetaV, set: setThetaV, min: -1.57, max: 1.57 },
          { label: "σ₁ (stretch x)", value: sigma1, set: setSigma1, min: 0.1, max: 3 },
          { label: "σ₂ (stretch y)", value: sigma2, set: setSigma2, min: 0.1, max: 3 },
          { label: "U angle (θ)", value: thetaU, set: setThetaU, min: -1.57, max: 1.57 },
        ].map(({ label, value, set, min, max }) => (
          <label key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem", fontFamily: "monospace" }}>
            <span style={{ width: "130px", color: "var(--text-muted)" }}>{label}</span>
            <input type="range" min={min} max={max} step={0.01} value={value}
              onChange={e => set(parseFloat(e.target.value))}
              style={{ flex: 1 }} />
            <span style={{ width: "36px", textAlign: "right", color: "var(--text)" }}>{round2(value)}</span>
          </label>
        ))}
      </div>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "0.75rem", fontFamily: "monospace", fontSize: "0.8rem",
        color: "var(--text-muted)",
      }}>
        A = U·Σ·Vᵀ = [[{round2(A[0])},{round2(A[1])}],[{round2(A[2])},{round2(A[3])}]] · · σ₁={round2(sigma1)}, σ₂={round2(sigma2)}
      </div>
    </div>
  );
}
