"use client";
import { useCallback } from "react";
import type { Vec2 } from "@/lib/math/vec2";

export interface CoordSystem {
  /** Convert SVG pixel coords to math coords */
  toMath: (px: number, py: number) => Vec2;
  /** Convert math coords to SVG pixel coords */
  toPixel: (mx: number, my: number) => [number, number];
}

interface Options {
  width: number;
  height: number;
  /** Math-space range, e.g. [-5, 5] means x and y both go from -5 to 5 */
  range: [number, number];
  /** Pan offset in math coordinates */
  pan?: Vec2;
  /** Zoom multiplier (1 = default) */
  zoom?: number;
}

export function useSVGCoordinates({
  width,
  height,
  range,
  pan = [0, 0],
  zoom = 1,
}: Options): CoordSystem {
  const [rMin, rMax] = range;
  const span = rMax - rMin;

  // Pixels per math unit (equal on both axes to preserve aspect ratio)
  const ppu = (Math.min(width, height) / span) * zoom;

  // SVG center in pixels
  const cx = width / 2;
  const cy = height / 2;

  const toMath = useCallback(
    (px: number, py: number): Vec2 => [
      (px - cx) / ppu - pan[0],
      -((py - cy) / ppu) - pan[1],
    ],
    [cx, cy, ppu, pan]
  );

  const toPixel = useCallback(
    (mx: number, my: number): [number, number] => [
      (mx + pan[0]) * ppu + cx,
      -((my + pan[1]) * ppu) + cy,
    ],
    [cx, cy, ppu, pan]
  );

  return { toMath, toPixel };
}
