"use client";
import React from "react";
import { useProgress } from "@/hooks/useProgress";
import type { ModuleMeta } from "@/lib/lessons";

export function ModuleProgress({ mod }: { mod: ModuleMeta }) {
  const { isComplete } = useProgress();
  const done = mod.lessons.filter(l => isComplete(l.href)).length;
  const total = mod.lessons.length;
  if (done === 0) return null;

  return (
    <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ flex: 1, height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "var(--accent)",
          width: `${(done / total) * 100}%`,
          borderRadius: "2px", transition: "width 0.3s",
        }} />
      </div>
      <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: done === total ? "var(--accent)" : "var(--text-muted)", flexShrink: 0 }}>
        {done === total ? "✓ done" : `${done}/${total}`}
      </span>
    </div>
  );
}
