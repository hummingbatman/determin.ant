"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useSVGCoordinates } from "@/hooks/useSVGCoordinates";
import type { Vec2 } from "@/lib/math/vec2";

interface Grid2DProps {
  width?: number;
  height?: number;
  range?: [number, number];
  showLabels?: boolean;
  children?: (coords: ReturnType<typeof useSVGCoordinates> & { svgRef: React.RefObject<SVGSVGElement | null> }) => React.ReactNode;
}

export function Grid2D({
  width = 600,
  height = 600,
  range = [-6, 6],
  showLabels = true,
  children,
}: Grid2DProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pan, setPan] = useState<Vec2>([0, 0]);
  const [zoom, setZoom] = useState(1);
  const isPanning = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const coords = useSVGCoordinates({ width, height, range, pan, zoom });

  // Scroll to zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.2, Math.min(10, z * (e.deltaY < 0 ? 1.1 : 0.9))));
  }, []);

  // Pan on empty-space drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).dataset.draggable) return;
    isPanning.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning.current || !lastPos.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const [rMin, rMax] = range;
      const span = rMax - rMin;
      const ppu = (Math.min(width, height) / span) * zoom;

      setPan((p) => [p[0] + dx / ppu, p[1] - dy / ppu]);
    },
    [range, width, height, zoom]
  );

  const onMouseUp = useCallback(() => {
    isPanning.current = false;
    lastPos.current = null;
  }, []);

  // Generate grid line coordinates
  const [rMin, rMax] = range;
  const gridIntegers: number[] = [];
  for (let i = Math.ceil(rMin - 1); i <= Math.floor(rMax + 1); i++) {
    gridIntegers.push(i);
  }

  const GRID = "var(--grid-line)";
  const AXIS = "var(--axis)";
  const LABEL = "var(--text-faint)";
  const AXIS_BOLD = "var(--axis)";

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ background: "var(--bg-canvas)", display: "block", cursor: "grab", userSelect: "none", borderRadius: "10px" }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Grid lines */}
      {gridIntegers.map((i) => {
        if (i === 0) return null;
        const [x, _ya] = coords.toPixel(i, 0);
        const [_xb, y] = coords.toPixel(0, i);
        return (
          <g key={i}>
            <line x1={x} y1={0} x2={x} y2={height} stroke={GRID} strokeWidth={1} />
            <line x1={0} y1={y} x2={width} y2={y} stroke={GRID} strokeWidth={1} />
          </g>
        );
      })}

      {/* Axes */}
      {(() => {
        const [x0] = coords.toPixel(0, 0);
        const [, y0] = coords.toPixel(0, 0);
        return (
          <>
            <line x1={x0} y1={0} x2={x0} y2={height} stroke={AXIS_BOLD} strokeWidth={1.5} />
            <line x1={0} y1={y0} x2={width} y2={y0} stroke={AXIS_BOLD} strokeWidth={1.5} />
          </>
        );
      })()}

      {/* Axis labels */}
      {showLabels &&
        gridIntegers
          .filter((i) => i !== 0 && i % 1 === 0)
          .map((i) => {
            const [x] = coords.toPixel(i, 0);
            const [, y] = coords.toPixel(0, i);
            const [, originY] = coords.toPixel(0, 0);
            const [originX] = coords.toPixel(0, 0);
            const labelY = Math.min(height - 8, Math.max(14, originY + 14));
            const labelX = Math.min(width - 10, Math.max(4, originX - 14));
            return (
              <g key={i}>
                <text x={x} y={labelY} textAnchor="middle" fontSize={10} fill={LABEL} fontFamily="monospace">
                  {i}
                </text>
                <text x={labelX} y={y + 4} textAnchor="end" fontSize={10} fill={LABEL} fontFamily="monospace">
                  {i}
                </text>
              </g>
            );
          })}

      {/* Children (vectors, etc.) */}
      {children?.({ ...coords, svgRef })}
    </svg>
  );
}
