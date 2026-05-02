"use client";
import React, { useState } from "react";
import { Grid2D } from "./Grid2D";
import { DraggableVector } from "./DraggableVector";
import { dot, norm, normalize, sub, scale } from "@/lib/math/vec2";
import type { Vec2 } from "@/lib/math/vec2";

function round2(n: number) { return Math.round(n * 100) / 100; }

function gramSchmidt(u: Vec2, v: Vec2): { e1: Vec2; e2: Vec2 } | null {
  const normU = norm(u);
  if (normU < 1e-9) return null;
  const e1 = normalize(u);
  const proj: Vec2 = scale(e1, dot(v, e1));
  const remainder = sub(v, proj);
  const normR = norm(remainder);
  if (normR < 1e-9) return null;
  const e2 = normalize(remainder);
  return { e1, e2 };
}

export function GramSchmidtVisualizer() {
  const [u, setU] = useState<Vec2>([3, 1]);
  const [v, setV] = useState<Vec2>([1, 3]);

  const result = gramSchmidt(u, v);
  const projVOntoU = result
    ? scale(result.e1, dot(v, result.e1))
    : null;

  const isDependent = !result;
  const display = 3; // scale for display of unit vectors

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      <Grid2D width={440} height={400} range={[-5, 5]}>
        {({ svgRef, ...c }) => {
          const [ox, oy] = c.toPixel(0, 0);

          return (
            <>
              {/* Input vectors (faint) */}
              <DraggableVector value={u} onChange={setU} color="rgba(2,132,199,0.4)" label="u" coords={c} svgRef={svgRef} />
              <DraggableVector value={v} onChange={setV} color="rgba(219,39,119,0.4)" label="v" coords={c} svgRef={svgRef} />

              {/* Projection of v onto e1 */}
              {projVOntoU && (() => {
                const [px, py] = c.toPixel(projVOntoU[0], projVOntoU[1]);
                const [vx, vy] = c.toPixel(v[0], v[1]);
                return (
                  <line x1={vx} y1={vy} x2={px} y2={py}
                    stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3" />
                );
              })()}

              {/* Output orthonormal vectors (scaled for visibility) */}
              {result && (
                <>
                  {(() => {
                    const e1s: Vec2 = [result.e1[0] * display, result.e1[1] * display];
                    const e2s: Vec2 = [result.e2[0] * display, result.e2[1] * display];
                    const [e1x, e1y] = c.toPixel(e1s[0], e1s[1]);
                    const [e2x, e2y] = c.toPixel(e2s[0], e2s[1]);

                    function ArrowHead({ x2, y2, color }: { x2: number; y2: number; color: string }) {
                      const dx = x2 - ox, dy = y2 - oy;
                      const len = Math.sqrt(dx ** 2 + dy ** 2);
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
                        </g>
                      );
                    }

                    return (
                      <>
                        <ArrowHead x2={e1x} y2={e1y} color="#0284c7" />
                        <ArrowHead x2={e2x} y2={e2y} color="#db2777" />
                        <text x={e1x + 10} y={e1y - 8} fill="#0284c7" fontSize={11} fontFamily="monospace">e₁</text>
                        <text x={e2x + 10} y={e2y - 8} fill="#db2777" fontSize={11} fontFamily="monospace">e₂</text>
                      </>
                    );
                  })()}
                </>
              )}
            </>
          );
        }}
      </Grid2D>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.82rem",
        color: "var(--text)", lineHeight: 1.8,
      }}>
        {isDependent ? (
          <p style={{ margin: 0, color: "#dc2626" }}>u and v are parallel — can&apos;t form an orthonormal basis.</p>
        ) : (
          <>
            <p style={{ margin: "0 0 0.2rem" }}>
              <span style={{ color: "#0284c7" }}>e₁ = [{round2(result!.e1[0])}, {round2(result!.e1[1])}]</span>
              {"  (unit, from u)"}
            </p>
            <p style={{ margin: "0 0 0.2rem" }}>
              <span style={{ color: "#db2777" }}>e₂ = [{round2(result!.e2[0])}, {round2(result!.e2[1])}]</span>
              {"  (unit, ⊥ e₁)"}
            </p>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              e₁ · e₂ = {round2(dot(result!.e1, result!.e2))} ≈ 0  ✓
            </p>
          </>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
        Faint arrows = inputs u, v. Solid arrows = orthonormal output e₁, e₂ (shown at 3× scale).
        Yellow dashed = the projection that gets subtracted.
      </p>
    </div>
  );
}
