import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useModal } from '../../context/ModalContext'

/* ─── Visual-only project props (no translation needed) ─── */
const PROJECT_VISUAL = [
  // Featured card — iNeed (span/height unused in FeaturedCard)
  { id: '01', year: '2023', gradient: 'linear-gradient(145deg, rgba(15,50,180,0.22) 0%, rgba(6,20,80,0.30) 55%, rgba(1,3,16,0.92) 100%)',    accent: 'rgba(30,100,255,0.22)',  letter: 'N', accentColor: '#1E64FF' },
  // Row 1 — 3+3
  { id: '02', year: '2022', gradient: 'linear-gradient(145deg, rgba(20,130,60,0.22) 0%, rgba(8,55,25,0.30) 55%, rgba(1,8,4,0.92) 100%)',     accent: 'rgba(61,220,132,0.22)', letter: 'C', span: 'col-span-6 md:col-span-3', height: '300px', accentColor: '#3DDC84' },
  { id: '03', year: '2024', gradient: 'linear-gradient(145deg, rgba(22,48,192,0.22) 0%, rgba(8,18,80,0.30) 55%, rgba(1,2,14,0.92) 100%)',    accent: 'rgba(34,85,255,0.22)',   letter: 'E', span: 'col-span-6 md:col-span-3', height: '300px', accentColor: '#2255FF' },
  // Row 2 — 2+2+2
  { id: '04', year: '2023', gradient: 'linear-gradient(145deg, rgba(185,60,15,0.22) 0%, rgba(80,26,6,0.30) 55%, rgba(14,5,1,0.92) 100%)',    accent: 'rgba(255,97,32,0.22)',   letter: 'C', span: 'col-span-6 md:col-span-2', height: '260px', accentColor: '#FF6120' },
  { id: '05', year: '2024', gradient: 'linear-gradient(145deg, rgba(0,116,241,0.22) 0%, rgba(0,48,110,0.30) 55%, rgba(0,4,18,0.92) 100%)',    accent: 'rgba(0,116,241,0.22)',   letter: 'H', span: 'col-span-6 md:col-span-2', height: '260px', accentColor: '#0074F1' },
  { id: '06', year: '2024', gradient: 'linear-gradient(145deg, rgba(108,92,231,0.26) 0%, rgba(48,36,115,0.32) 55%, rgba(8,5,22,0.94) 100%)',  accent: 'rgba(136,92,246,0.24)', letter: 'D', span: 'col-span-6 md:col-span-2', height: '260px', accentColor: '#6C5CE7' },
  // Row 3 — 3+3 (both YouTube channels)
  { id: '07', year: '2024', gradient: 'linear-gradient(145deg, rgba(72,48,122,0.28) 0%, rgba(30,20,62,0.36) 55%, rgba(4,2,16,0.96) 100%)',   accent: 'rgba(108,82,224,0.22)', letter: 'B', span: 'col-span-6 md:col-span-3', height: '300px', accentColor: '#6C52E0' },
  { id: '08', year: '2024', gradient: 'linear-gradient(145deg, rgba(255,91,193,0.20) 0%, rgba(100,45,155,0.28) 55%, rgba(14,4,18,0.94) 100%)', accent: 'rgba(255,91,193,0.22)', letter: 'M', span: 'col-span-6 md:col-span-3', height: '300px', accentColor: '#FF5BC1' },
]

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

