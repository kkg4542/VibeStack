/**
 * GrainOverlay — retired in direction B (graphite + safety orange).
 *
 * This used to paint a full-viewport SVG noise texture with an overlay blend.
 * It was purely decorative (pointer-events-none, aria-hidden, no behaviour),
 * and the flat B language has no texture layers, so it now renders nothing.
 * The export is kept so app/layout.tsx and any other import keep compiling;
 * the <GrainOverlay /> call there can be deleted at leisure.
 */
export function GrainOverlay() {
  return null;
}
