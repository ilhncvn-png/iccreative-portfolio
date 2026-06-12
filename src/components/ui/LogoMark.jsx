import { useState } from 'react'
import { assetUrl } from '../../utils/assetPath'

/*
 * LogoMark — İÇ brand monogram (PNG asset, 1536×1024)
 *
 * The PNG has ~35% transparent glow area at the bottom.
 * We clip it by displaying the image in a container whose aspect ratio
 * is wider than the image (2.1:1 vs 1.5:1), with object-fit: cover and
 * object-position: top — so only the top ~70% (the actual mark) shows.
 *
 * Props:
 *   size         {number}  Height of the visible mark in px (for glow calc)
 *   displaySize  {string}  CSS height override (clamp expression etc.)
 *   watermark    {bool}    Oversized, ~3% opacity, no interaction
 *   hoverable    {bool}    Disable hover glow (e.g. inside nav overlays)
 *   style        {object}  Passed to outer wrapper
 */
export default function LogoMark({
  size        = 52,
  displaySize = null,
  watermark   = false,
  hoverable   = true,
  style: ext  = {},
}) {
  const [hovered, setHovered] = useState(false)
  const s = Math.round

  const h = displaySize || `${size}px`
  // Container is 2.1× the height — wider than the image's native 1.5:1 ratio.
  // object-fit: cover fills the width; object-position: top clips the sparse bottom.
  const w = `calc(${h} * 2.1)`

  /* ── Watermark variant ── */
  if (watermark) {
    return (
      <img
        src={assetUrl('/logo.webp')}
        alt=""
        aria-hidden
        style={{
          height: h,
          width: 'auto',
          opacity: 0.030,
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          ...ext,
        }}
      />
    )
  }

  /* ── Interactive variant ── */
  const glowBlur  = s(size * 0.48)
  const glowSize  = s(size * 2.4)
  const glowHalf  = s(size * 1.2)

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', ...ext }}
      onMouseEnter={hoverable ? () => setHovered(true)  : undefined}
      onMouseLeave={hoverable ? () => setHovered(false) : undefined}
    >
      {/* Ambient glow — centered on the clip container */}
      <div
        style={{
          position:    'absolute',
          top:         '50%',
          left:        '50%',
          width:       `${glowSize}px`,
          height:      `${glowSize}px`,
          marginTop:   `-${glowHalf}px`,
          marginLeft:  `-${glowHalf}px`,
          borderRadius: '50%',
          background:  `radial-gradient(circle, rgba(63,140,255,${hovered ? 0.26 : 0.13}) 0%, transparent 65%)`,
          filter:      `blur(${glowBlur}px)`,
          animation:   'logoMarkPulse 10s ease-in-out infinite',
          pointerEvents: 'none',
          transition:  'background 380ms var(--ease-smooth)',
        }}
      />

      {/* Clip container — crops bottom transparent glow area of the PNG */}
      <div
        style={{
          position:   'relative',
          zIndex:     1,
          width:      w,
          height:     h,
          overflow:   'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={assetUrl('/logo.webp')}
          alt="İÇ"
          draggable={false}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top center',
            display:        'block',
            userSelect:     'none',
            filter: hovered
              ? `brightness(1.12) drop-shadow(0 0 ${s(size * 0.18)}px rgba(63,140,255,0.60))`
              : `brightness(1.0)  drop-shadow(0 0 ${s(size * 0.08)}px rgba(63,140,255,0.22))`,
            transition: 'filter 380ms var(--ease-smooth)',
          }}
        />
      </div>
    </div>
  )
}
