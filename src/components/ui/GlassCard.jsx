import { useState } from 'react'

export default function GlassCard({
  children,
  className = '',
  level = 2,
  hoverable = true,
  accentColor = 'rgba(63,140,255,0.40)',
  style = {},
  onClick,
}) {
  const [hovered, setHovered] = useState(false)

  const fills = {
    1: 'rgba(255,255,255,0.03)',
    2: 'rgba(255,255,255,0.06)',
    3: 'rgba(255,255,255,0.09)',
  }

  const blurs = {
    1: 'none',
    2: 'blur(20px)',
    3: 'blur(28px)',
  }

  const base = fills[level] ?? fills[2]
  const hoverFill = fills[Math.min(level + 1, 3)]

  return (
    <div
      className={`relative overflow-hidden rounded-card ${className}`}
      style={{
        background: hoverable && hovered ? hoverFill : base,
        border: `1px solid ${hoverable && hovered ? 'rgba(255,255,255,0.18)' : 'var(--glass-border)'}`,
        backdropFilter: blurs[level],
        WebkitBackdropFilter: blurs[level],
        boxShadow: hoverable && hovered
          ? `0 8px 32px rgba(0,0,0,0.40), 0 0 60px ${accentColor.replace('0.40', '0.10')}`
          : '0 4px 16px rgba(0,0,0,0.30)',
        transform: hoverable && hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 300ms var(--ease-expo-out)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      onClick={onClick}
    >
      {/* Specular edge highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, transparent 15%, rgba(255,255,255,0.22) 50%, transparent 85%, transparent 100%)',
          opacity: hoverable && hovered ? 1 : 0.5,
          transition: 'opacity 300ms var(--ease-smooth)',
        }}
      />
      {children}
    </div>
  )
}
