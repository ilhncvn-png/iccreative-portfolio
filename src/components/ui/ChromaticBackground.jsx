/**
 * ChromaticBackground — the atmospheric visual foundation of the site.
 *
 * Three CSS layers:
 *   0 — Deep void gradient (static)
 *   1 — Chromatic orbs (CSS-animated, compositor-safe)
 *   2 — SVG orbit paths + icon dots (static)
 *
 * Designed for Phase 1 CSS implementation.
 * Phase 2 upgrade: swap orb layer to a Three.js ShaderMaterial GLSL quad.
 */

const ORBIT_DOTS = [
  { cx: 443, cy: 186 },
  { cx: 361, cy: 286 },
  { cx: 158, cy: 341 },
  { cx:  37, cy: 294 },
  { cx: 119, cy: 194 },
  { cx: 322, cy: 139 },
]

export default function ChromaticBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 70% at 55% 45%, #070B16 0%, #020210 100%)',
      }}
    >
      {/* ── Noise grain texture overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Orb 1 — Primary Electric Blue (hero center) ── */}
      <div
        className="animate-orb-1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '55%',
          width: '900px',
          height: '900px',
          marginTop: '-450px',
          marginLeft: '-450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63,140,255,0.18) 0%, rgba(63,140,255,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* ── Orb 2 — Warm Orange (counterweight, bottom-right) ── */}
      <div
        className="animate-orb-2"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '640px',
          height: '640px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,43,0.11) 0%, rgba(255,107,43,0.04) 45%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/* ── Orb 3 — Violet accent (top-left depth) ── */}
      <div
        className="animate-orb-3"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,79,255,0.09) 0%, transparent 65%)',
          filter: 'blur(90px)',
          willChange: 'transform',
        }}
      />

      {/* ── Orb 4 — Cyan accent (mid-left, subtle) ── */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-3%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ── SVG orbit paths + icon dots ── */}
      <svg
        style={{
          position: 'absolute',
          top: '50%',
          left: '55%',
          width: '520px',
          height: '520px',
          marginTop: '-260px',
          marginLeft: '-260px',
          opacity: 0.7,
        }}
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbit ellipse 1 — outer, tilted -15° */}
        <ellipse
          cx="240" cy="240" rx="210" ry="88"
          stroke="rgba(63,140,255,0.13)"
          strokeWidth="1"
          strokeDasharray="4 9"
          transform="rotate(-15 240 240)"
        />
        {/* Orbit ellipse 2 — inner, tilted +22° */}
        <ellipse
          cx="240" cy="240" rx="168" ry="64"
          stroke="rgba(91,143,255,0.07)"
          strokeWidth="1"
          strokeDasharray="3 12"
          transform="rotate(22 240 240)"
        />

        {/* Icon dots on outer orbit */}
        {ORBIT_DOTS.map((dot, i) => (
          <g key={i}>
            <circle cx={dot.cx} cy={dot.cy} r="9"  fill="rgba(63,140,255,0.06)" />
            <circle cx={dot.cx} cy={dot.cy} r="3.5" fill="rgba(63,140,255,0.50)" />
          </g>
        ))}
      </svg>

      {/* ── Bottom vignette to fade into next section ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(2,2,16,0.60) 100%)',
        }}
      />
    </div>
  )
}
