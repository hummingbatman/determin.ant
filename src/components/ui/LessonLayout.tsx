import Link from "next/link";
import React from "react";

interface LessonLayoutProps {
  module: string;
  moduleSlug: string;
  lessonTitle: string;
  lessonNumber: string;
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
  prose: React.ReactNode;
  canvas: React.ReactNode;
}

export function LessonLayout({
  module,
  moduleSlug,
  lessonTitle,
  lessonNumber,
  prev,
  next,
  prose,
  canvas,
}: LessonLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Top bar */}
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "0 1.5rem",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <Link href="/" style={{ fontFamily: "monospace", fontSize: "1rem", color: "var(--text)", fontWeight: 700, letterSpacing: "0.04em" }}>
          determin<span style={{ color: "var(--accent)" }}>.</span>ant
        </Link>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
          {moduleSlug} / {lessonNumber}
        </span>
      </header>

      {/* Body: prose + canvas */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "minmax(0, 520px) minmax(0, 600px)",
        overflow: "hidden",
        maxWidth: "1160px",
        margin: "0 auto",
        width: "100%",
      }}
        className="lesson-body"
      >
        {/* Prose column */}
        <div style={{
          overflowY: "auto",
          padding: "2.5rem 2rem 2.5rem 2.5rem",
          borderRight: "1px solid var(--border)",
        }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {module}
          </p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: "2rem", lineHeight: 1.25 }}>
            {lessonTitle}
          </h1>

          <div className="prose">{prose}</div>

          {/* Prev / Next */}
          <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
            {prev ? (
              <Link href={prev.href} style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                ← {prev.title}
              </Link>
            ) : <span />}
            {next && (
              <Link href={next.href} style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}>
                {next.title} →
              </Link>
            )}
          </div>
        </div>

        {/* Canvas column */}
        <div style={{
          overflowY: "auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          background: "var(--bg-canvas)",
        }}>
          {canvas}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lesson-body {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
