import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LogoMark from '../ui/LogoMark'

/* ─── Reveal: fade + small lift, once ─── */
function Reveal({ children, delay = 0, y = 18, amount = 0.15 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Single capability card ─── */
function CapCard({ title, desc, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:    '24px 22px',
        background: hovered
          ? 'rgba(63,140,255,0.06)'
          : 'rgba(7,11,22,0.70)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 240ms ease',
        cursor:     'default',
      }}
    >
      <div style={{
        fontSize:      '14px',
        fontWeight:    700,
        letterSpacing: '-0.01em',
        color:         hovered ? 'var(--color-text-primary)' : 'rgba(240,242,255,0.88)',
        marginBottom:  '7px',
        transition:    'color 240ms ease',
      }}>
        {title}
      </div>
      <div style={{
        fontSize:   '12px',
        fontWeight: 400,
        lineHeight: 1.62,
        color:      'var(--color-text-muted)',
        opacity:    hovered ? 0.80 : 0.55,
        transition: 'opacity 240ms ease',
      }}>
        {desc}
      </div>
      {hovered && (
        <div style={{
          marginTop:  '12px',
          width:      '20px',
          height:     '1px',
          background: 'var(--color-blue)',
          opacity:    0.70,
        }} />
      )}
    </motion.div>
  )
}

/* ─── Section ─── */
export default function Experience() {
  const { t } = useTranslation()
  const METRICS = [
    { value: t('experience.years_value'),       label: t('experience.years_label') },
    { value: t('experience.projects_value'),    label: t('experience.projects_label') },
    { value: t('experience.disciplines_value'), label: t('experience.disciplines_label') },
    { value: t('experience.clients_value'),     label: t('experience.clients_label') },
  ]
  const CAPABILITIES = t('experience.caps', { returnObjects: true })

  return (
    <section
      id="experience"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px) 100px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        overflow:  'hidden',
      }}
    >
      {/* Editorial oversized number */}
      <div
        style={{
          position:      'absolute',
          right:         '-1%',
          top:           '2%',
          fontSize:      'clamp(140px, 20vw, 320px)',
          fontWeight:    900,
          lineHeight:    1,
          letterSpacing: '-0.06em',
          color:         'rgba(240,242,255,0.022)',
          userSelect:    'none',
          pointerEvents: 'none',
          zIndex:        0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        25
      </div>

      {/* Watermark */}
      <div style={{
        position:      'absolute',
        right:         'clamp(-80px, -4vw, -20px)',
        bottom:        '8%',
        zIndex:        0,
        pointerEvents: 'none',
        opacity:       1,
      }}>
        <LogoMark watermark size={480} />
      </div>

      {/* Atmospheric glow */}
      <div style={{
        position:     'absolute',
        top:          '-5%',
        right:        '-8%',
        width:        '50vw',
        height:       '50vw',
        maxWidth:     '700px',
        maxHeight:    '700px',
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(63,140,255,0.05) 0%, transparent 65%)',
        filter:       'blur(72px)',
        pointerEvents:'none',
        zIndex:       0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Label ── */}
        <Reveal delay={0} y={10}>
          <div style={{
            display:       'flex',
            alignItems:    'center',
            gap:           '12px',
            marginBottom:  '28px',
          }}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>02</span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('experience.section_label')}</span>
          </div>
        </Reveal>

        {/* ── Title ── */}
        <Reveal delay={0.06} y={22}>
          <h2 style={{
            fontSize:      'clamp(34px, 5.2vw, 76px)',
            fontWeight:    800,
            lineHeight:    1.04,
            letterSpacing: '-0.03em',
            color:         'var(--color-text-primary)',
            marginBottom:  '20px',
          }}>
            {t('experience.title_line1')}<br />{t('experience.title_line2')}
          </h2>
        </Reveal>

        {/* ── Paragraph ── */}
        <Reveal delay={0.12} y={16}>
          <p style={{
            fontSize:      'clamp(14px, 1.5vw, 18px)',
            fontWeight:    400,
            lineHeight:    1.70,
            color:         'var(--color-text-secondary)',
            maxWidth:      '600px',
            marginBottom:  '52px',
            opacity:       0.80,
          }}>
            {t('experience.subtitle')}
          </p>
        </Reveal>

        {/* ── Metrics ── */}
        <Reveal delay={0.10} y={14} amount={0.1}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{
              gap:           '1px',
              background:    'rgba(255,255,255,0.07)',
              border:        '1px solid rgba(255,255,255,0.07)',
              borderRadius:  '16px',
              overflow:      'hidden',
              marginBottom:  '52px',
            }}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                style={{
                  padding:    '28px 24px',
                  background: 'rgba(7,11,22,0.80)',
                }}
              >
                <div style={{
                  fontSize:      'clamp(28px, 4vw, 56px)',
                  fontWeight:    800,
                  lineHeight:    1,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-text-primary)',
                  marginBottom:  '6px',
                }}>
                  {m.value}
                </div>
                <div style={{
                  fontSize:      '11px',
                  fontWeight:    500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'var(--color-text-muted)',
                }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Capabilities label ── */}
        <Reveal delay={0} y={8} amount={0.1}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              fontSize:      '10px',
              fontWeight:    500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color:         'var(--color-text-muted)',
              opacity:       0.50,
            }}>
              {t('experience.caps_label')}
            </span>
          </div>
        </Reveal>

        {/* ── Capability grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gap:          '1px',
            background:   'rgba(255,255,255,0.07)',
            border:       '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            overflow:     'hidden',
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapCard
              key={cap.title}
              title={cap.title}
              desc={cap.desc}
              delay={i * 0.055}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
