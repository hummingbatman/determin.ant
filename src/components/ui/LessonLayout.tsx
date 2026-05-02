"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { getModule } from "@/lib/lessons";
import { usePathname } from "next/navigation";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isComplete, toggleComplete, markComplete } = useProgress();
  const pathname = usePathname();

  const moduleMeta = getModule(moduleSlug);
  const currentIsComplete = isComplete(pathname);

  function handleNext() {
    markComplete(pathname);
  }

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
        gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle lesson list"
            style={{
              background: "none", border: "1px solid var(--border)", borderRadius: "6px",
              padding: "0.3rem 0.55rem", cursor: "pointer", color: "var(--text-muted)",
              fontSize: "0.9rem", lineHeight: 1, display: "flex", alignItems: "center", gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>☰</span>
            <span style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>lessons</span>
          </button>

          <Link href="/" style={{ fontFamily: "monospace", fontSize: "1rem", color: "var(--text)", fontWeight: 700, letterSpacing: "0.04em" }}>
            determin<span style={{ color: "var(--accent)" }}>.</span>ant
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Complete toggle */}
          <button
            onClick={() => toggleComplete(pathname)}
            title={currentIsComplete ? "Mark incomplete" : "Mark complete"}
            style={{
              background: currentIsComplete ? "var(--accent)" : "none",
              border: `1px solid ${currentIsComplete ? "var(--accent)" : "var(--border)"}`,
              borderRadius: "6px",
              padding: "0.3rem 0.65rem",
              cursor: "pointer",
              color: currentIsComplete ? "#fff" : "var(--text-muted)",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              display: "flex", alignItems: "center", gap: "0.35rem",
              transition: "all 0.15s",
            }}
          >
            <span>{currentIsComplete ? "✓" : "○"}</span>
            <span>{currentIsComplete ? "done" : "mark done"}</span>
          </button>

          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
            {moduleSlug} / {lessonNumber}
          </span>
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
              zIndex: 40,
            }}
          />
          <aside style={{
            position: "fixed", top: 0, left: 0, bottom: 0,
            width: "300px", maxWidth: "85vw",
            background: "var(--bg)", borderRight: "1px solid var(--border)",
            zIndex: 50, overflowY: "auto",
            display: "flex", flexDirection: "column",
          }}>
            {/* Sidebar header */}
            <div style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <Link href="/" onClick={() => setSidebarOpen(false)}
                style={{ fontFamily: "monospace", fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>
                determin<span style={{ color: "var(--accent)" }}>.</span>ant
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", fontSize: "1.2rem", padding: "0.2rem 0.4rem",
                }}
              >
                ×
              </button>
            </div>

            {/* Lesson list */}
            {moduleMeta && (
              <div style={{ padding: "1rem 0" }}>
                <div style={{
                  padding: "0.25rem 1.25rem 0.6rem",
                  fontSize: "0.7rem", fontFamily: "monospace",
                  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  {moduleMeta.title}
                </div>
                {moduleMeta.lessons.map(lesson => {
                  const isCurrent = lesson.href === pathname;
                  const done = isComplete(lesson.href);
                  return (
                    <Link
                      key={lesson.href}
                      href={lesson.href}
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.65rem",
                        padding: "0.55rem 1.25rem",
                        background: isCurrent ? "var(--accent-dim)" : "none",
                        borderLeft: isCurrent ? "2px solid var(--accent)" : "2px solid transparent",
                        textDecoration: "none",
                        color: isCurrent ? "var(--accent)" : done ? "var(--text-muted)" : "var(--text)",
                      }}
                    >
                      <span style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        border: done ? "none" : `1.5px solid ${isCurrent ? "var(--accent)" : "var(--border)"}`,
                        background: done ? "var(--accent)" : "none",
                        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.65rem", color: "#fff",
                        transition: "all 0.15s",
                      }}>
                        {done ? "✓" : ""}
                      </span>
                      <span style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--text-faint)", flexShrink: 0 }}>
                        {lesson.number}
                      </span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.3 }}>
                        {lesson.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* All modules link */}
            <div style={{ padding: "1rem 1.25rem", marginTop: "auto", borderTop: "1px solid var(--border)" }}>
              <Link href="/" onClick={() => setSidebarOpen(false)}
                style={{ fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none" }}>
                ← All modules
              </Link>
            </div>
          </aside>
        </>
      )}

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
          <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {prev ? (
              <Link href={prev.href} style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                ← {prev.title}
              </Link>
            ) : <span />}
            {next && (
              <Link href={next.href} onClick={handleNext}
                style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}>
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
