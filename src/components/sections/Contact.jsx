import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useModal } from '../../context/ModalContext'
import GlowButton from '../ui/GlowButton'
import LogoMark from '../ui/LogoMark'

/* ── Static data (no translation needed for hrefs) ─────── */

const FOOTER_NAV = [
  { href: '#experience', key: 'nav.experience'    },
  { href: '#services',   key: 'nav.services'      },
  { href: '#ai',         key: 'contact.fn_ai'     },
  { href: '#branding',   key: 'contact.fn_branding' },
  { href: '#web',        key: 'contact.fn_web'    },
  { href: '#content',    key: 'contact.fn_content' },
  { href: '#work',       key: 'contact.fn_work'   },
  { href: '#process',    key: 'nav.process'       },
  { href: '#contact',    key: 'nav.contact'       },
]

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/ilhncvn'              },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/ilhancevn'          },
  { label: 'Behance',   href: 'https://behance.net/ilhancevn'              },
  { label: 'Upwork',    href: 'https://upwork.com/freelancers/ilhancevn'   },
]

/* ── Reveal helper ──────────────────────────────────────── */

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

/* ── Footer nav link ────────────────────────────────────── */

function FooterNavLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontSize:       '10px',
        fontWeight:     600,
        letterSpacing:  '0.18em',
        textTransform:  'uppercase',
        color:          hovered ? 'rgba(240,242,255,0.75)' : 'rgba(138,144,168,0.35)',
        textDecoration: 'none',
        transition:     'color 220ms ease',
        whiteSpace:     'nowrap',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

/* ── Social link ────────────────────────────────────────── */

function SocialLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize:       '11px',
        fontWeight:     500,
        letterSpacing:  '0.06em',
        color:          hovered ? 'rgba(240,242,255,0.60)' : 'rgba(138,144,168,0.28)',
        textDecoration: 'none',
        transition:     'color 220ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

/* ── Main section ───────────────────────────────────────── */

export default function Contact() {
  const { t } = useTranslation()
  const { openModal } = useModal()

  return (
    <section
      id="contact"
      style={{
        position:  'relative',
        zIndex:    1,
        padding:   '128px clamp(20px, 5vw, 80px) 72px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        overflow:  'hidden',
      }}
    >
      {/* Central atmospheric glow */}
      <div
        style={{
          position:     'absolute',
          top:          '0%',
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        '80vw',
          maxWidth:     '1100px',
          height:       '80vw',
          maxHeight:    '1100px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(63,140,255,0.065) 0%, transparent 58%)',
          filter:       'blur(110px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      {/* Secondary warm accent glow — bottom left */}
      <div
        style={{
          position:     'absolute',
          bottom:       '10%',
          left:         '-5%',
          width:        '40vw',
          maxWidth:     '500px',
          height:       '40vw',
          maxHeight:    '500px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,107,43,0.030) 0%, transparent 65%)',
          filter:       'blur(80px)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      {/* İÇ watermark — large brand signature */}
      <div
        style={{
          position:      'absolute',
          bottom:        '-6%',
          right:         '-3%',
          pointerEvents: 'none',
          zIndex:        0,
          opacity:       0.90,
        }}
      >
        <LogoMark watermark size={780} />
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section label */}
        <Reveal delay={0}>
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '12px',
            marginBottom: '28px',
          }}>
            <span style={{
              fontSize:      '10px',
              fontWeight:    600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color:         'var(--color-text-muted)',
            }}>
              10
            </span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{
              fontSize:      '10px',
              fontWeight:    500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'var(--color-text-muted)',
            }}>
              {t('contact.section_label')}
            </span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.06} y={28}>
          <h2
            style={{
              fontSize:      'clamp(36px, 5.8vw, 92px)',
              fontWeight:    800,
              lineHeight:    1.01,
              letterSpacing: '-0.036em',
              color:         'var(--color-text-primary)',
              maxWidth:      '980px',
              marginBottom:  '22px',
            }}
          >
            {t('contact.title')}
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.12}>
          <p
            style={{
              fontSize:     'clamp(15px, 1.55vw, 20px)',
              lineHeight:   1.70,
              color:        'var(--color-text-secondary)',
              opacity:      0.66,
              maxWidth:     '500px',
              marginBottom: '14px',
            }}
          >
            {t('contact.subtitle')}
          </p>
        </Reveal>

        {/* Trust signal */}
        <Reveal delay={0.16}>
          <p
            style={{
              fontSize:      '12px',
              fontWeight:    500,
              letterSpacing: '0.05em',
              color:         'var(--color-text-muted)',
              opacity:       0.42,
              marginBottom:  '44px',
            }}
          >
            {t('contact.trust')}
          </p>
        </Reveal>

        {/* Primary CTA */}
        <Reveal delay={0.22}>
          <GlowButton variant="primary" size="lg" onClick={openModal}>
            {t('nav.cta')}
          </GlowButton>
        </Reveal>

        {/* ── Footer area ── */}
        <Reveal delay={0.32} amount={0.05}>
          <div style={{ marginTop: '100px' }}>

            {/* Thin rule */}
            <div style={{
              width:      '100%',
              height:     '1px',
              background: 'rgba(255,255,255,0.05)',
              marginBottom: '44px',
            }} />

            {/* Footer nav */}
            <nav
              aria-label="Page sections"
              style={{
                display:   'flex',
                flexWrap:  'wrap',
                gap:       'clamp(20px, 3vw, 40px)',
                marginBottom: '48px',
              }}
            >
              {FOOTER_NAV.map((item) => (
                <FooterNavLink key={item.href} href={item.href}>
                  {t(item.key)}
                </FooterNavLink>
              ))}
            </nav>

            {/* Bottom bar — social + copyright */}
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                flexWrap:       'wrap',
                gap:            '20px',
              }}
            >
              {/* Social links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
                {SOCIAL.map((s) => (
                  <SocialLink key={s.label} href={s.href}>
                    {s.label}
                  </SocialLink>
                ))}
              </div>

              {/* Brand signature + copyright */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span
                  style={{
                    fontSize:      '11px',
                    fontWeight:    800,
                    letterSpacing: '0.06em',
                    color:         'rgba(138,144,168,0.20)',
                  }}
                >
                  İÇ
                </span>
                <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.08)' }} />
                <span
                  style={{
                    fontSize:      '11px',
                    color:         'rgba(138,144,168,0.18)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t('contact.copyright')}
                </span>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  )
}
