import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const PHASE_NUMS = ['01', '02', '03', '04']

function PhaseCard({ phase, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        padding:      '36px 32px',
        background:   'rgba(7,11,22,0.70)',
        border:       '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        display:      'flex',
        flexDirection:'column',
        gap:          '0',
      }}
    >
      {/* Number + duration row */}
      <div
        style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          marginBottom:   '20px',
        }}
      >
        <span
          style={{
            fontSize:      'clamp(40px, 5vw, 72px)',
            fontWeight:    800,
            lineHeight:    1,
            letterSpacing: '-0.04em',
            color:         'rgba(240,242,255,0.06)',
          }}
        >
          {phase.num}
        </span>
        <span
          style={{
            fontSize:      '10px',
            fontWeight:    500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--color-text-muted)',
            opacity:       0.50,
            paddingTop:    '6px',
          }}
        >
          {phase.duration}
        </span>
      </div>

      {/* Phase name */}
      <div
        style={{
          fontSize:      'clamp(20px, 2.4vw, 32px)',
          fontWeight:    800,
          letterSpacing: '-0.02em',
          lineHeight:    1.1,
          color:         'var(--color-text-primary)',
          marginBottom:  '14px',
        }}
      >
        {phase.name}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize:     '13px',
          lineHeight:   1.68,
          color:        'var(--color-text-secondary)',
          opacity:      0.62,
          marginBottom: '24px',
          flex:         1,
        }}
      >
        {phase.desc}
      </p>

      {/* Deliverables */}
      <div
        style={{
          display:    'flex',
          flexDirection:'column',
          gap:        '6px',
          paddingTop: '20px',
          borderTop:  '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {phase.deliverables.map((d, di) => (
          <div
            key={di}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '10px',
            }}
          >
            <span
              style={{
                width:        '4px',
                height:       '4px',
                borderRadius: '50%',
                background:   'var(--color-blue)',
                opacity:      0.50,
                flexShrink:   0,
              }}
            />
            <span
              style={{
                fontSize:      '11px',
                fontWeight:    500,
                color:         'var(--color-text-muted)',
                opacity:       0.70,
                letterSpacing: '0.02em',
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default function Process() {
  const { t } = useTranslation()
  const phaseTexts = t('process.phases', { returnObjects: true })
  const PHASES = PHASE_NUMS.map((num, i) => ({ num, ...phaseTexts[i] }))

  return (
    <section
      id="process"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '100px clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        overflow:  'hidden',
      }}
    >
      {/* Glow — top center */}
      <div
        style={{
          position:     'absolute',
          top:          '-8%',
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        '50vw',
          maxWidth:     '700px',
          height:       '50vw',
          maxHeight:    '700px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.04) 0%, transparent 65%)',
          filter:       'blur(90px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>09</span>
          <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('process.section_label')}</span>
        </motion.div>

        {/* Header */}
        <div className="grid lg:grid-cols-2" style={{ gap: '48px', marginBottom: '56px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            style={{
              fontSize:      'clamp(32px, 4.8vw, 72px)',
              fontWeight:    800,
              lineHeight:    1.04,
              letterSpacing: '-0.03em',
              color:         'var(--color-text-primary)',
            }}
          >
            {t('process.title_line1')}<br />{t('process.title_line2')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            style={{
              fontSize:   'clamp(14px, 1.5vw, 18px)',
              lineHeight: 1.72,
              color:      'var(--color-text-secondary)',
              opacity:    0.76,
              maxWidth:   '520px',
              paddingTop: '8px',
            }}
          >
            {t('process.subtitle')}
          </motion.p>
        </div>

        {/* Phase grid */}
        <div className="grid sm:grid-cols-2" style={{ gap: '16px' }}>
          {PHASES.map((phase, i) => (
            <PhaseCard key={i} phase={phase} delay={0.06 + i * 0.07} />
          ))}
        </div>

      </div>
    </section>
  )
}
