import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useModal }    from '../../context/ModalContext'
import SectionTag  from '../ui/SectionTag'
import GlowButton  from '../ui/GlowButton'
import LogoMark    from '../ui/LogoMark'
import AnimatedCounter from '../ui/AnimatedCounter'
import { heroData } from '../../data/hero'

/* ─────────────────────────────────────────────────────
   ENERGY CORE — data tables
───────────────────────────────────────────────────── */

/*
 * Field lines: organic gravity-well curves converging toward center (280,280).
 * Each path deliberately avoids circular symmetry — they feel like
 * energy being pulled into an anomaly, not orbiting around one.
 * Chromatic split = path rendered 3× with RGB color offset → membrane refraction.
 */
const FIELD_LINES = [
  /* Outer sweeping arcs — large, faint, define the spatial boundary */
  {
    d: 'M 524 28 C 596 130, 558 295, 408 374 C 362 396, 305 400, 262 378',
    color: '#3F8CFF', opacity: 0.13, width: 1.0, dasharray: '5 95', flowClass: 'flow-a',
    chroma: true,
  },
  {
    d: 'M 36 28 C -36 130, 2 295, 152 374 C 198 396, 255 400, 298 378',
    color: '#3F8CFF', opacity: 0.13, width: 1.0, dasharray: '5 95', flowClass: 'flow-b',
    chroma: true,
  },
  {
    d: 'M 532 494 C 572 388, 548 234, 402 180 C 356 160, 298 162, 266 184',
    color: '#3F8CFF', opacity: 0.10, width: 0.8, dasharray: '4 96', flowClass: 'flow-c',
  },
  {
    d: 'M 28 494 C -12 388, 12 234, 158 180 C 204 160, 262 162, 294 184',
    color: '#3F8CFF', opacity: 0.10, width: 0.8, dasharray: '4 96', flowClass: 'flow-d',
  },

  /* Mid arcs — brighter, more cyan, closer to core */
  {
    d: 'M 472 76 C 526 192, 504 328, 386 392 C 342 416, 280 418, 248 392',
    color: '#00D4FF', opacity: 0.22, width: 0.9, dasharray: '5 95', flowClass: 'flow-e',
    chroma: true,
  },
  {
    d: 'M 88 76 C 34 192, 56 328, 174 392 C 218 416, 280 418, 312 392',
    color: '#00D4FF', opacity: 0.22, width: 0.9, dasharray: '5 95', flowClass: 'flow-f',
    chroma: true,
  },

  /* Inner circuits — tight, bright, close to the core */
  {
    d: 'M 196 196 C 148 248, 152 332, 214 372 C 244 390, 274 392, 280 376',
    color: '#5B8FFF', opacity: 0.35, width: 0.7, dasharray: '4 96', flowClass: 'flow-g',
  },
  {
    d: 'M 364 196 C 412 248, 408 332, 346 372 C 316 390, 286 392, 280 376',
    color: '#5B8FFF', opacity: 0.35, width: 0.7, dasharray: '4 96', flowClass: 'flow-h',
  },
]

/* Data nodes — scattered in the field, some with accent rings */
const DATA_NODES = [
  /* Outer zone — faint anchors */
  { x: 66,  y: 116, r: 1.8, op: 0.22 },
  { x: 494, y: 106, r: 1.8, op: 0.22 },
  { x: 524, y: 392, r: 1.8, op: 0.18 },
  { x: 36,  y: 386, r: 1.8, op: 0.18 },
  { x: 158, y: 58,  r: 2.0, op: 0.24 },
  { x: 402, y: 56,  r: 2.0, op: 0.24 },
  { x: 536, y: 242, r: 1.8, op: 0.20 },
  { x: 24,  y: 296, r: 1.8, op: 0.20 },
  /* Mid zone */
  { x: 128, y: 172, r: 2.5, op: 0.38 },
  { x: 432, y: 168, r: 2.5, op: 0.38 },
  { x: 448, y: 406, r: 2.5, op: 0.32 },
  { x: 112, y: 416, r: 2.5, op: 0.32 },
  { x: 492, y: 286, r: 2.2, op: 0.28 },
  { x: 218, y: 92,  r: 2.2, op: 0.30 },
  { x: 342, y: 90,  r: 2.2, op: 0.30 },
  /* Inner zone — brighter */
  { x: 198, y: 218, r: 3.0, op: 0.55 },
  { x: 362, y: 218, r: 3.0, op: 0.55 },
  { x: 352, y: 352, r: 2.8, op: 0.48 },
  { x: 208, y: 354, r: 2.8, op: 0.48 },
  /* Accent nodes (larger, animated, with glow ring) */
  { x: 449, y: 130, r: 4.0, op: 0.78, accent: true },
  { x: 111, y: 130, r: 4.0, op: 0.78, accent: true },
  { x: 456, y: 446, r: 3.5, op: 0.68, accent: true },
  { x: 116, y: 449, r: 3.5, op: 0.68, accent: true },
]

