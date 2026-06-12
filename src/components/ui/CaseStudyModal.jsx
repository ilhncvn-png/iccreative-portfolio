import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from '../../context/ModalContext'

/* ─────────────────────────────────────────────────────────────
   ART DIRECTION — per-project, per-image presentation config
─────────────────────────────────────────────────────────────── */
const ART_DIRECTION = {
  '01': [
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'WORDMARK',
      caption:    'Primary logotype on brand blue',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'LOGO SYSTEM',
      caption:    'Primary and inverted logo variations',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'APP ICON',
      caption:    'Blue and dark app icon variants',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'PACKAGING & MERCHANDISE',
      caption:    'Brand identity applied across tote bags and delivery packaging',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'BRAND ARCHITECTURE',
      caption:    'iNeed · iNeedhome · iNeedCar — sub-brand color system',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'MOBILE APPLICATION',
      caption:    'UI direction across the iNeed app experience',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'OUTDOOR ADVERTISING',
      caption:    'Brand presence at street level — bicycle and poster campaign',
    },
  ],
  '08': [
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'BRAND IDENTITY SYSTEM',
      caption:    'Logo · Colors · Typography (Baloo 2) · Characters · Brand elements · Channel usage',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'CHARACTER UNIVERSE',
      caption:    '10 original 3D characters — Panda · Lion · Rabbit · Elephant · Fox · Giraffe · Chick · Flamingo · Lamb · Deer',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'YOUTUBE CHANNEL EXPERIENCE',
      caption:    'Channel home · Banner · Icon system · Playlist structure — desktop · tablet · mobile',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'THUMBNAIL & CONTENT SYSTEM',
      caption:    'Thumbnail templates · CTR elements · A/B variants · Shorts covers · Color system',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'VIDEO & SHORTS ECOSYSTEM',
      caption:    'Video story flow · Scene design · Song covers · Shorts feed · Intro/outro screens',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'MERCHANDISE & APP',
      caption:    'Mobile app · Stickers & cards · Apparel · Bags · Stationery · Party supplies · Room decor',
    },
  ],
  '07': [
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'BRAND IDENTITY SYSTEM',
      caption:    'Logo · App icon · Color palette · Typography · Visual elements · Brand patterns',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'YOUTUBE CHANNEL EXPERIENCE',
      caption:    'Channel home · Banner · Layout · Playlist organization · Mobile experience',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'PLAYLIST & CONTENT ARCHITECTURE',
      caption:    '6 playlist categories · Content pillars · User journey · 80+ playlists · 1.05B+ subscribers',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'CONTENT PRODUCTION & RELEASES',
      caption:    'Album art · CD & vinyl packaging · Spotify · Apple Music · YouTube Music · Seasonal collections',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'THUMBNAIL DESIGN SYSTEM',
      caption:    '15+ categories · A/B variants · Mood-coded color system · Icon library',
    },
  ],
  '06': [
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'BRAND & DESIGN SYSTEM',
      caption:    'Logo system · App icon · Color tokens · Typography · Icon library',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'PRODUCT EXPERIENCE',
      caption:    'Dashboard · Content calendar · Analytics · Mobile app · Landing page',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'MANAGEMENT ECOSYSTEM',
      caption:    'Post scheduler · AI caption generator · Social inbox · Team collaboration · Campaign management',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'RESPONSIVE ECOSYSTEM',
      caption:    'Desktop · Laptop · Tablet · Mobile — dark mode · cross-device sync · global components',
    },
  ],
  '05': [
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'BRAND & DESIGN SYSTEM',
      caption:    'Logo variations · Color palette · Typography · UI components · Design tokens',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'PLATFORM EXPERIENCE',
      caption:    'Web app and mobile interface — property search, listing and filtering',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'USER JOURNEY & FEATURES',
      caption:    'Property detail · Interactive map · Search · Dashboard · Agent contact · Booking',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'RESPONSIVE ECOSYSTEM',
      caption:    'Desktop XL · Laptop · Tablet · Mobile — consistent cross-device experience',
    },
  ],
  '03': [
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center 30%',
      label:      'BRAND IDENTITY',
      caption:    'Logo system · Grid construction · Color palette',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'STATIONERY',
      caption:    'Business card, letterhead, pen and corporate folder',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'SOCIAL MEDIA',
      caption:    'Content template system — 6 post formats',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'WEBSITE',
      caption:    'Responsive web design — desktop and mobile',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'COMPANY PROFILE',
      caption:    'Corporate presentation — 7-chapter brand document',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'ENVIRONMENTAL DESIGN',
      caption:    'Outdoor signage, reception and wayfinding system',
    },
  ],
  '04': [
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center top',
      label:      'BRAND FOUNDATION',
      caption:    'Logo system · Brand colors · Icon set · Logo variations',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'CORPORATE IDENTITY',
      caption:    'Business card · Letterhead · Folder · Stationery suite',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'SOCIAL MEDIA SYSTEM',
      caption:    '8 content template formats — marine industry social presence',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'WEBSITE EXPERIENCE',
      caption:    'Responsive web design — desktop · tablet · mobile',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'COMPANY PROFILE',
      caption:    'Corporate brochure — 6 chapter brand presentation',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'ENVIRONMENTAL BRANDING',
      caption:    'Outdoor signage · Facility branding · Wayfinding system',
    },
  ],
  '02': [
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'BRAND MARK',
      caption:    'Logo system on chargenest green',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'EMBLEM CONCEPT',
      caption:    'Letter C · Electric & Charge · Roads & Continuity',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'APP ICON',
      caption:    'Light and dark app icon variants',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'MOBILE APP — ONBOARDING',
      caption:    'Sign in, sign up, verification and booking confirmation flows',
    },
    {
      mode:       'editorial',
      layout:     'inset',
      focalPoint: 'center',
      label:      'MOBILE APP — DISCOVERY',
      caption:    'Station map, detail view and slot booking interface',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'APP MAIN DISPLAY',
      caption:    'Splash screen and icon presentation on device',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'INDUSTRIAL DESIGN — SKETCHES',
      caption:    'EV charger form factor exploration — 20+ concept directions',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'DESIGN SKETCHES',
      caption:    'Charger industrial design exploration with brand color language',
    },
    {
      mode:       'document',
      layout:     'document',
      focalPoint: 'center',
      label:      'DESIGN SKETCHES II',
      caption:    'Alternative charger form explorations with energy motifs',
    },
    {
      mode:       'cinematic',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'IN USE',
      caption:    'App in context — real-world interaction',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'ADVERTISING',
      caption:    'Brand applied to print and digital advertising formats',
    },
    {
      mode:       'editorial',
      layout:     'full-bleed',
      focalPoint: 'center',
      label:      'OUTDOOR',
      caption:    'Outdoor advertising — brand at street level',
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   Theme helper — hex accent to RGB string for rgba()
─────────────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

/* ─────────────────────────────────────────────────────────────
   AdaptiveImage — mode-based smart renderer
   Modes: cinematic | editorial | full-bleed | document | auto
─────────────────────────────────────────────────────────────── */
function AdaptiveImage({ src, alt, mode = 'editorial', focalPoint = 'center' }) {
  const [ratio, setRatio] = useState(null)

  useEffect(() => {
    if (mode !== 'auto') return
    const img = new window.Image()
    img.onload  = () => setRatio(img.naturalWidth / img.naturalHeight)
    img.onerror = () => setRatio(1.6)
    img.src = src
  }, [src, mode])

  const resolved = mode !== 'auto' ? mode
    : !ratio         ? 'editorial'
    : ratio >= 2.0   ? 'cinematic'
    : ratio >= 1.4   ? 'editorial'
    : ratio >= 0.85  ? 'editorial'
    :                  'portrait-focus'

  if (resolved === 'document') {
    return (
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        decoding="async"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    )
  }

  const heights = {
    cinematic:        'clamp(380px, 60vh, 760px)',
    editorial:        'clamp(320px, 52vh, 640px)',
    'full-bleed':     'clamp(420px, 66vh, 840px)',
    'portrait-focus': 'clamp(460px, 70vh, 860px)',
  }

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading="lazy"
      decoding="async"
      style={{
        display:        'block',
        width:          '100%',
        height:         heights[resolved] || heights.editorial,
        objectFit:      'cover',
        objectPosition: focalPoint,
        verticalAlign:  'bottom',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   ImageMeta — index label + caption beneath / beside image
─────────────────────────────────────────────────────────────── */
function ImageMeta({ index, label, caption, accentRgb }) {
  const acc = accentRgb || '110,140,45'
  return (
    <div
      style={{
        display:        'flex',
        alignItems:     'baseline',
        justifyContent: 'space-between',
        gap:            '20px',
        flexWrap:       'wrap',
        marginTop:      '14px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em',
          color: `rgba(${acc},0.65)`, textTransform: 'uppercase',
        }}>
          0{index + 1}
        </span>
        <span style={{ width: '1px', height: '9px', background: 'rgba(255,255,255,0.10)' }} />
        <span style={{
          fontSize: '9px', fontWeight: 600, letterSpacing: '0.20em',
          color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
      {caption && (
        <p style={{
          fontSize: '12px', color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.02em', maxWidth: '400px',
        }}>
          {caption}
        </p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   GalleryItem — one image in its layout treatment
─────────────────────────────────────────────────────────────── */
function GalleryItem({ src, alt, config, index, delay, accentRgb }) {
  const { mode, layout, focalPoint, label, caption } = config

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >

      {layout === 'full-bleed' && (
        <div>
          <div style={{ overflow: 'hidden' }}>
            <AdaptiveImage src={src} alt={alt} mode={mode} focalPoint={focalPoint} />
          </div>
          <div style={{ padding: '0 clamp(20px, 4vw, 60px)' }}>
            <ImageMeta index={index} label={label} caption={caption} accentRgb={accentRgb} />
          </div>
        </div>
      )}

      {layout === 'document' && (
        <div style={{ padding: '0 clamp(20px, 4vw, 60px)' }}>
          <ImageMeta index={index} label={label} caption={caption} accentRgb={accentRgb} />
          <div
            style={{
              marginTop:    '20px',
              maxWidth:     '880px',
              marginLeft:   'auto',
              marginRight:  'auto',
              background:   'rgba(8, 10, 4, 0.96)',
              borderRadius: '6px',
              overflow:     'hidden',
              border:       '1px solid rgba(255,255,255,0.06)',
              padding:      'clamp(20px, 3vh, 40px)',
            }}
          >
            <div style={{ position: 'relative', borderRadius: '3px', overflow: 'hidden' }}>
              <AdaptiveImage src={src} alt={alt} mode="document" />
            </div>
          </div>
        </div>
      )}

      {layout === 'inset' && (
        <div style={{ padding: '0 clamp(20px, 4vw, 60px)' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <AdaptiveImage src={src} alt={alt} mode={mode} focalPoint={focalPoint} />
          </div>
          <ImageMeta index={index} label={label} caption={caption} accentRgb={accentRgb} />
        </div>
      )}

    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   EditorialGallery — orchestrates the full editorial layout
─────────────────────────────────────────────────────────────── */
function EditorialGallery({ project, accentRgb }) {
  const images    = project.images || []
  const direction = ART_DIRECTION[project.id]

  const getConfig = (i) => direction?.[i] || {
    mode: 'auto', layout: 'inset', focalPoint: 'center',
    label: `FRAME 0${i + 1}`, caption: '',
  }

  if (images.length === 0) {
    return (
      <div
        style={{
          height: '360px', margin: '0 clamp(20px, 4vw, 60px)',
          borderRadius: '8px', background: 'rgba(8,10,4,0.96)',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.10)' }}>
          Gallery coming soon
        </span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
      {images.map((src, i) => (
        <GalleryItem
          key={i}
          src={src}
          alt={`${project.title} — ${getConfig(i).label}${getConfig(i).caption ? ': ' + getConfig(i).caption : ''}`}
          config={getConfig(i)}
          index={i}
          delay={i * 0.08}
          accentRgb={accentRgb}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section label
─────────────────────────────────────────────────────────────── */
function SectionLabel({ children, accentRgb }) {
  const acc = accentRgb || '110,140,45'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
      <span style={{
        fontSize: '9px', fontWeight: 600, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: `rgba(${acc},0.70)`,
      }}>
        {children}
      </span>
      <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CaseStudyModal — main component
─────────────────────────────────────────────────────────────── */
export default function CaseStudyModal() {
  const { activeCaseStudy, closeCaseStudy, openModal } = useModal()
  const scrollRef = useRef(null)
  const project   = activeCaseStudy

  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === 'Escape') closeCaseStudy() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, closeCaseStudy])

  useEffect(() => {
    if (project && scrollRef.current) scrollRef.current.scrollTop = 0
  }, [project])

  const accentRgb = project ? hexToRgb(project.accentColor || '#6E8C2D') : '110,140,45'

  const content = (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cs-bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeCaseStudy}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 590, backdropFilter: 'blur(8px)' }}
          />

          {/* Panel */}
          <motion.div
            key="cs-panel"
            ref={scrollRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeCaseStudy ? `${activeCaseStudy.title} — Case Study` : 'Case Study'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.40, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 600,
              background: '#030701', overflowY: 'auto',
              display: 'flex', flexDirection: 'column',
            }}
          >

            {/* ── Sticky header ── */}
            <div
              style={{
                position: 'sticky', top: 0, zIndex: 10,
                background: 'rgba(3,7,1,0.94)',
                backdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center',
                padding: '0 clamp(20px, 4vw, 60px)',
                height: '60px', gap: '14px',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${accentRgb},0.72)`, whiteSpace: 'nowrap' }}>
                {project.id}
              </span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {project.category}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.80)', whiteSpace: 'nowrap' }}>
                {project.title}
              </span>
              <button
                onClick={closeCaseStudy}
                aria-label="Close"
                style={{
                  marginLeft: '14px', flexShrink: 0,
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.55)', fontSize: '18px',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'all 180ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)' }}
              >
                ×
              </button>
            </div>

            {/* ── Hero ── */}
            {(() => {
              const hasCover = project.images?.length > 0
              return (
                <div
                  style={{
                    position: 'relative',
                    height:   'clamp(360px, 60vh, 740px)',
                    background: project.gradient || 'linear-gradient(160deg, rgba(74,92,35,0.38) 0%, rgba(38,52,16,0.60) 45%, rgba(3,5,1,1) 100%)',
                    overflow: 'hidden', flexShrink: 0,
                  }}
                >
                  {hasCover && (
                    <img
                      src={project.images[0]}
                      alt={`${project.title} — ${project.headline || 'case study cover'}`}
                      loading="eager"
                      decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: hasCover
                        ? 'linear-gradient(0deg, rgba(3,5,1,0.97) 0%, rgba(3,5,1,0.55) 36%, rgba(3,5,1,0.10) 68%, transparent 100%)'
                        : 'transparent',
                      pointerEvents: 'none',
                    }}
                  />
                  {!hasCover && (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                  )}

                  {/* Headline */}
                  <div style={{ position: 'absolute', bottom: 'clamp(28px, 5vh, 56px)', left: 'clamp(24px, 4vw, 60px)', right: 'clamp(24px, 4vw, 60px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: `rgba(${accentRgb},0.90)` }}>
                        {project.id}
                      </span>
                      <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.22)' }} />
                      <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)' }}>
                        {project.category}
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.10em' }}>
                        {project.year}
                      </span>
                    </div>
                    <h2 style={{
                      fontSize: 'clamp(26px, 4.2vw, 64px)',
                      fontWeight: 800, lineHeight: 1.04,
                      letterSpacing: '-0.032em',
                      color: 'rgba(240,245,219,0.97)',
                      maxWidth: '820px',
                      textShadow: '0 4px 32px rgba(0,0,0,0.55)',
                    }}>
                      {project.headline || project.title}
                    </h2>
                  </div>
                </div>
              )
            })()}

            {/* ── Body: Overview + Deliverables + Challenge + Solution ── */}
            <div
              style={{
                maxWidth: '1160px', margin: '0 auto', width: '100%',
                padding: 'clamp(52px, 7vh, 96px) clamp(20px, 4vw, 60px)',
              }}
            >
              <div className="grid md:grid-cols-2" style={{ gap: 'clamp(28px, 5vw, 80px)', marginBottom: 'clamp(56px, 8vh, 100px)' }}>
                <div>
                  <SectionLabel accentRgb={accentRgb}>Overview</SectionLabel>
                  <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.80, color: 'rgba(240,242,255,0.58)' }}>
                    {project.overview}
                  </p>
                </div>
                <div>
                  <SectionLabel accentRgb={accentRgb}>Deliverables</SectionLabel>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(project.deliverables || []).map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(240,242,255,0.44)' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: `rgba(${accentRgb},0.55)`, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: 'clamp(56px, 8vh, 100px)' }} />

              <div className="grid md:grid-cols-2" style={{ gap: 'clamp(28px, 5vw, 80px)' }}>
                <div>
                  <SectionLabel accentRgb={accentRgb}>Challenge</SectionLabel>
                  <p style={{ fontSize: 'clamp(14px, 1.28vw, 17px)', lineHeight: 1.80, color: 'rgba(240,242,255,0.48)' }}>
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <SectionLabel accentRgb={accentRgb}>Solution</SectionLabel>
                  <p style={{ fontSize: 'clamp(14px, 1.28vw, 17px)', lineHeight: 1.80, color: 'rgba(240,242,255,0.48)' }}>
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Gallery ── */}
            {project.images?.length > 0 && (
              <div style={{ width: '100%', paddingBottom: 'clamp(80px, 10vh, 130px)' }}>
                <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)', marginBottom: 'clamp(36px, 5vh, 60px)' }}>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: 'clamp(36px, 5vh, 60px)' }} />
                  <SectionLabel accentRgb={accentRgb}>Gallery</SectionLabel>
                </div>
                <EditorialGallery project={project} accentRgb={accentRgb} />
              </div>
            )}

            {/* ── CTA footer ── */}
            <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', padding: 'clamp(48px, 6vh, 80px) clamp(20px, 4vw, 60px)', background: 'rgba(3,7,1,0.55)' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.16)', marginBottom: '26px' }}>
                Ready to start your own project?
              </p>
              <button
                onClick={() => { closeCaseStudy(); setTimeout(openModal, 140) }}
                style={{
                  padding: '14px 38px',
                  background: `rgba(${accentRgb},0.12)`,
                  border: `1px solid rgba(${accentRgb},0.28)`,
                  borderRadius: '100px',
                  color: `rgba(${accentRgb},0.80)`,
                  fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${accentRgb},0.22)`; e.currentTarget.style.borderColor = `rgba(${accentRgb},0.52)` }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${accentRgb},0.12)`; e.currentTarget.style.borderColor = `rgba(${accentRgb},0.28)` }}
              >
                Start a Project
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(content, document.body)
}
