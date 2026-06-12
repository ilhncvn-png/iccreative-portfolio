import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Reveal({ children, delay = 0, y = 16, amount = 0.12 }) {
  const ref    = useRef(null)
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

export default function ContentYoutube() {
  const { t } = useTranslation()
  const PLATFORMS    = t('content.platforms', { returnObjects: true })
  const CAPABILITIES = t('content.caps',      { returnObjects: true })
  const OUTCOMES     = t('content.outcomes',  { returnObjects: true })

  return (
    <section
      id="content"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Glow — left center */}
      <div
        style={{
          position:     'absolute',
          top:          '15%',
          left:         '-8%',
          width:        '45vw',
          maxWidth:     '620px',
          height:       '45vw',
          maxHeight:    '620px',
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
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>07</span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('content.section_label')}</span>
          </div>
        </Reveal>

        {/* Header */}
        <div className="grid lg:grid-cols-2" style={{ gap: '48px', marginBottom: '48px' }}>
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
              {t('content.title_line1')}<br />{t('content.title_line2')}<br />{t('content.title_line3')}
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
              {t('content.subtitle')}
            </p>
          </Reveal>
        </div>

        {/* Outcome bar */}
        <Reveal delay={0.10} amount={0.08}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{
              gap:           '1px',
              background:    'rgba(255,255,255,0.06)',
              border:        '1px solid rgba(255,255,255,0.06)',
              borderRadius:  '14px',
              overflow:      'hidden',
              marginBottom:  '40px',
            }}
          >
            {OUTCOMES.map((o, i) => (
              <div
                key={i}
                style={{
                  padding:    '20px 22px',
                  background: 'rgba(7,11,22,0.82)',
                }}
              >
                <div
                  style={{
                    fontSize:      '18px',
                    fontWeight:    800,
                    letterSpacing: '-0.02em',
                    color:         'var(--color-text-primary)',
                    marginBottom:  '3px',
                  }}
                >
                  {o.label}
                </div>
                <div
                  style={{
                    fontSize:      '10px',
                    fontWeight:    500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color:         'var(--color-text-muted)',
                    opacity:       0.45,
                  }}
                >
                  {o.desc}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Platforms */}
        <Reveal delay={0.08} amount={0.08}>
          <div
            style={{
              display:      'flex',
              flexWrap:     'wrap',
              gap:          '8px',
              marginBottom: '40px',
            }}
          >
            {PLATFORMS.map((p, i) => (
              <div
                key={i}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '10px',
                  padding:      '9px 16px',
                  background:   'rgba(7,11,22,0.70)',
                  border:       '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '100px',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>{p.name}</span>
                <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.10)' }} />
                <span style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{p.role}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Capabilities grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap:          '1px',
            background:   'rgba(255,255,255,0.06)',
            border:       '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            overflow:     'hidden',
          }}
        >
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.06 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              style={{
                padding:    '26px 22px',
                background: 'rgba(7,11,22,0.82)',
              }}
            >
              <div
                style={{
                  fontSize:      '13px',
                  fontWeight:    700,
                  letterSpacing: '-0.01em',
                  color:         'rgba(240,242,255,0.88)',
                  marginBottom:  '7px',
                }}
              >
                {c.title}
              </div>
              <p
                style={{
                  fontSize:   '12px',
                  lineHeight: 1.62,
                  color:      'var(--color-text-muted)',
                  opacity:    0.58,
                }}
              >
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