/* Corner reticle brackets — N, E, S, W of outer ring (r=210, center 280,280) */
const RETICLE_MARKS = [
  { x: 280, y: 70,  rot: 0   }, /* N */
  { x: 490, y: 280, rot: 90  }, /* E */
  { x: 280, y: 490, rot: 180 }, /* S */
  { x:  70, y: 280, rot: 270 }, /* W */
]

/* Atmospheric micro-labels — built inside EnergyCore via useTranslation */
const MICRO_LABEL_POSITIONS = [
  { key: 'micro_strategy', x: 148, y: 62,  anchor: 'middle' },
  { key: 'micro_branding', x: 412, y: 62,  anchor: 'middle' },
  { key: 'micro_motion',   x: 52,  y: 222, anchor: 'middle' },
  { key: 'micro_web',      x: 508, y: 222, anchor: 'middle' },
  { key: 'micro_content',  x: 92,  y: 434, anchor: 'middle' },
  { key: 'micro_ai',       x: 466, y: 434, anchor: 'middle' },
]

/* Energy particles — drift upward toward the core */
const PARTICLES = [
  { left: '18%', top: '73%', size: 2.0, delay: 0,    dur: 15, cyan: false },
  { left: '64%', top: '78%', size: 1.5, delay: 2.8,  dur: 12, cyan: true  },
  { left: '36%', top: '82%', size: 1.8, delay: 5.2,  dur: 14, cyan: false },
  { left: '52%', top: '75%', size: 1.2, delay: 1.4,  dur: 18, cyan: false },
  { left: '78%', top: '68%', size: 2.0, delay: 7.0,  dur: 13, cyan: true  },
  { left: '12%', top: '58%', size: 1.5, delay: 3.5,  dur: 16, cyan: false },
  { left: '86%', top: '54%', size: 1.2, delay: 9.0,  dur: 11, cyan: true  },
  { left: '42%', top: '86%', size: 1.8, delay: 4.2,  dur: 17, cyan: false },
  { left: '70%', top: '80%', size: 1.0, delay: 6.8,  dur: 14, cyan: false },
  { left: '26%', top: '65%', size: 2.0, delay: 11.0, dur: 12, cyan: true  },
]

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}

/* Editorial Signal — "The Print" effect: words press through the screen plane */
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    rotateX: -22,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.60, ease: [0.25, 0.1, 0, 1] } },
}

/* ── Stat card ── */
function StatCard({ stat }) {
  return (
    <div
      style={{
        padding: '14px 20px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        minWidth: '100px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
        }}
      >
        {stat.type === 'number' ? (
          <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={1800} />
        ) : (
          stat.text
        )}
      </div>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginTop: '4px',
        }}
      >
        {stat.label}
      </div>
    </div>
  )
}

