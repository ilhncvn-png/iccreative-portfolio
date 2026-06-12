export default function SectionTag({ children, dim = false }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill"
      style={{
        background: 'rgba(63,140,255,0.08)',
        border: '1px solid rgba(63,140,255,0.20)',
        color: dim ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: dim ? 'var(--color-text-muted)' : 'var(--color-blue)' }}
      />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
    </div>
  )
}
