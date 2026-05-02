"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { dot, norm, angleBetween } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }
function toDeg(r: number) { return Math.round((r * 180) / Math.PI); }

export function DotProductVisualizer() {
  const [a, setA] = useState<Vec2>([3, 1]);
  const [b, setB] = useState<Vec2>([1, 3]);

  const d = dot(a, b);
  const angle = angleBetween(a, b);
  const normA = norm(a);
  const normB = norm(b);
  const isPerpendicular = Math.abs(d) < 0.05;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={400} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);

          // Right-angle mark when perpendicular
          const perp = isPerpendicular && (() => {
            const normA2 = Math.sqrt(a[0] ** 2 + a[1] ** 2);
            const normB2 = Math.sqrt(b[0] ** 2 + b[1] ** 2);
            if (normA2 < 1e-9 || normB2 < 1e-9) return null;
            const ua: Vec2 = [a[0] / normA2 * 0.4, a[1] / normA2 * 0.4];
            const ub: Vec2 = [b[0] / normB2 * 0.4, b[1] / normB2 * 0.4];
            const [px, py] = c.toPixel(ua[0] + ub[0], ua[1] + ub[1]);
            const [ax2, ay2] = c.toPixel(ua[0], ua[1]);
            const [bx2, by2] = c.toPixel(ub[0], ub[1]);
            return (
              <path
                d={`M${ax2},${ay2} L${px},${py} L${bx2},${by2}`}
                fill="none" stroke="var(--accent)" strokeWidth={1.5}
              />
            );
          })();

          return (
            <>
              {perp}
              <DraggableVector value={a} onChange={setA} color="#0284c7" label="a" coords={c} svgRef={svgRef} />
              <DraggableVector value={b} onChange={setB} color="#db2777" label="b" coords={c} svgRef={svgRef} />
            </>
          );
        }}
      </Grid2D>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.85rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        <p style={{ margin: "0 0 0.25rem" }}>
          <span style={{ color: "#0284c7" }}>a = [{round2(a[0])}, {round2(a[1])}]</span>
          {"  "}|a| = {round2(normA)}
        </p>
        <p style={{ margin: "0 0 0.5rem" }}>
          <span style={{ color: "#db2777" }}>b = [{round2(b[0])}, {round2(b[1])}]</span>
          {"  "}|b| = {round2(normB)}
        </p>
        <p style={{ margin: "0 0 0.25rem" }}>
          a · b = {round2(d)}
          {isPerpendicular && <span style={{ color: "var(--accent)", marginLeft: "0.5rem" }}>⊥ perpendicular!</span>}
        </p>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          angle = {toDeg(angle)}° · · |a||b|cos θ = {round2(normA * normB)} × {round2(Math.cos(angle))} = {round2(d)}
        </p>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Drag the vectors. When they&apos;re perpendicular, a·b = 0.
      </p>
    </div>
  );
}
