import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Reveal({ children, delay = 0, y = 16, amount = 0.1 }) {
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

function PillarCard({ word, title, desc, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        padding:      '36px 32px',
        background:   'rgba(7,11,22,0.60)',
        border:       '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
      }}
    >
      <div
        style={{
          fontSize:      'clamp(28px, 3.6vw, 52px)',
          fontWeight:    800,
          letterSpacing: '0.05em',
          lineHeight:    1,
          color:         'rgba(240,242,255,0.09)',
          marginBottom:  '20px',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {word}
      </div>
      <div
        style={{
          fontSize:      'clamp(15px, 1.6vw, 20px)',
          fontWeight:    700,
          letterSpacing: '-0.015em',
          color:         'var(--color-text-primary)',
          marginBottom:  '10px',
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontSize:   '13px',
          lineHeight: 1.68,
          color:      'var(--color-text-secondary)',
          opacity:    0.62,
        }}
      >
        {desc}
      </p>
    </motion.div>
  )
}

export default function Branding() {
  const { t } = useTranslation()
  const PILLARS = t('branding.pillars', { returnObjects: true })

  return (
    <section
      id="branding"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        overflow:  'hidden',
      }}
    >
      {/* Glow — top right */}
      <div
        style={{
          position:     'absolute',
          top:          '-10%',
          right:        '-5%',
          width:        '45vw',
          maxWidth:     '640px',
          height:       '45vw',
          maxHeight:    '640px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.04) 0%, transparent 65%)',
          filter:       'blur(80px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Label */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>05</span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('branding.section_label')}</span>
          </div>
        </Reveal>

        {/* Header */}
        <div className="grid lg:grid-cols-2" style={{ gap: '48px', marginBottom: '64px' }}>
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
              {t('branding.title_line1')}<br />{t('branding.title_line2')}
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
              {t('branding.subtitle')}
            </p>
          </Reveal>
        </div>

        {/* Pillar grid */}
        <div className="grid sm:grid-cols-2" style={{ gap: '16px' }}>
          {PILLARS.map((p, i) => (
            <PillarCard
              key={i}
              word={p.word}
              title={p.title}
              desc={p.desc}
              delay={0.06 + i * 0.07}
            />
          ))}
        </div>

        {/* Bottom statement */}
        <Reveal delay={0.10} amount={0.08}>
          <div
            style={{
              marginTop:   '64px',
              paddingTop:  '40px',
              borderTop:   '1px solid rgba(255,255,255,0.06)',
              display:     'flex',
              alignItems:  'center',
              gap:         '24px',
              flexWrap:    'wrap',
            }}
          >
            <span
              style={{
                fontSize:      'clamp(13px, 1.5vw, 18px)',
                fontWeight:    700,
                letterSpacing: '-0.01em',
                color:         'rgba(240,242,255,0.50)',
                fontStyle:     'italic',
              }}
            >
              {t('branding.quote')}
            </span>
            <span
              style={{
                fontSize:  '11px',
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:     'var(--color-text-muted)',
                opacity:   0.40,
              }}
            >
              {t('branding.quote_author')}
            </span>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
