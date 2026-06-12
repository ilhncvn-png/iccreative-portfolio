import { assetUrl } from '../../utils/assetPath'

/*
 * GlobalAtmosphere — the living intelligence layer.
 *
 * Fixed behind all content (z-index: 0), above ChromaticBackground (z-index: 0 too,
 * but rendered earlier so it stacks on top).
 *
 * Contains:
 *   · Ambient membrane blobs  — slow-breathing chromatic fields
 *   · Particle field           — 10 drifting micro-dots
 *   · Editorial hairline       — designer signature on the left
 *   · Coordinate label         — micro-typography reference
 *   · Right-edge marker        — vertical identity stamp
 *   · Monogram moments         — 2× İÇ watermark fragments
 *   · Edge vignettes           — depth framing
 */

const PARTICLES = [
  { x:  7.2, y:  5.5, size: 2, dur: 52, pat: 'A', delay:  '0s'  },
  { x: 82.1, y: 11.8, size: 2, dur: 71, pat: 'B', delay:  '8s'  },
  { x: 23.4, y: 27.3, size: 3, dur: 46, pat: 'C', delay:  '3s'  },
  { x: 91.6, y: 38.0, size: 2, dur: 65, pat: 'D', delay: '12s'  },
  { x: 48.8, y: 51.5, size: 2, dur: 58, pat: 'A', delay:  '6s'  },
  { x: 13.9, y: 64.2, size: 3, dur: 44, pat: 'B', delay: '18s'  },
  { x: 72.5, y: 73.8, size: 2, dur: 69, pat: 'C', delay:  '2s'  },
  { x: 36.1, y: 85.4, size: 2, dur: 55, pat: 'D', delay: '15s'  },
  { x: 59.7, y: 17.6, size: 2, dur: 62, pat: 'B', delay:  '9s'  },
  { x:  4.8, y: 44.9, size: 2, dur: 78, pat: 'A', delay: '22s'  },
]

const BLOBS = [
  {
    top: '8%',  left: '5%',  right: undefined,
    size: '44vw', color: 'rgba(63,140,255,0.040)',
    blur: 92,  anim: 'blobDrift1 40s ease-in-out infinite',
  },
  {
    top: '44%', left: undefined, right: '3%',
    size: '38vw', color: 'rgba(95,55,200,0.028)',
    blur: 110, anim: 'blobDrift2 54s ease-in-out 8s infinite',
  },
  {
    top: '76%', left: '28%', right: undefined,
    size: '52vw', color: 'rgba(63,140,255,0.034)',
    blur: 105, anim: 'blobDrift1 48s ease-in-out 20s infinite',
  },
]

export default function GlobalAtmosphere() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      {/* ── Membrane blobs ── */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position:     'absolute',
            top:          b.top,
            left:         b.left,
            right:        b.right,
            width:        b.size,
            height:       b.size,
            borderRadius: '50%',
            background:   `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
            filter:       `blur(${b.blur}px)`,
            animation:    b.anim,
            willChange:   'transform',
          }}
        />
      ))}

      {/* ── Particle field ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position:        'absolute',
            left:            `${p.x}%`,
            top:             `${p.y}%`,
            width:           `${p.size}px`,
            height:          `${p.size}px`,
            borderRadius:    '50%',
            background:      i % 4 === 0
              ? 'rgba(100,190,255,0.60)'
              : 'rgba(63,140,255,0.50)',
            filter:          p.size === 3 ? 'blur(1px)' : 'blur(0.5px)',
            animation:       `ambientDrift${p.pat} ${p.dur}s ease-in-out ${p.delay} infinite`,
            willChange:      'transform',
          }}
        />
      ))}

      {/* ── Left editorial hairline ── */}
      <div
        style={{
          position:   'fixed',
          left:       '22px',
          top:        '22%',
          height:     '28vh',
          width:      '1px',
          background: 'linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.045) 30%, rgba(255,255,255,0.045) 70%, transparent 100%)',
        }}
      >
        {/* Coordinate micro-label — rotated along the line */}
        <span
          style={{
            position:        'absolute',
            top:             '50%',
            left:            '12px',
            transform:       'translateY(-50%) rotate(90deg)',
            transformOrigin: 'left center',
            fontSize:        '7.5px',
            fontWeight:      400,
            letterSpacing:   '0.20em',
            color:           'rgba(255,255,255,0.095)',
            whiteSpace:      'nowrap',
            fontFamily:      'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          N 41.01° · E 28.97° · İSTANBUL
        </span>
        {/* Top dot */}
        <div
          style={{
            position:     'absolute',
            top:          '-3px',
            left:         '-1.5px',
            width:        '4px',
            height:       '4px',
            borderRadius: '50%',
            background:   'rgba(63,140,255,0.30)',
          }}
        />
        {/* Bottom dot */}
        <div
          style={{
            position:     'absolute',
            bottom:       '-3px',
            left:         '-1.5px',
            width:        '4px',
            height:       '4px',
            borderRadius: '50%',
            background:   'rgba(63,140,255,0.18)',
          }}
        />
      </div>

      {/* ── Right vertical identity marker ── */}
      <div
        style={{
          position:      'fixed',
          right:         '26px',
          bottom:        '18%',
          fontSize:      '7.5px',
          fontWeight:    500,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.06)',
          writingMode:   'vertical-rl',
          fontFamily:    'ui-monospace, "SF Mono", Menlo, monospace',
        }}
      >
        İÇ · Creative · 2025
      </div>

      {/* ── Monogram fragment — top right (very faint) ── */}
      <img
        src={assetUrl('/logo.webp')}
        alt=""
        loading="lazy"
        style={{
          position:     'fixed',
          right:        '-6%',
          top:          '12%',
          width:        '30vw',
          maxWidth:     '460px',
          opacity:      0.016,
          userSelect:   'none',
          mixBlendMode: 'screen',
          filter:       'blur(0.5px)',
        }}
      />

      {/* ── Monogram fragment — bottom left (mirrored, even fainter) ── */}
      <img
        src={assetUrl('/logo.webp')}
        alt=""
        loading="lazy"
        style={{
          position:     'fixed',
          left:         '-7%',
          bottom:       '8%',
          width:        '26vw',
          maxWidth:     '380px',
          opacity:      0.013,
          userSelect:   'none',
          mixBlendMode: 'screen',
          transform:    'scaleX(-1)',
          filter:       'blur(0.5px)',
        }}
      />

      {/* ── Left edge depth vignette ── */}
      <div
        style={{
          position:   'fixed',
          left:       0, top: 0, bottom: 0,
          width:      '90px',
          background: 'linear-gradient(90deg, rgba(2,2,16,0.28) 0%, transparent 100%)',
        }}
      />

      {/* ── Right edge depth vignette ── */}
      <div
        style={{
          position:   'fixed',
          right:      0, top: 0, bottom: 0,
          width:      '90px',
          background: 'linear-gradient(270deg, rgba(2,2,16,0.22) 0%, transparent 100%)',
        }}
      />

    </div>
  )
}
