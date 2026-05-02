"use client";
import React from "react";
import type { Mat2 } from "@/lib/math/mat2";

interface Preset { name: string; value: Mat2 }

interface MatrixEditorProps {
  value: Mat2;
  onChange: (m: Mat2) => void;
  presets?: Preset[];
  label?: string;
}

export function MatrixEditor({ value, onChange, presets, label }: MatrixEditorProps) {
  const [a, b, c, d] = value;

  function update(index: number, raw: string) {
    const n = parseFloat(raw);
    if (isNaN(n)) return;
    const next = [...value] as Mat2;
    next[index] = n;
    onChange(next);
  }

  function Cell({ idx, val, hint }: { idx: number; val: number; hint: string }) {
    return (
      <input
        type="number"
        step="0.1"
        defaultValue={val}
        key={val}
        onBlur={(e) => update(idx, e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") update(idx, (e.target as HTMLInputElement).value); }}
        title={hint}
        style={{
          width: "56px",
          padding: "0.35rem 0.4rem",
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: "1rem",
          fontWeight: 600,
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          color: "var(--text)",
          outline: "none",
        }}
      />
    );
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.5rem" }}>
      {label && (
        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "monospace", marginBottom: "0.1rem" }}>{label}</div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Left bracket */}
        <div style={{ fontSize: "2.5rem", color: "var(--text-muted)", lineHeight: 1, fontWeight: 100 }}>[</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
          <Cell idx={0} val={a} hint="column 1, row 1" />
          <Cell idx={1} val={b} hint="column 2, row 1" />
          <Cell idx={2} val={c} hint="column 1, row 2" />
          <Cell idx={3} val={d} hint="column 2, row 2" />
        </div>
        {/* Right bracket */}
        <div style={{ fontSize: "2.5rem", color: "var(--text-muted)", lineHeight: 1, fontWeight: 100 }}>]</div>
      </div>

      {/* Column color hints */}
      <div style={{ display: "flex", gap: "1.5rem", paddingLeft: "1.8rem", fontSize: "0.75rem", fontFamily: "monospace" }}>
        <span style={{ color: "#0284c7" }}>î → [{a}, {c}]</span>
        <span style={{ color: "#db2777" }}>ĵ → [{b}, {d}]</span>
      </div>

      {/* Presets */}
      {presets && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.25rem" }}>
          {presets.map(p => (
            <button key={p.name} onClick={() => onChange(p.value)} style={{
              fontSize: "0.75rem", padding: "0.25rem 0.6rem",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "5px", cursor: "pointer", color: "var(--text-muted)",
              fontFamily: "monospace",
            }}>
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
