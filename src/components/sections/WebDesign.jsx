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

/* CSS browser-frame mockup — abstract visual suggestion */
function BrowserMock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
      style={{
        background:   'rgba(10,14,28,0.90)',
        border:       '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow:     'hidden',
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          padding:      '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display:      'flex',
          alignItems:   'center',
          gap:          '7px',
          background:   'rgba(255,255,255,0.02)',
        }}
      >
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ marginLeft: '12px', height: '6px', width: '140px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }} />
      </div>

      {/* Page content — abstract representation */}
      <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Nav row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ height: '8px', width: '40px', background: 'rgba(255,255,255,0.12)', borderRadius: '4px' }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            {[48, 40, 56, 44].map((w, i) => (
              <div key={i} style={{ height: '6px', width: `${w}px`, background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }} />
            ))}
          </div>
        </div>

        {/* Hero block */}
        <div
          style={{
            marginTop:    '8px',
            padding:      '32px 20px',
            background:   'rgba(63,140,255,0.04)',
            border:       '1px solid rgba(63,140,255,0.08)',
            borderRadius: '10px',
            display:      'flex',
            flexDirection:'column',
            gap:          '10px',
          }}
        >
          <div style={{ height: '14px', width: '70%', background: 'rgba(255,255,255,0.14)', borderRadius: '4px' }} />
          <div style={{ height: '10px', width: '85%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
          <div style={{ height: '10px', width: '60%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
          <div style={{ marginTop: '8px', display: 'flex', gap: '10px' }}>
            <div style={{ height: '28px', width: '88px', background: 'rgba(63,140,255,0.32)', borderRadius: '6px' }} />
            <div style={{ height: '28px', width: '88px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.10)' }} />
          </div>
        </div>

        {/* Card row */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex:         1,
                height:       '52px',
                background:   'rgba(255,255,255,0.03)',
                border:       '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
              }}
            />
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default function WebDesign() {
  const { t } = useTranslation()
  const FEATURES = t('web.features', { returnObjects: true })

  return (
    <section
      id="web"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        overflow:  'hidden',
      }}
    >
      {/* Glow — bottom center */}
      <div
        style={{
          position:     'absolute',
          bottom:       '-5%',
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        '50vw',
          maxWidth:     '680px',
          height:       '50vw',
          maxHeight:    '680px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.04) 0%, transparent 65%)',
          filter:       'blur(90px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Label */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>06</span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('web.section_label')}</span>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2" style={{ gap: '72px', alignItems: 'start' }}>

          {/* Left: copy + features */}
          <div>
            <Reveal delay={0.06}>
              <h2
                style={{
                  fontSize:      'clamp(32px, 4.8vw, 72px)',
                  fontWeight:    800,
                  lineHeight:    1.04,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-text-primary)',
                  marginBottom:  '24px',
                }}
              >
                {t('web.title_line1')}<br />{t('web.title_line2')}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p
                style={{
                  fontSize:     'clamp(14px, 1.5vw, 17px)',
                  lineHeight:   1.72,
                  color:        'var(--color-text-secondary)',
                  opacity:      0.76,
                  marginBottom: '48px',
                  maxWidth:     '460px',
                }}
              >
                {t('web.subtitle')}
              </p>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {FEATURES.map((f, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06} amount={0.08}>
                  <div
                    style={{
                      padding:      '20px 0',
                      borderTop:    '1px solid rgba(255,255,255,0.06)',
                      display:      'grid',
                      gridTemplateColumns: '160px 1fr',
                      gap:          '24px',
                      alignItems:   'start',
                    }}
                  >
                    <span
                      style={{
                        fontSize:      '12px',
                        fontWeight:    700,
                        letterSpacing: '-0.005em',
                        color:         'rgba(240,242,255,0.78)',
                        paddingTop:    '1px',
                      }}
                    >
                      {f.title}
                    </span>
                    <span
                      style={{
                        fontSize:   '12px',
                        lineHeight: 1.62,
                        color:      'var(--color-text-secondary)',
                        opacity:    0.55,
                      }}
                    >
                      {f.desc}
                    </span>
                  </div>
                </Reveal>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
            </div>
          </div>

          {/* Right: browser mockup */}
          <div style={{ paddingTop: '8px' }}>
            <BrowserMock />
          </div>

        </div>
      </div>
    </section>
  )
}
