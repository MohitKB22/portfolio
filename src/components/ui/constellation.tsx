import { cn } from '@/lib/utils';

const NODES = [
  [12, 22],
  [26, 14],
  [38, 30],
  [20, 44],
  [8, 58],
  [30, 62],
  [44, 52],
  [52, 20],
  [64, 34],
  [58, 66],
  [72, 18],
  [80, 46],
  [88, 28],
  [76, 72],
  [92, 60],
  [46, 78],
  [24, 82],
  [66, 88],
  [14, 34],
  [50, 40],
  [34, 8],
  [86, 80],
  [4, 44],
  [96, 40],
] as const;

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [5, 6],
  [2, 6],
  [1, 7],
  [7, 8],
  [6, 8],
  [8, 9],
  [7, 10],
  [10, 12],
  [8, 11],
  [11, 12],
  [9, 13],
  [11, 14],
  [13, 14],
  [9, 15],
  [5, 15],
  [4, 16],
  [16, 15],
  [15, 17],
  [13, 17],
  [0, 18],
  [18, 4],
  [19, 6],
  [19, 2],
  [20, 1],
  [21, 14],
  [21, 13],
  [22, 4],
  [23, 12],
] as const;

/**
 * Decorative constellation for the hero.
 *
 * Static SVG on purpose. The equivalent WebGL scene ran an O(n²) proximity pass
 * and a full geometry upload every frame, which dominated the frame budget on
 * integrated graphics and made the whole page feel sluggish. The only motion
 * here is one slow CSS rotation on the compositor.
 *
 * The animated React Three Fiber version is still in the repo — set
 * `NEXT_PUBLIC_ENABLE_WEBGL=true` to switch to it.
 */
export function Constellation({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden text-brand', className)}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-70"
        style={{ animationDuration: '160s' }}
      >
        <defs>
          <radialGradient id="constellation-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="constellation-mask">
            <rect width="100" height="100" fill="url(#constellation-fade)" />
          </mask>
        </defs>

        <g mask="url(#constellation-mask)">
          {EDGES.map(([from, to]) => {
            const a = NODES[from];
            const b = NODES[to];
            if (!a || !b) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
                stroke="currentColor"
                strokeWidth="0.12"
                strokeOpacity="0.5"
              />
            );
          })}
          {NODES.map(([x, y], index) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={index % 5 === 0 ? 0.55 : 0.32}
              fill="currentColor"
              fillOpacity={index % 3 === 0 ? 0.95 : 0.6}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
