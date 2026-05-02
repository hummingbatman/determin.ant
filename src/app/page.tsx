import Link from "next/link";
import { MODULES } from "@/lib/lessons";
import { ModuleProgress } from "@/components/ui/ModuleProgress";

const modules = [
  {
    number: "01",
    title: "Vectors",
    description: "What is a vector? Learn to think geometrically before algebraically.",
    lessons: ["What is a vector?", "Vector addition", "Scalar multiplication", "Linear combinations", "Span", "Linear independence", "Cross product"],
    href: "/lessons/vectors/what-is-a-vector",
    available: true,
  },
  {
    number: "02",
    title: "Transformations",
    description: "Matrices aren't grids of numbers — they're instructions for moving space.",
    lessons: ["What is a transformation?", "Matrices as transformations", "Composition", "The transformation zoo", "Build your own"],
    href: "/lessons/transformations/what-is-a-transformation",
    available: true,
  },
  {
    number: "03",
    title: "Systems of Equations",
    description: "Finding where lines (and planes) intersect — geometrically and algebraically.",
    lessons: ["Geometric interpretation", "Gaussian elimination", "LU decomposition", "Types of solutions"],
    href: "/lessons/systems/geometric-interpretation",
    available: true,
  },
  {
    number: "04",
    title: "Determinants",
    description: "What does a matrix do to area? The determinant tells you.",
    lessons: ["Area scaling", "The zero determinant", "Invertibility"],
    href: "/lessons/determinants/area-scaling",
    available: true,
  },
  {
    number: "05",
    title: "Vector Spaces",
    description: "The bigger picture: bases, dimensions, and the spaces matrices create.",
    lessons: ["Basis and dimension", "Column, null, and row space", "Rank", "Rank-Nullity theorem", "Change of basis"],
    href: "/lessons/vector-spaces/basis-and-dimension",
    available: true,
  },
  {
    number: "06",
    title: "Eigenvalues",
    description: "Some vectors don't change direction under a transformation. Those are special.",
    lessons: ["Eigenvectors — the intuition", "The characteristic polynomial", "Complex eigenvalues", "Diagonalization", "Positive definite matrices", "Markov chains"],
    href: "/lessons/eigenvalues/eigenvector-intuition",
    available: true,
  },
  {
    number: "07",
    title: "Orthogonality",
    description: "Perpendicularity, projections, and how to find the closest point to a line.",
    lessons: ["Dot product", "Projection", "Gram-Schmidt", "Least squares"],
    href: "/lessons/orthogonality/dot-product",
    available: true,
  },
  {
    number: "08",
    title: "SVD",
    description: "Every matrix is a rotation, a stretch, and another rotation. This is SVD.",
    lessons: ["Rotate, stretch, rotate", "SVD explorer", "Matrix norms", "Image compression"],
    href: "/lessons/svd/rotate-stretch-rotate",
    available: true,
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Nav */}
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 2rem", height: "52px", display: "flex", alignItems: "center" }}>
        <span style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 700, color: "var(--text)", letterSpacing: "0.04em" }}>
          determin<span style={{ color: "var(--accent)" }}>.</span>ant
        </span>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "5rem 2rem 3.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{
            fontSize: "0.75rem", fontFamily: "monospace", color: "var(--accent)",
            background: "var(--accent-dim)", padding: "0.25rem 0.6rem", borderRadius: "4px",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Free · No sign-up · Open source
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, lineHeight: 1.15, color: "var(--text)", marginBottom: "1.25rem" }}>
          Linear algebra,<br />
          <span style={{ color: "var(--accent)" }}>finally explained</span> with pictures.
        </h1>

        <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "54ch" }}>
          Most courses throw you into equations. We start with arrows.
          Every concept is interactive — drag things around and build the intuition
          before you touch any formula.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/lessons/vectors/what-is-a-vector" style={{
            background: "var(--accent)", color: "#fff", padding: "0.7rem 1.5rem",
            borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none",
          }}>
            Start learning →
          </Link>
          <a href="https://github.com/hummingbatman/determin.ant" style={{
            border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.7rem 1.5rem",
            borderRadius: "8px", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none",
          }}>
            View on GitHub
          </a>
        </div>
      </section>

      {/* "Who is this for?" */}
      <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2.5rem 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }}>
          {[
            { icon: "🎓", label: "Complete beginners", desc: "Never studied linear algebra. That's fine — we start from zero." },
            { icon: "💻", label: "CS undergrads", desc: "You know arrays. A vector is an array. Let's go from there." },
            { icon: "🤖", label: "ML practitioners", desc: "Finally understand why matrices multiply the way they do." },
          ].map(({ icon, label, desc }) => (
            <div key={label}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
              <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "0.3rem" }}>{label}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Course modules */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.4rem" }}>Course modules</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>8 modules · 38 lessons · All free</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {modules.map((mod, idx) => (
            <div key={mod.number} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "1.25rem 1.5rem",
              opacity: mod.available ? 1 : 0.55,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "var(--text-faint)" }}>{mod.number}</span>
                    <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", margin: 0 }}>{mod.title}</h3>
                    {mod.available && (
                      <span style={{ fontSize: "0.65rem", background: "var(--accent-dim)", color: "var(--accent)", padding: "0.1rem 0.45rem", borderRadius: "4px", fontFamily: "monospace", textTransform: "uppercase" }}>
                        available
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: "0 0 0.75rem", lineHeight: 1.6 }}>{mod.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {mod.lessons.map((l) => (
                      <span key={l} style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "var(--border)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                        {l}
                      </span>
                    ))}
                  </div>
                  {mod.available && <ModuleProgress mod={MODULES[idx]} />}
                </div>
                {mod.available && (
                  <Link href={mod.href} style={{
                    flexShrink: 0, background: "var(--accent)", color: "#fff",
                    padding: "0.45rem 1rem", borderRadius: "6px", fontSize: "0.82rem",
                    fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
                  }}>
                    Start →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center", color: "var(--text-faint)", fontSize: "0.8rem", fontFamily: "monospace" }}>
        determin.ant · open source · MIT
      </footer>
    </div>
  );
}
