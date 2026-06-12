import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useModal }  from '../../context/ModalContext'
import GlowButton    from '../ui/GlowButton'
import LogoMark      from '../ui/LogoMark'
import LangSwitcher  from '../ui/LangSwitcher'

const overlayVariants = {
  hidden:  { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: '0%',
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
}

const linkVariants = {
  hidden:  { opacity: 0, x: 32 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.055, duration: 0.40, ease: [0.16, 1, 0.3, 1] },
  }),
}

function NavLink({ href, children, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative"
      style={{
        fontSize:    '14px',
        fontWeight:  500,
        color:       hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        letterSpacing: '0.01em',
        transition:  'color 160ms var(--ease-smooth)',
        paddingBottom: '2px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        '1px',
          background:    'var(--color-blue)',
          transformOrigin: 'left center',
          transform:     hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition:    'transform 200ms var(--ease-expo-out)',
        }}
      />
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation()
  const { openModal } = useModal()

  const NAV_LINKS = [
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.services'),   href: '#services'   },
    { label: t('nav.work'),       href: '#work'        },
    { label: t('nav.process'),    href: '#process'     },
    { label: t('nav.contact'),    href: '#contact'     },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Main header bar ── */}
      <header
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     100,
          height:     '72px',
          display:    'flex',
          alignItems: 'center',
          padding:    '0 clamp(20px, 5vw, 80px)',
          transition: 'background 600ms var(--ease-smooth), border-color 600ms var(--ease-smooth)',
          ...(scrolled
            ? {
                background:          'rgba(2,2,16,0.82)',
                backdropFilter:      'blur(24px) saturate(140%)',
                WebkitBackdropFilter:'blur(24px) saturate(140%)',
                borderBottom:        '1px solid rgba(255,255,255,0.06)',
              }
            : {
                background:          'transparent',
                backdropFilter:      'none',
                borderBottom:        '1px solid transparent',
              }),
        }}
      >
        {/* Logo — fades in on scroll */}
        <a
          href="#hero"
          style={{
            display:        'inline-flex',
            marginRight:    'auto',
            textDecoration: 'none',
            opacity:        scrolled ? 1 : 0,
            transform:      scrolled ? 'translateY(0px)' : 'translateY(-6px)',
            pointerEvents:  scrolled ? 'auto' : 'none',
            transition:     'opacity 480ms var(--ease-smooth), transform 480ms var(--ease-smooth)',
          }}
        >
          <LogoMark size={48} />
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right group: LangSwitcher + CTA */}
        <div className="hidden lg:flex items-center ml-10" style={{ gap: '20px' }}>
          <LangSwitcher />
          <GlowButton variant="secondary" size="sm" onClick={openModal}>
            {t('nav.cta')}
          </GlowButton>
        </div>

        {/* Mobile: LangSwitcher + hamburger */}
        <div className="lg:hidden flex items-center" style={{ gap: '16px' }}>
          <LangSwitcher />
          <button
            className="flex flex-col justify-center items-end gap-1.5 w-10 h-10"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ padding: '4px' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display:      'block',
                  height:       '1.5px',
                  borderRadius: '2px',
                  background:   'var(--color-text-primary)',
                  transition:   'all 280ms var(--ease-expo-out)',
                  ...(menuOpen
                    ? {
                        width:     i === 1 ? '0px' : '24px',
                        transform: i === 0 ? 'translateY(6.5px) rotate(45deg)'
                                 : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                                 : 'none',
                        opacity: i === 1 ? 0 : 1,
                      }
                    : {
                        width:     i === 1 ? '16px' : '24px',
                        transform: 'none',
                        opacity:   1,
                      }),
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position:       'fixed',
              inset:          0,
              zIndex:         99,
              background:     'rgba(2,2,16,0.97)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              alignItems:     'flex-start',
              padding:        '0 clamp(24px, 8vw, 60px)',
              gap:            '0',
            }}
          >
            {/* Logo in overlay */}
            <div
              style={{
                position:    'absolute',
                top:         '0',
                left:        '0',
                right:       '0',
                height:      '72px',
                display:     'flex',
                alignItems:  'center',
                padding:     '0 clamp(20px, 5vw, 80px)',
                borderBottom:'1px solid rgba(255,255,255,0.06)',
              }}
            >
              <LogoMark size={36} hoverable={false} />
            </div>

            {/* Nav links */}
            <nav
              style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={closeMenu}
                  style={{
                    fontSize:     'clamp(32px, 6vw, 52px)',
                    fontWeight:   700,
                    letterSpacing:'-0.02em',
                    color:        'var(--color-text-secondary)',
                    paddingTop:   '10px',
                    paddingBottom:'10px',
                    display:      'block',
                    transition:   'color 160ms var(--ease-smooth)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA row */}
            <motion.div
              variants={linkVariants}
              custom={NAV_LINKS.length}
              initial="hidden"
              animate="visible"
              style={{ marginTop: '40px', width: '100%' }}
            >
              <GlowButton
                variant="primary"
                onClick={() => { closeMenu(); openModal() }}
                className="w-full"
              >
                {t('nav.cta')}
              </GlowButton>
            </motion.div>

            {/* Social row */}
            <motion.div
              variants={linkVariants}
              custom={NAV_LINKS.length + 1}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', gap: '20px', marginTop: '24px' }}
            >
              {['Instagram', 'Behance', 'LinkedIn', 'Upwork'].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize:      '12px',
                    fontWeight:    500,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color:         'var(--color-text-muted)',
                    cursor:        'pointer',
                    transition:    'color 160ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
