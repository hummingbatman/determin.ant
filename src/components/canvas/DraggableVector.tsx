"use client";
import React, { useState } from "react";
import type { Vec2 } from "@/lib/math/vec2";
import { useDraggable } from "@/hooks/useDraggable";
import type { CoordSystem } from "@/hooks/useSVGCoordinates";

interface DraggableVectorProps {
  value: Vec2;
  onChange?: (v: Vec2) => void;
  color?: string;
  label?: string;
  origin?: Vec2;
  interactive?: boolean;
  coords: CoordSystem;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

const ARROWHEAD_SIZE = 8;

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function DraggableVector({
  value,
  onChange,
  color = "#00d4ff",
  label,
  origin = [0, 0],
  interactive = true,
  coords,
  svgRef,
}: DraggableVectorProps) {
  const [hovering, setHovering] = useState(false);

  const tip: Vec2 = [origin[0] + value[0], origin[1] + value[1]];
  const [x1, y1] = coords.toPixel(origin[0], origin[1]);
  const [x2, y2] = coords.toPixel(tip[0], tip[1]);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);

  const { onMouseDown, onTouchStart } = useDraggable({
    coords,
    onDrag: (v) => onChange?.([v[0] - origin[0], v[1] - origin[1]]),
    svgRef,
  });

  if (len < 1) return null;

  // Arrowhead
  const ux = dx / len;
  const uy = dy / len;
  const s = ARROWHEAD_SIZE;
  const ax = x2 - ux * s * 1.5 - uy * s * 0.5;
  const ay = y2 - uy * s * 1.5 + ux * s * 0.5;
  const bx = x2 - ux * s * 1.5 + uy * s * 0.5;
  const by = y2 - uy * s * 1.5 - ux * s * 0.5;
  const arrowhead = `M${x2},${y2} L${ax},${ay} L${bx},${by} Z`;

  // Label position: midpoint offset perpendicular
  const midX = (x1 + x2) / 2 - uy * 16;
  const midY = (y1 + y2) / 2 + ux * 16;

  const showReadout = hovering || false;

  return (
    <g>
      {/* Shaft */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Arrowhead */}
      <path d={arrowhead} fill={color} />

      {/* Label */}
      {label && (
        <text x={midX} y={midY} fill={color} fontSize={13} fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">
          {label}
        </text>
      )}

      {/* Coordinate readout */}
      {showReadout && (
        <text
          x={x2 + 10}
          y={y2 - 10}
          fill={color}
          fontSize={11}
          fontFamily="monospace"
        >
          ({round2(value[0])}, {round2(value[1])})
        </text>
      )}

      {/* Invisible hit area for dragging */}
      {interactive && (
        <circle
          cx={x2} cy={y2} r={14}
          fill="transparent"
          stroke="transparent"
          style={{ cursor: "grab" }}
          data-draggable="true"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        />
      )}
    </g>
  );
}
