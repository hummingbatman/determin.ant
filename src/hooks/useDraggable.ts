"use client";
import { useRef, useCallback } from "react";
import type { Vec2 } from "@/lib/math/vec2";
import type { CoordSystem } from "./useSVGCoordinates";

interface UseDraggableOptions {
  coords: CoordSystem;
  onDrag: (v: Vec2) => void;
  /** Snap to nearest integer grid point */
  snap?: boolean;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

function snapToInt(v: Vec2): Vec2 {
  return [Math.round(v[0]), Math.round(v[1])];
}

function getEventPos(e: MouseEvent | TouchEvent): { clientX: number; clientY: number } {
  if ("touches" in e) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }
  return { clientX: e.clientX, clientY: e.clientY };
}

export function useDraggable({ coords, onDrag, snap = false, svgRef }: UseDraggableOptions) {
  const dragging = useRef(false);

  const getSVGPoint = useCallback(
    (clientX: number, clientY: number): Vec2 => {
      const svg = svgRef.current;
      if (!svg) return [0, 0];
      const rect = svg.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const v = coords.toMath(px, py);
      return snap ? snapToInt(v) : v;
    },
    [coords, snap, svgRef]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;

      const handleMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const { clientX, clientY } = getEventPos(ev);
        onDrag(getSVGPoint(clientX, clientY));
      };
      const handleUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
    },
    [getSVGPoint, onDrag]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      dragging.current = true;

      const handleMove = (ev: TouchEvent) => {
        if (!dragging.current) return;
        const { clientX, clientY } = getEventPos(ev);
        onDrag(getSVGPoint(clientX, clientY));
      };
      const handleEnd = () => {
        dragging.current = false;
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
      };

      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    },
    [getSVGPoint, onDrag]
  );

  return { onMouseDown, onTouchStart };
}
