"use client";
import React, { useState, useRef, useCallback } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function leastSquaresLine(pts: Vec2[]): { slope: number; intercept: number } | null {
  const n = pts.length;
  if (n < 2) return null;
  const sumX = pts.reduce((s, p) => s + p[0], 0);
  const sumY = pts.reduce((s, p) => s + p[1], 0);
  const sumXX = pts.reduce((s, p) => s + p[0] * p[0], 0);
  const sumXY = pts.reduce((s, p) => s + p[0] * p[1], 0);
  const denom = n * sumXX - sumX * sumX;
  if (Math.abs(denom) < 1e-12) return null;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

const INITIAL_POINTS: Vec2[] = [
  [-3, -2], [-2, -1.5], [-1, -0.5], [0, 0.5], [1, 1], [2, 2.5], [3, 2],
];

export function LeastSquaresVisualizer() {
  const [points, setPoints] = useState<Vec2[]>(INITIAL_POINTS);
  const W = 440, H = 400;
  const coords = useSVGCoordinates({ width: W, height: H, range: [-5, 5] });
  const svgRef = useRef<SVGSVGElement>(null);

  const line = leastSquaresLine(points);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as SVGElement).closest("circle[data-point]")) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const [mx, my] = coords.toMath(px, py);
    setPoints(prev => [...prev, [mx, my]]);
  }, [coords]);

  const removePoint = useCallback((idx: number) => {
    setPoints(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const totalResidual = line
    ? points.reduce((s, p) => {
        const yHat = line.slope * p[0] + line.intercept;
        return s + (p[1] - yHat) ** 2;
      }, 0)
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <svg ref={svgRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ background: "var(--bg-canvas)", borderRadius: "10px", display: "block", cursor: "crosshair" }}
        onClick={handleClick}>

        {/* Grid */}
        {[-4, -3, -2, -1, 1, 2, 3, 4].map(i => {
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

        {/* Best-fit line */}
        {line && (() => {
          const x1m = -6, x2m = 6;
          const y1m = line.slope * x1m + line.intercept;
          const y2m = line.slope * x2m + line.intercept;
          const [lx1, ly1] = coords.toPixel(x1m, y1m);
          const [lx2, ly2] = coords.toPixel(x2m, y2m);
          return <line x1={lx1} y1={ly1} x2={lx2} y2={ly2}
            stroke="var(--accent)" strokeWidth={2} />;
        })()}

        {/* Residual lines */}
        {line && points.map((p, i) => {
          const yHat = line.slope * p[0] + line.intercept;
          const [px2, py2] = coords.toPixel(p[0], p[1]);
          const [, pyHat] = coords.toPixel(p[0], yHat);
          return <line key={i} x1={px2} y1={py2} x2={px2} y2={pyHat}
            stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 2" opacity={0.7} />;
        })}

        {/* Data points */}
        {points.map((p, i) => {
          const [px2, py2] = coords.toPixel(p[0], p[1]);
          return (
            <circle key={i}
              cx={px2} cy={py2} r={6}
              fill="#0284c7" stroke="white" strokeWidth={1.5}
              data-point="true"
              style={{ cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); removePoint(i); }}
            />
          );
        })}
      </svg>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        {line ? (
          <>
            <p style={{ margin: "0 0 0.2rem" }}>
              Best-fit line: <span style={{ color: "var(--accent)" }}>y = {round2(line.slope)}x {line.intercept >= 0 ? "+ " : "− "}{round2(Math.abs(line.intercept))}</span>
            </p>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              Sum of squared residuals = {round2(totalResidual ?? 0)}
            </p>
          </>
        ) : (
          <p style={{ margin: 0, color: "var(--text-muted)" }}>Add at least 2 points.</p>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Click to add a point · click a point to remove it.
        Yellow dashes = residuals (vertical errors the line minimizes).
      </p>
    </div>
  );
}
