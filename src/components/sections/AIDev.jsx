import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Reveal({ children, delay = 0, y = 16, amount = 0.12 }) {
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

export default function AIDev() {
  const { t } = useTranslation()
  const AI_BENEFITS = t('ai.benefits', { returnObjects: true })
  const AI_STACK    = t('ai.stack',    { returnObjects: true })

  return (
    <section
      id="ai"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        overflow:  'hidden',
      }}
    >
      {/* Glow — center right, blue-heavy */}
      <div
        style={{
          position:     'absolute',
          top:          '5%',
          right:        '-8%',
          width:        '55vw',
          maxWidth:     '760px',
          height:       '55vw',
          maxHeight:    '760px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.07) 0%, transparent 60%)',
          filter:       'blur(90px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Label */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>04</span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('ai.section_label')}</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.06}>
          <h2
            style={{
              fontSize:      'clamp(30px, 4.8vw, 68px)',
              fontWeight:    800,
              lineHeight:    1.06,
              letterSpacing: '-0.03em',
              color:         'var(--color-text-primary)',
              marginBottom:  '64px',
              maxWidth:      '860px',
            }}
          >
            {t('ai.title_line1')}<br />{t('ai.title_line2')}
          </h2>
        </Reveal>

        {/* Two-column */}
        <div className="grid lg:grid-cols-2" style={{ gap: '80px', alignItems: 'start' }}>

          {/* Left: benefit statements */}
          <div>
            {AI_BENEFITS.map((b, i) => (
              <Reveal key={i} delay={0.08 + i * 0.07} amount={0.08}>
                <div
                  style={{
                    paddingBottom: '36px',
                    marginBottom:  '36px',
                    borderBottom:  '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      display:     'flex',
                      alignItems:  'center',
                      gap:         '10px',
                      marginBottom:'10px',
                    }}
                  >
                    <span
                      style={{
                        width:        '6px',
                        height:       '6px',
                        borderRadius: '50%',
                        background:   'var(--color-blue)',
                        opacity:      0.72,
                        flexShrink:   0,
                      }}
                    />
                    <h3
                      style={{
                        fontSize:      'clamp(17px, 2vw, 24px)',
                        fontWeight:    800,
                        letterSpacing: '-0.02em',
                        color:         'var(--color-text-primary)',
                      }}
                    >
                      {b.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize:   '14px',
                      lineHeight: 1.68,
                      color:      'var(--color-text-secondary)',
                      opacity:    0.68,
                      paddingLeft:'16px',
                    }}
                  >
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: capability index */}
          <Reveal delay={0.12} amount={0.08}>
            <div
              style={{
                padding:      '32px',
                background:   'rgba(63,140,255,0.03)',
                border:       '1px solid rgba(63,140,255,0.10)',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  fontSize:      '10px',
                  fontWeight:    600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color:         'var(--color-text-muted)',
                  opacity:       0.50,
                  marginBottom:  '28px',
                }}
              >
                {t('ai.stack_label')}
              </div>
              {AI_STACK.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'space-between',
                    padding:        '12px 0',
                    borderBottom:   i < AI_STACK.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize:      '13px',
                      fontWeight:    500,
                      color:         'rgba(240,242,255,0.72)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize:      '10px',
                      fontWeight:    500,
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color:         'var(--color-blue)',
                      opacity:       0.55,
                      flexShrink:    0,
                      marginLeft:    '20px',
                    }}
                  >
                    {item.cat}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