/* ─── Visual placeholder area (right panel of featured / full bg of grid cards) ─── */
function VisualArea({ project, style, visualComingLabel, loading = 'lazy', fetchpriority = 'auto' }) {
  const coverImage = project.images && project.images.length > 0 ? project.images[0] : null

  return (
    <div
      style={{
        position:   'relative',
        overflow:   'hidden',
        background: project.gradient,
        ...style,
      }}
    >
      {/* Real cover image */}
      {coverImage && (
        <img
          src={coverImage}
          alt={`${project.title} — portfolio cover image`}
          loading={loading}
          decoding="async"
          fetchpriority={fetchpriority}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            objectPosition: 'center',
          }}
        />
      )}

      {/* Subtle dark vignette over image to keep text legible */}
      {coverImage && (
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(90deg, rgba(3,5,1,0.55) 0%, rgba(3,5,1,0.10) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Dot texture (only shown without image) */}
      {!coverImage && (
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize:  '22px 22px',
            pointerEvents:   'none',
          }}
        />
      )}
      {/* Accent glow (only shown without image) */}
      {!coverImage && (
        <div
          style={{
            position:     'absolute',
            top:          '50%',
            left:         '50%',
            transform:    'translate(-50%, -50%)',
            width:        '60%',
            height:       '60%',
            borderRadius: '50%',
            background:   `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
            filter:       'blur(32px)',
            pointerEvents:'none',
          }}
        />
      )}
      {/* Large brand letter (only shown without image) */}
      {!coverImage && (
        <div
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            fontSize:   '220px',
            fontWeight: 900,
            lineHeight: 1,
            color:      'rgba(255,255,255,0.038)',
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.04em',
          }}
        >
          {project.letter}
        </div>
      )}
      {/* Image hint (only shown without image) */}
      {!coverImage && (
        <div
          style={{
            position:      'absolute',
            bottom:        '14px',
            right:         '16px',
            fontSize:      '9px',
            fontWeight:    500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.15)',
          }}
        >
          {visualComingLabel}
        </div>
      )}
    </div>
  )
}

/* ─── Featured card — horizontal editorial split ─── */
function FeaturedCard({ project, caseStudyCta, visualComingLabel, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const [hovered, setHovered] = useState(false)
  const accentRgb = hexToRgb(project.accentColor || '#3F8CFF')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        border:       `1px solid ${hovered ? `rgba(${accentRgb},0.32)` : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '20px',
        overflow:     'hidden',
        background:   'rgba(7,11,22,0.90)',
        transition:   'border-color 300ms ease, box-shadow 300ms ease',
        cursor:       'pointer',
        boxShadow:    hovered ? `0 0 48px rgba(${accentRgb},0.10)` : 'none',
      }}
    >
      <div className="grid md:grid-cols-2" style={{ minHeight: '440px' }}>

        {/* Text panel */}
        <div
          style={{
            padding:       'clamp(28px, 4vw, 52px)',
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'space-between',
            gap:           '24px',
          }}
        >
          {/* Top meta */}
          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '12px',
              flexWrap:   'wrap',
            }}
          >
            <span
              style={{
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '0.22em',
                color:         'var(--color-text-muted)',
              }}
            >
              {project.id}
            </span>
            <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.12)' }} />
            <span
              style={{
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--color-blue)',
                opacity:       0.72,
              }}
            >
              {project.category}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--color-text-muted)', opacity: 0.40 }}>{project.year}</span>
          </div>

          {/* Title + impact */}
          <div>
            <h3
              style={{
                fontSize:      'clamp(28px, 4vw, 60px)',
                fontWeight:    800,
                letterSpacing: '-0.03em',
                lineHeight:    1.06,
                color:         'var(--color-text-primary)',
                marginBottom:  '18px',
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize:   'clamp(13px, 1.4vw, 16px)',
                lineHeight: 1.68,
                color:      'var(--color-text-secondary)',
                opacity:    0.68,
                maxWidth:   '420px',
              }}
            >
              {project.impact}
            </p>
          </div>

          {/* Tools + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tools.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize:      '10px',
                    fontWeight:    500,
                    letterSpacing: '0.04em',
                    color:         'var(--color-text-muted)',
                    padding:       '4px 10px',
                    border:        '1px solid rgba(255,255,255,0.08)',
                    borderRadius:  '100px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <motion.span
              animate={{ opacity: hovered ? 1 : 0.35 }}
              style={{
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color:         'var(--color-blue)',
                whiteSpace:    'nowrap',
              }}
            >
              {caseStudyCta}
            </motion.span>
          </div>
        </div>

        {/* Visual panel — LCP candidate, load eagerly with high priority */}
        <VisualArea
          project={project}
          style={{ minHeight: '240px' }}
          visualComingLabel={visualComingLabel}
          loading="eager"
          fetchpriority="high"
        />

      </div>
    </motion.div>
  )
}

