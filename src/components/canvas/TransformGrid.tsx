"use client";
import React, { useRef, useState, useCallback } from "react";
import { multiplyVec } from "@/lib/math/mat2";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import type { Mat2 } from "@/lib/math/mat2";

interface TransformGridProps {
  matrix: Mat2;
  width?: number;
  height?: number;
  range?: [number, number];
  showBasisVectors?: boolean;
}

const GRID_COLOR = "#e4e4ee";
const AXIS_COLOR = "#9090b8";
const ORIG_COLOR = "rgba(180,180,210,0.35)";
const TRANS_COLOR = "rgba(21,128,61,0.55)";
const BASIS1 = "#0284c7";
const BASIS2 = "#db2777";

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export function TransformGrid({ matrix, width = 480, height = 400, range = [-5, 5], showBasisVectors = true }: TransformGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const coords = useSVGCoordinates({ width, height, range });

  const [rMin, rMax] = range;
  const integers: number[] = [];
  for (let i = Math.ceil(rMin); i <= Math.floor(rMax); i++) integers.push(i);

  function mathToPixel(mx: number, my: number) { return coords.toPixel(mx, my); }
  function transformedToPixel(mx: number, my: number) {
    const [tx, ty] = multiplyVec(matrix, [mx, my]);
    return mathToPixel(tx, ty);
  }

  return (
    <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      style={{ background: "var(--bg-canvas)", display: "block", borderRadius: "10px", userSelect: "none" }}>

      {/* Original grid (faint) */}
      {integers.map(i => {
        if (i === 0) return null;
        const [x] = mathToPixel(i, 0);
        const [, y] = mathToPixel(0, i);
        return (
          <g key={i}>
            <line x1={x} y1={0} x2={x} y2={height} stroke={GRID_COLOR} strokeWidth={0.5} />
            <line x1={0} y1={y} x2={width} y2={y} stroke={GRID_COLOR} strokeWidth={0.5} />
          </g>
        );
      })}

      {/* Transformed grid lines */}
      {integers.map(i => {
        if (i === 0) return null;
        const far = rMax + 1;
        // Vertical lines (constant x = i)
        const [ax, ay] = transformedToPixel(i, -far);
        const [bx, by] = transformedToPixel(i, far);
        // Horizontal lines (constant y = i)
        const [cx, cy] = transformedToPixel(-far, i);
        const [dx, dy] = transformedToPixel(far, i);
        return (
          <g key={i}>
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke={TRANS_COLOR} strokeWidth={1} />
            <line x1={cx} y1={cy} x2={dx} y2={dy} stroke={TRANS_COLOR} strokeWidth={1} />
          </g>
        );
      })}

      {/* Transformed axes */}
      {(() => {
        const far = rMax + 1;
        const [ax, ay] = transformedToPixel(-far, 0);
        const [bx, by] = transformedToPixel(far, 0);
        const [cx, cy] = transformedToPixel(0, -far);
        const [dx, dy] = transformedToPixel(0, far);
        return (
          <>
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke={AXIS_COLOR} strokeWidth={1.5} />
            <line x1={cx} y1={cy} x2={dx} y2={dy} stroke={AXIS_COLOR} strokeWidth={1.5} />
          </>
        );
      })()}

      {/* Basis vectors after transformation */}
      {showBasisVectors && (() => {
        const [e1x, e1y] = transformedToPixel(1, 0);
        const [e2x, e2y] = transformedToPixel(0, 1);
        const [ox, oy] = mathToPixel(0, 0);

        function Arrow({ x2, y2, color, label }: { x2: number; y2: number; color: string; label: string }) {
          const dx = x2 - ox, dy = y2 - oy;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len < 2) return null;
          const ux = dx / len, uy = dy / len;
          const s = 8;
          const ax = x2 - ux * s * 1.5 - uy * s * 0.5;
          const ay = y2 - uy * s * 1.5 + ux * s * 0.5;
          const bx = x2 - ux * s * 1.5 + uy * s * 0.5;
          const by = y2 - uy * s * 1.5 - ux * s * 0.5;
          return (
            <g>
              <line x1={ox} y1={oy} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
              <path d={`M${x2},${y2} L${ax},${ay} L${bx},${by} Z`} fill={color} />
              <text x={x2 + ux * 14} y={y2 + uy * 14} fill={color} fontSize={12} fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">{label}</text>
            </g>
          );
        }

        return (
          <>
            <Arrow x2={e1x} y2={e1y} color={BASIS1} label="î" />
            <Arrow x2={e2x} y2={e2y} color={BASIS2} label="ĵ" />
          </>
        );
      })()}
    </svg>
  );
}