/* ── Energy Core — living creative intelligence core ── */
function EnergyCore() {
  const { t } = useTranslation()
  return (
    <motion.div
      variants={fadeIn}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '620px',
        aspectRatio: '1 / 1',
        flexShrink: 0,
      }}
    >
      {/* ── Wide ambient halo — spills beyond container edges ── */}
      <div
        style={{
          position: 'absolute',
          inset: '-16%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 48% 50%, rgba(63,140,255,0.11) 0%, rgba(63,140,255,0.04) 40%, transparent 62%)',
          filter: 'blur(52px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 1: Chromatic membrane — 5 breathing color volumes ── */}
      {/* Primary blue — dominant center bloom */}
      <div
        style={{
          position: 'absolute',
          width: '84%', height: '84%',
          top: '8%', left: '8%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 44% 44%, rgba(63,140,255,0.65) 0%, rgba(63,140,255,0.22) 36%, transparent 66%)',
          filter: 'blur(38px)',
          mixBlendMode: 'screen',
          animation: 'chromaBreathe 4.8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Cyan — lower-right secondary bloom */}
      <div
        style={{
          position: 'absolute',
          width: '62%', height: '62%',
          bottom: '1%', right: '1%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 65% 65%, rgba(0,212,255,0.55) 0%, rgba(0,212,255,0.16) 42%, transparent 66%)',
          filter: 'blur(32px)',
          mixBlendMode: 'screen',
          animation: 'chromaBreatheAlt 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Violet — upper-left */}
      <div
        style={{
          position: 'absolute',
          width: '52%', height: '52%',
          top: '1%', left: '1%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 35%, rgba(123,79,255,0.46) 0%, rgba(123,79,255,0.12) 46%, transparent 68%)',
          filter: 'blur(28px)',
          mixBlendMode: 'screen',
          animation: 'chromaBreathe 7.2s ease-in-out infinite 0.8s',
          pointerEvents: 'none',
        }}
      />

      {/* Warm amber — bottom subtle heat */}
      <div
        style={{
          position: 'absolute',
          width: '44%', height: '40%',
          bottom: '5%', left: '28%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 60%, rgba(255,179,71,0.34) 0%, rgba(255,107,43,0.10) 50%, transparent 70%)',
          filter: 'blur(24px)',
          mixBlendMode: 'screen',
          animation: 'chromaBreatheAlt 5.5s ease-in-out infinite 2.2s',
          pointerEvents: 'none',
        }}
      />

      {/* Deep blue anchor — upper-right */}
      <div
        style={{
          position: 'absolute',
          width: '46%', height: '46%',
          top: '3%', right: '3%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 66% 34%, rgba(30,90,255,0.40) 0%, rgba(30,90,255,0.10) 48%, transparent 70%)',
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
          animation: 'chromaBreathe 9s ease-in-out infinite 1.5s',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 2: Energy pulse rings — cascade outward ── */}
      {[0, 1.6, 3.2].map((delay, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '200px', height: '200px',
            top: '50%', left: '50%',
            marginTop: '-100px', marginLeft: '-100px',
            borderRadius: '50%',
            border: '1px solid rgba(63,140,255,0.48)',
            animation: `energyPulse 4.8s ease-out ${delay}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Layer 3: Particle field — energy rising toward core ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.left, top: p.top,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%',
            background: p.cyan ? '#00D4FF' : '#3F8CFF',
            animation: `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Layer 4: SVG — field lines, nodes, reticles, micro-labels ── */}
      <svg
        viewBox="0 0 560 560"
        fill="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Gravity-well field lines with chromatic aberration */}
        {FIELD_LINES.map((line, i) => (
          <g key={i}>
            {line.chroma && (
              <>
                <path
                  d={line.d}
                  stroke="rgba(255,70,70,0.07)"
                  strokeWidth={line.width}
                  strokeDasharray={line.dasharray}
                  className={line.flowClass}
                  transform="translate(1.5, 0)"
                />
                <path
                  d={line.d}
                  stroke="rgba(70,210,255,0.07)"
                  strokeWidth={line.width}
                  strokeDasharray={line.dasharray}
                  className={line.flowClass}
                  transform="translate(-1.5, 0)"
                />
              </>
            )}
            <path
              d={line.d}
              stroke={line.color}
              strokeWidth={line.width}
              strokeOpacity={line.opacity}
              strokeDasharray={line.dasharray}
              className={line.flowClass}
            />
          </g>
        ))}

        {/* Data scatter nodes */}
        {DATA_NODES.map((node, i) => (
          <g key={i}>
            {node.accent && (
              <>
                <circle
                  cx={node.x} cy={node.y}
                  r={node.r + 9}
                  fill="none"
                  stroke="rgba(0,212,255,0.22)"
                  strokeWidth="0.5"
                  style={{ animation: `nodeBlink ${2.4 + (i % 5) * 0.4}s ease-in-out infinite` }}
                />
                <circle
                  cx={node.x} cy={node.y}
                  r={node.r + 4}
                  fill="none"
                  stroke="rgba(63,140,255,0.44)"
                  strokeWidth="0.5"
                />
              </>
            )}
            <circle
              cx={node.x} cy={node.y}
              r={node.r}
              fill={node.accent ? '#00D4FF' : '#3F8CFF'}
              fillOpacity={node.op}
              style={node.accent
                ? { animation: `nodeBlink ${2 + (i % 4) * 0.3}s ease-in-out infinite` }
                : undefined}
            />
          </g>
        ))}

        {/* Reticle cross-marks N / E / S / W */}
        {RETICLE_MARKS.map((mark, i) => (
          <g key={i} transform={`translate(${mark.x},${mark.y}) rotate(${mark.rot})`}>
            <line x1="-7" y1="0"  x2="-3" y2="0"  stroke="rgba(63,140,255,0.48)" strokeWidth="0.8" />
            <line x1="3"  y1="0"  x2="7"  y2="0"  stroke="rgba(63,140,255,0.48)" strokeWidth="0.8" />
            <line x1="0"  y1="-7" x2="0"  y2="-3" stroke="rgba(63,140,255,0.48)" strokeWidth="0.8" />
            <line x1="0"  y1="3"  x2="0"  y2="7"  stroke="rgba(63,140,255,0.48)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.2" fill="rgba(63,140,255,0.62)" />
          </g>
        ))}

        {/* Micro-labels — atmospheric zone markers, discovered not announced */}
        {MICRO_LABEL_POSITIONS.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            fontSize="8"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="500"
            letterSpacing="0.16em"
            fill="rgba(138,144,168,0.28)"
          >
            {t(`hero.${label.key}`)}
          </text>
        ))}
      </svg>

      {/* ── Layer 5: Structural rings ── */}

      {/* Outer boundary — static dashed */}
      <div
        style={{
          position: 'absolute',
          width: '75%', height: '75%',
          top: '50%', left: '50%',
          marginTop: '-37.5%', marginLeft: '-37.5%',
          borderRadius: '50%',
          border: '1px dashed rgba(63,140,255,0.10)',
          pointerEvents: 'none',
        }}
      />

      {/* Outer scanner — CW slow spin, leading edge bright */}
      <div
        className="ring-spin-cw"
        style={{
          position: 'absolute',
          width: '75%', height: '75%',
          top: '50%', left: '50%',
          marginTop: '-37.5%', marginLeft: '-37.5%',
          borderRadius: '50%',
          border: '1px solid transparent',
          borderTopColor: 'rgba(63,140,255,0.60)',
          borderRightColor: 'rgba(63,140,255,0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* Membrane ring — glass blur surface, slow opacity pulse */}
      <div
        style={{
          position: 'absolute',
          width: '60.7%', height: '60.7%',
          top: '50%', left: '50%',
          marginTop: '-30.35%', marginLeft: '-30.35%',
          borderRadius: '50%',
          border: '1px solid rgba(63,140,255,0.20)',
          background: 'rgba(5,9,28,0.48)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          animation: 'membraneShimmer 5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Membrane scanner — CCW, cyan accent */}
      <div
        className="ring-spin-ccw"
        style={{
          position: 'absolute',
          width: '60.7%', height: '60.7%',
          top: '50%', left: '50%',
          marginTop: '-30.35%', marginLeft: '-30.35%',
          borderRadius: '50%',
          border: '1px solid transparent',
          borderBottomColor: 'rgba(0,212,255,0.60)',
          borderLeftColor: 'rgba(0,212,255,0.14)',
          pointerEvents: 'none',
        }}
      />

      {/* Inner containment ring */}
      <div
        style={{
          position: 'absolute',
          width: '39.3%', height: '39.3%',
          top: '50%', left: '50%',
          marginTop: '-19.65%', marginLeft: '-19.65%',
          borderRadius: '50%',
          border: '1px solid rgba(91,143,255,0.32)',
          background: 'rgba(4,7,20,0.70)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* Innermost bright ring */}
      <div
        style={{
          position: 'absolute',
          width: '21.4%', height: '21.4%',
          top: '50%', left: '50%',
          marginTop: '-10.7%', marginLeft: '-10.7%',
          borderRadius: '50%',
          border: '1px solid rgba(63,140,255,0.52)',
          background: 'rgba(8,14,40,0.92)',
          boxShadow: '0 0 28px rgba(63,140,255,0.12) inset',
          pointerEvents: 'none',
        }}
      />

      {/* Innermost scanner — fast CW */}
      <div
        className="ring-spin-cw"
        style={{
          position: 'absolute',
          width: '21.4%', height: '21.4%',
          top: '50%', left: '50%',
          marginTop: '-10.7%', marginLeft: '-10.7%',
          borderRadius: '50%',
          border: '1px solid transparent',
          borderTopColor: 'rgba(91,143,255,0.85)',
          animationDuration: '4s',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 6: Core singularity ── */}
      <div
        style={{
          position: 'absolute',
          width: '32px', height: '32px',
          top: '50%', left: '50%',
          marginTop: '-16px', marginLeft: '-16px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, #B8D8FF 0%, #3F8CFF 42%, #1A4FCC 100%)',
          animation: 'coreBreathe 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

/* ── Scroll indicator ── */
function ScrollIndicator() {
  const { t } = useTranslation()
  return (
    <motion.div
      variants={fadeIn}
      style={{
        position: 'absolute',
        bottom: '36px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}
      >
        {t('hero.scroll')}
      </span>
      <div
        className="animate-scroll-hint"
        style={{
          width: '1px',
          height: '40px',
          background:
            'linear-gradient(to bottom, rgba(63,140,255,0.60), transparent)',
        }}
      />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   Hero — main export
═══════════════════════════════════════════════ */
export default function Hero() {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const headline = t('hero.headline', { returnObjects: true })
  const stats = [
    { type: 'number', value: 25, suffix: '+', label: t('hero.stat_years_label') },
    { type: 'number', value: 6,  suffix: '',  label: t('hero.stat_disciplines_label') },
    { type: 'text',   text: 'Global',          label: t('hero.stat_clients_label') },
    { type: 'text',   text: 'AI',              label: t('hero.stat_powered_label') },
  ]

  return (
    <section
      id="hero"
      style={{
        height:      '100vh',
        position:    'relative',
        overflow:    'hidden',
        display:     'flex',
        alignItems:  'center',
      }}
    >
      <div style={{ width: '100%', position: 'relative' }}>
          {/* Brand watermark — 2.8% opacity, behind hero content */}
          <LogoMark
            watermark
            size={480}
            style={{
              position: 'absolute',
              left: 'clamp(20px, 5vw, 80px)',
              top: '44%',
              transform: 'translateY(-50%)',
              zIndex: 0,
            }}
          />

          {/* Inner layout grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '32px',
              padding: '0 clamp(20px, 5vw, 80px)',
              paddingTop: '72px', /* header offset */
              maxWidth: '1440px',
              margin: '0 auto',
              width: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* ── LEFT COLUMN: Text content ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-left-col"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '28px',
              }}
            >
              {/* ── Brand signature + category badge — one compositional system ── */}
              <motion.div
                variants={fadeUp}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {/* Primary mark */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                  <LogoMark
                    size={140}
                    displaySize="clamp(110px, 14vw, 175px)"
                  />
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                      opacity: 0.38,
                      width: `calc(clamp(110px, 14vw, 175px) * 2.1)`,
                      textAlign: 'center',
                    }}
                  >
                    {t('hero.brands_tagline')}
                  </span>
                </div>
                {/* Category badge */}
                <SectionTag>{t('hero.tag')}</SectionTag>
              </motion.div>

              {/* H1 — "The Print" word-by-word entrance */}
              <div style={{ perspective: '1000px' }}>
                <h1
                  style={{
                    fontSize: 'clamp(52px, 7.5vw, 112px)',
                    fontWeight: 800,
                    lineHeight: 1.02,
                    letterSpacing: '-0.025em',
                    color: 'var(--color-text-primary)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0 0.25em',
                  }}
                >
                  {headline.map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      style={{ display: 'inline-block' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </div>

              {/* Subline */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: 'clamp(16px, 1.4vw, 20px)',
                  lineHeight: 1.70,
                  color: 'var(--color-text-secondary)',
                  maxWidth: '52ch',
                }}
              >
                {t('hero.subline')}
              </motion.p>

              {/* CTA row */}
              <motion.div
                variants={fadeUp}
                style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
              >
                <GlowButton variant="primary" onClick={openModal}>
                  {t('hero.cta_primary')}
                </GlowButton>
                <GlowButton variant="secondary" href={heroData.cta.secondary.href}>
                  {t('hero.cta_secondary')}
                </GlowButton>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={containerVariants}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
              >
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <StatCard stat={stat} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN: Creative Lens visual ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-right-col"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <EnergyCore />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: 'none',
          }}
        >
          <ScrollIndicator />
        </motion.div>
    </section>
  )
}
