import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const SERVICE_VISUAL = [
  { letter: 'B', accent: 'rgba(255,190,55,0.55)' },
  { letter: 'W', accent: 'rgba(63,140,255,0.55)'  },
  { letter: 'A', accent: 'rgba(120,210,255,0.55)' },
  { letter: 'S', accent: 'rgba(200,100,210,0.55)' },
  { letter: 'Y', accent: 'rgba(255,100,80,0.55)'  },
  { letter: 'M', accent: 'rgba(100,225,155,0.55)' },
]

function ServiceCard({ svc, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:    'relative',
        padding:     '32px 28px 28px',
        background:  hovered ? 'rgba(63,140,255,0.04)' : 'rgba(7,11,22,0.70)',
        border:      `1px solid ${hovered ? 'rgba(63,140,255,0.16)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius:'20px',
        overflow:    'hidden',
        cursor:      'default',
        transition:  'background 300ms ease, border-color 300ms ease',
      }}
    >
      {/* Large background letter */}
      <div
        style={{
          position:      'absolute',
          top:           '-8px',
          right:         '8px',
          fontSize:      '148px',
          fontWeight:    900,
          lineHeight:    1,
          letterSpacing: '-0.04em',
          color:         'rgba(255,255,255,0.020)',
          userSelect:    'none',
          pointerEvents: 'none',
          transition:    'color 300ms ease',
        }}
      >
        {svc.letter}
      </div>

      {/* Accent dot */}
      <div
        style={{
          width:           '8px',
          height:          '8px',
          borderRadius:    '50%',
          background:      hovered ? svc.accent : 'rgba(255,255,255,0.12)',
          marginBottom:    '20px',
          transition:      'background 300ms ease',
          boxShadow:       hovered ? `0 0 12px ${svc.accent}` : 'none',
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize:      'clamp(18px, 2.2vw, 28px)',
          fontWeight:    800,
          letterSpacing: '-0.02em',
          color:         hovered ? 'var(--color-text-primary)' : 'rgba(240,242,255,0.88)',
          marginBottom:  '8px',
          lineHeight:    1.1,
          transition:    'color 280ms ease',
        }}
      >
        {svc.title}
      </div>

      {/* Value proposition */}
      <p
        style={{
          fontSize:     '13px',
          lineHeight:   1.55,
          fontStyle:    'italic',
          color:        'var(--color-text-secondary)',
          opacity:      hovered ? 0.72 : 0.50,
          marginBottom: '0',
          transition:   'opacity 280ms ease',
        }}
      >
        {svc.value}
      </p>

      {/* Capabilities — hover reveal */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8, height: hovered ? 'auto' : 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div
          style={{
            marginTop:  '18px',
            paddingTop: '16px',
            borderTop:  '1px solid rgba(255,255,255,0.06)',
            display:    'flex',
            flexDirection:'column',
            gap:        '7px',
          }}
        >
          {svc.caps.map((c) => (
            <div
              key={c}
              style={{
                display:    'flex',
                alignItems: 'flex-start',
                gap:        '10px',
              }}
            >
              <span
                style={{
                  width:        '4px',
                  height:       '4px',
                  borderRadius: '50%',
                  background:   svc.accent,
                  opacity:      0.65,
                  flexShrink:   0,
                  marginTop:    '6px',
                }}
              />
              <span
                style={{
                  fontSize:   '12px',
                  lineHeight: 1.55,
                  color:      'var(--color-text-secondary)',
                  opacity:    0.68,
                }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  )
}

function Reveal({ children, delay = 0, y = 16 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
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

export default function Services() {
  const { t } = useTranslation()
  const SERVICES = t('services.items', { returnObjects: true }).map((item, i) => ({
    ...item,
    ...SERVICE_VISUAL[i],
  }))

  return (
    <section
      id="services"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Editorial oversized section number */}
      <div
        style={{
          position:      'absolute',
          left:          '-1%',
          bottom:        '-4%',
          fontSize:      'clamp(120px, 18vw, 280px)',
          fontWeight:    900,
          lineHeight:    1,
          letterSpacing: '-0.06em',
          color:         'rgba(240,242,255,0.018)',
          userSelect:    'none',
          pointerEvents: 'none',
          zIndex:        0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        03
      </div>

      {/* Glow — bottom left */}
      <div
        style={{
          position:     'absolute',
          bottom:       '-8%',
          left:         '-6%',
          width:        '40vw',
          maxWidth:     '560px',
          height:       '40vw',
          maxHeight:    '560px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.045) 0%, transparent 65%)',
          filter:       'blur(80px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Label */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>03</span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('services.section_label')}</span>
          </div>
        </Reveal>

        {/* Header */}
        <div className="grid lg:grid-cols-2" style={{ gap: '48px', marginBottom: '52px' }}>
          <Reveal delay={0.06}>
            <h2
              style={{
                fontSize:      'clamp(32px, 4.8vw, 72px)',
                fontWeight:    800,
                lineHeight:    1.04,
                letterSpacing: '-0.03em',
                color:         'var(--color-text-primary)',
              }}
            >
              {t('services.title')}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              style={{
                fontSize:   'clamp(14px, 1.5vw, 18px)',
                lineHeight: 1.72,
                color:      'var(--color-text-secondary)',
                opacity:    0.76,
                maxWidth:   '520px',
                paddingTop: '8px',
              }}
            >
              {t('services.subtitle')}
            </p>
          </Reveal>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '14px' }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={i} svc={svc} delay={0.04 + i * 0.06} />
          ))}
        </div>

      </div>
    </section>
  )
}
