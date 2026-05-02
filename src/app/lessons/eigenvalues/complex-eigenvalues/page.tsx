import { LessonLayout } from "@/components/ui/LessonLayout";
import { ComplexEigenvisualizer } from "@/components/canvas/ComplexEigenvisualizer";
import { Math } from "@/components/ui/Math";

function Prose() {
  return (
    <>
      <div className="callout callout-real">
        <strong>Where you'll see this:</strong> whether a control system is stable
        depends on the eigenvalues of its state matrix. Complex eigenvalues with
        negative real part → oscillating but converging (stable). Positive real
        part → oscillating and diverging (unstable). Every autopilot, robot arm,
        and PID controller is designed around this.
      </div>

      <p>
        Not all matrices have real eigenvectors. When the characteristic polynomial
        has no real roots, the eigenvalues come in complex conjugate pairs —
        and the geometric behavior becomes rotational rather than stretching.
      </p>

      <h2>When eigenvalues are complex</h2>

      <p>
        If the discriminant <Math tex="\Delta = \text{tr}(A)^2 - 4\det(A) < 0" />,
        the eigenvalues are:
      </p>
      <Math tex="\lambda = \frac{\text{tr}(A)}{2} \pm \frac{\sqrt{|\Delta|}}{2} i" block />

      <p>
        These are complex conjugates: <Math tex="\lambda = a \pm bi" />.
        The real part a controls growth/decay; the imaginary part b controls rotation.
      </p>

      <h2>The modulus determines stability</h2>

      <p>
        The <strong>modulus</strong> (magnitude) of the complex eigenvalue is:
      </p>
      <Math tex="|\lambda| = \sqrt{a^2 + b^2} = \sqrt{\det(A)}" block />

      <p>
        Apply the matrix repeatedly — points orbit the origin:
      </p>
      <ul>
        <li><Math tex="|\lambda| = 1" />: pure rotation, orbits stay on a circle</li>
        <li><Math tex="|\lambda| > 1" />: spiral outward (unstable)</li>
        <li><Math tex="|\lambda| < 1" />: spiral inward, converges to zero (stable)</li>
      </ul>

      <div className="callout">
        Complex eigenvalues = rotation + scaling. The real part is growth/decay;
        the imaginary part is the angular speed. |λ| &lt; 1 is the stability criterion.
      </div>

      <h2>The rotation angle</h2>

      <p>
        The angle of rotation per step is <Math tex="\theta = \arctan(b/a)" /> — the
        argument of the complex eigenvalue. A rotation matrix of angle θ has eigenvalues
        <Math tex="e^{\pm i\theta} = \cos\theta \pm i\sin\theta" />.
      </p>

      <h2>Try it</h2>

      <p>
        Pick a preset and watch how points spiral (or orbit) under repeated application
        of the matrix. The dashed circle is the starting unit circle.
        Use the steps slider to see long-term behavior.
      </p>

      <div className="callout callout-cs">
        <strong>Stability check in NumPy:</strong>
        <pre style={{ margin: "0.5rem 0 0" }}><code>{`import numpy as np

A = np.array([[0.8, -0.4], [0.4, 0.8]])
eigenvalues = np.linalg.eigvals(A)

for lam in eigenvalues:
    print(f"λ = {lam:.3f}, |λ| = {abs(lam):.3f}")
# λ = 0.800+0.400j, |λ| = 0.894 → stable (spirals in)`}</code></pre>
      </div>
    </>
  );
}

export default function Lesson() {
  return (
    <LessonLayout
      module="Module 6: Eigenvalues"
      moduleSlug="06-eigenvalues"
      lessonTitle="Complex Eigenvalues"
      lessonNumber="6.3"
      prev={{ href: "/lessons/eigenvalues/characteristic-polynomial", title: "The Characteristic Polynomial" }}
      next={{ href: "/lessons/eigenvalues/diagonalization", title: "Diagonalization" }}
      prose={<Prose />}
      canvas={<ComplexEigenvisualizer />}
    />
  );
}
