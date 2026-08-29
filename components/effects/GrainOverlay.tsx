/**
 * A subtle SVG-based noise/grain overlay for adding texture to the UI.
 * This helps break the "flat digital" look and adds a premium material feel.
 *
 * Note: this renders a static grain texture. A CSS keyframe animation was
 * previously wired up via styled-jsx, but the animation name never matched
 * the scoped/emitted keyframes (styled-jsx dropped the unreferenced
 * `@keyframes noise` block entirely), so the animation never actually ran.
 * Since the effect was always static in practice, it's kept static here
 * intentionally rather than reintroducing a full-viewport repaint loop.
 */
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-1 overflow-hidden opacity-[0.035] dark:opacity-[0.05] bg-noise"
      aria-hidden="true"
      style={{
        mixBlendMode: "overlay",
      }}
    />
  );
}
