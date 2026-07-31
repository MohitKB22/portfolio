import { cn } from '@/lib/utils';

/**
 * Layered page background: mesh gradient, SVG line grid and a noise overlay.
 *
 * Everything here is static. An earlier version animated three 34-42rem blobs
 * each carrying a 130-150px blur, which forced a repaint of most of the
 * viewport on every frame and dominated the frame budget. The same depth is
 * achieved with fixed radial gradients at zero ongoing cost.
 */
export function Backdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}
    >
      <div className="absolute inset-0 bg-night" />
      <div className="mesh-gradient absolute inset-0" />
      <div className="line-grid absolute inset-0 bg-grid-fade opacity-60" />

      {/* Static depth pools — no animation, no repaint. */}
      <div className="absolute top-[-12%] -left-40 size-[38rem] rounded-full bg-brand/10 blur-[120px]" />
      <div className="absolute top-1/4 -right-48 size-[34rem] rounded-full bg-violet/8 blur-[130px]" />
      <div className="absolute bottom-[-18%] left-1/3 size-[30rem] rounded-full bg-teal/6 blur-[140px]" />

      <div className="noise-overlay absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}