/* ─── Grid card ─── */
function GridCard({ project, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={project.span}
      style={{
        position:     'relative',
        borderRadius: '16px',
        overflow:     'hidden',
        height:       project.height || '260px',
        border:       `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        background:   project.gradient,
        cursor:       onClick ? 'pointer' : 'default',
        transition:   'border-color 280ms ease',
      }}
    >
      {/* Dot texture */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize:  '20px 20px',
          pointerEvents:   'none',
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position:     'absolute',
          top:          '30%',
          right:        '-10%',
          width:        '55%',
          height:       '55%',
          borderRadius: '50%',
          background:   `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
          filter:       'blur(28px)',
          pointerEvents:'none',
        }}
      />

      {/* Brand letter */}
      <div
        style={{
          position:   'absolute',
          top:        '50%',
          right:      '-8px',
          transform:  'translateY(-50%)',
          fontSize:   '160px',
          fontWeight: 900,
          lineHeight: 1,
          color:      'rgba(255,255,255,0.032)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        {project.letter}
      </div>

      {/* Bottom overlay + content */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(0deg, rgba(2,2,16,0.96) 0%, rgba(2,2,16,0.55) 45%, transparent 100%)',
          padding:    '20px 24px',
          display:    'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap:        '8px',
        }}
      >
        {/* Category + year */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize:      '9px',
              fontWeight:    600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--color-blue)',
              opacity:       0.65,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize:      'clamp(16px, 2vw, 24px)',
            fontWeight:    800,
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
            color:         'var(--color-text-primary)',
          }}
        >
          {project.title}
        </h3>

        {/* Hover: impact + tools + number */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.28 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <p
            style={{
              fontSize:   '12px',
              lineHeight: 1.58,
              color:      'var(--color-text-secondary)',
              opacity:    0.62,
              maxWidth:   '380px',
            }}
          >
            {project.impact}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {project.tools.slice(0, 3).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize:      '9px',
                    fontWeight:    500,
                    letterSpacing: '0.05em',
                    color:         'var(--color-text-muted)',
                    padding:       '3px 8px',
                    border:        '1px solid rgba(255,255,255,0.08)',
                    borderRadius:  '100px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              style={{
                fontSize:      '9px',
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--color-blue)',
                opacity:       0.70,
              }}
            >
              {project.id} →
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

/* ─── Section ─── */
export default function Work() {
  const { t } = useTranslation()
  const { openCaseStudy } = useModal()
  const projectTexts = t('work.projects', { returnObjects: true })
  const PROJECTS = PROJECT_VISUAL.map((vis, i) => ({ ...vis, ...projectTexts[i] }))
  const [featured, ...grid] = PROJECTS
  const caseStudyCta    = t('work.case_study_cta')
  const visualComingLabel = t('work.visual_coming')

  return (
    <section
      id="work"
      aria-label="Selected Work — Brand Identity & Design Portfolio"
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
          right:         '-1%',
          top:           '2%',
          fontSize:      'clamp(140px, 20vw, 320px)',
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
        08
      </div>

      {/* Glow — top left */}
      <div
        style={{
          position:     'absolute',
          top:          '-4%',
          left:         '-4%',
          width:        '44vw',
          maxWidth:     '600px',
          height:       '44vw',
          maxHeight:    '600px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.04) 0%, transparent 65%)',
          filter:       'blur(80px)',
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
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>08</span>
          <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{t('work.section_label')}</span>
        </motion.div>

        {/* Header */}
        <div className="grid lg:grid-cols-2" style={{ gap: '48px', marginBottom: '40px' }}>
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
            {t('work.title_line1')}<br />{t('work.title_line2')}
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
            {t('work.subtitle')}
          </motion.p>
        </div>

        {/* Featured */}
        <div style={{ marginBottom: '14px' }}>
          <FeaturedCard
            project={featured}
            caseStudyCta={caseStudyCta}
            visualComingLabel={visualComingLabel}
            onClick={() => openCaseStudy(featured)}
          />
        </div>

        {/* Project grid — 6-column base */}
        <div className="grid grid-cols-6" style={{ gap: '14px' }}>
          {grid.map((p) => (
            <GridCard
              key={p.id}
              project={p}
              onClick={p.images?.length > 0 ? () => openCaseStudy(p) : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
