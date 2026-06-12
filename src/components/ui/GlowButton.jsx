import { useState } from 'react'

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
}) {
  const [pressed, setPressed] = useState(false)

  const sizes = {
    sm: { height: '40px', padding: '0 20px', fontSize: '13px' },
    md: { height: '52px', padding: '0 32px', fontSize: '14px' },
    lg: { height: '60px', padding: '0 40px', fontSize: '16px' },
  }

  const s = sizes[size]

  const styles = {
    primary: {
      default: {
        background: 'linear-gradient(135deg, #FF6B2B 0%, #FF8C42 100%)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 0 20px rgba(255,107,43,0.20)',
      },
      hover: {
        boxShadow: '0 0 48px rgba(255,107,43,0.55), 0 8px 24px rgba(255,107,43,0.25)',
        transform: 'translateY(-2px)',
      },
      active: {
        transform: 'translateY(0) scale(0.98)',
        boxShadow: '0 0 24px rgba(255,107,43,0.30)',
      },
    },
    secondary: {
      default: {
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        border: '1px solid rgba(255,255,255,0.18)',
      },
      hover: {
        background: 'rgba(255,255,255,0.06)',
        color: 'var(--color-text-primary)',
        borderColor: 'rgba(255,255,255,0.38)',
        transform: 'translateY(-2px)',
      },
      active: {
        transform: 'translateY(0) scale(0.98)',
      },
    },
    ghost: {
      default: {
        background: 'transparent',
        color: 'var(--color-blue-hi)',
        border: 'none',
        padding: '0 4px',
      },
      hover: {
        color: '#fff',
      },
      active: {},
    },
  }

  const v = styles[variant] ?? styles.secondary
  const [hovered, setHovered] = useState(false)

  const currentStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 600,
    fontFamily: 'inherit',
    borderRadius: variant === 'ghost' ? '0' : '14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'all 240ms var(--ease-expo-out)',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
    ...v.default,
    ...(hovered && !disabled ? v.hover : {}),
    ...(pressed && !disabled ? v.active : {}),
  }

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={currentStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </Tag>
  )
}
