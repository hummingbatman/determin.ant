import { LessonLayout } from "@/components/ui/LessonLayout";
import { MarkovChain } from "@/components/canvas/MarkovChain";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> PageRank is a Markov chain over the web
        graph. Text auto-complete uses a Markov model over words. Reinforcement learning
        formalizes the environment as a Markov Decision Process. Hidden Markov Models
        underlie speech recognition. Markov chains are everywhere probabilistic systems
        evolve over time.
      </div>

      <p>
        Markov chains are one of the most beautiful applications of eigenvalues.
        The long-run behavior of any Markov chain is determined by a single eigenvector.
      </p>

      <h2>What is a Markov chain?</h2>

      <p>
        A Markov chain is a system that jumps between states over time. The key property:
        the next state depends <em>only</em> on the current state, not on the history.
      </p>

      <p>
        The transitions are captured in a <strong>transition matrix</strong> T, where
        T[i,j] is the probability of going from state j to state i. Each column sums to 1.
      </p>

      <h2>Evolution over time</h2>

      <p>
        If the current distribution over states is a vector π, the distribution after
        one step is <Math tex="T\boldsymbol{\pi}" />. After k steps:{" "}
        <Math tex="T^k \boldsymbol{\pi}" />.
      </p>

      <h2>The stationary distribution</h2>

      <p>
        As k → ∞, the distribution converges to a fixed point{" "}
        <Math tex="\boldsymbol{\pi}^*" /> where:
      </p>
      <Math tex="T\boldsymbol{\pi}^* = \boldsymbol{\pi}^*" block />

      <p>
        This is exactly an eigenvector equation with <strong>eigenvalue 1</strong>.
        The stationary distribution is the eigenvector of T corresponding to λ = 1.
        Every column-stochastic matrix has exactly one such eigenvector (under mild conditions).
      </p>

      <div className="callout">
        The stationary distribution is an eigenvector. The long-run behavior of any
        Markov chain is determined by the eigenvector of T with eigenvalue 1.
        All other eigenvalues have |λ| ≤ 1 — they decay away.
      </div>

      <h2>Speed of convergence</h2>

      <p>
        The <strong>second eigenvalue</strong> |λ₂| controls how fast the chain mixes.
        If |λ₂| is close to 1, convergence is slow (nearly reducible states).
        If |λ₂| is small, convergence is fast.
      </p>

      <h2>Try it</h2>

      <p>
        Set the transition probabilities and initial distribution. The bars show the
        distribution at each step converging toward the stationary distribution (dashed).
        "Slow mixing" has a large second eigenvalue — notice how many more steps it takes.
      </p>

      <div className="callout callout-cs">
        <strong>In NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np

T = np.array([[0.9, 0.2], [0.1, 0.8]])  # transition matrix (columns sum to 1)

# Stationary distribution = eigenvector with eigenvalue 1
eigenvalues, eigenvectors = np.linalg.eig(T)
idx = np.argmin(np.abs(eigenvalues - 1))
stationary = eigenvectors[:, idx]
stationary /= stationary.sum()  # normalize
print(stationary)  # [0.667, 0.333]

# Or: iterate until convergence
pi = np.array([0.5, 0.5])
for _ in range(100):
    pi = T @ pi
print(pi)  # same result`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 6: Eigenvalues"
      moduleSlug="06-eigenvalues"
      lessonTitle="Markov Chains"
      lessonNumber="6.6"
      prev={{ href: "/lessons/eigenvalues/positive-definite", title: "Positive Definite Matrices" }}
      next={{ href: "/lessons/orthogonality/dot-product", title: "Dot Product" }}
      prose={<Prose />}
      canvas={<MarkovChain />}
    />
  );
}
