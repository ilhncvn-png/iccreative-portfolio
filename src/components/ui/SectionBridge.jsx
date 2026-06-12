/*
 * SectionBridge — atmospheric hairline placed between sections.
 * Creates the illusion of chromatic light leaking from one section into the next.
 * Has zero height in normal flow; all visual elements are overflow: visible.
 */
export default function SectionBridge({ offset = 'center', intensity = 1 }) {
  const positions = {
    left:   { lineLeft: '6%',  glowLeft: '12%'  },
    center: { lineLeft: '18%', glowLeft: '30%'  },
    right:  { lineLeft: '46%', glowLeft: '48%'  },
  }
  const p   = positions[offset] || positions.center
  const op  = intensity

  return (
    <div
      aria-hidden="true"
      style={{
        position:     'relative',
        zIndex:       2,
        height:       0,
        pointerEvents:'none',
        overflow:     'visible',
      }}
    >
      {/* Chromatic glow line — sits exactly at section boundary */}
      <div
        style={{
          position:   'absolute',
          top:        0,
          left:       p.lineLeft,
          width:      '36%',
          height:     '1px',
          background: `linear-gradient(90deg, transparent, rgba(63,140,255,${0.22 * op}), transparent)`,
        }}
      />

      {/* Soft emanation halo above the line */}
      <div
        style={{
          position:   'absolute',
          top:        '-36px',
          left:       p.glowLeft,
          width:      '200px',
          height:     '72px',
          background: `radial-gradient(ellipse at 50% 100%, rgba(63,140,255,${0.07 * op}) 0%, transparent 70%)`,
          filter:     'blur(4px)',
        }}
      />

      {/* Tiny bright spark at line center */}
      <div
        style={{
          position:     'absolute',
          top:          '-2px',
          left:         `calc(${p.lineLeft} + 15%)`,
          width:        '4px',
          height:       '4px',
          borderRadius: '50%',
          background:   `rgba(63,140,255,${0.45 * op})`,
          filter:       `blur(2px)`,
        }}
      />
    </div>
  )
}
