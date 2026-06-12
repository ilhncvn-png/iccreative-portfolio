import { useTranslation } from 'react-i18next'

export default function LangSwitcher() {
  const { i18n } = useTranslation()
  const active = (i18n.language || 'en').substring(0, 2)

  const handleChange = (lang) => {
    i18n.changeLanguage(lang)
    try { localStorage.setItem('ic_lang', lang) } catch {}
    document.documentElement.lang = lang
  }

  return (
    <div
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '1px',
        userSelect: 'none',
      }}
    >
      {['en', 'tr'].map((lang, idx) => (
        <span key={lang} style={{ display: 'flex', alignItems: 'center' }}>
          {idx > 0 && (
            <span
              style={{
                color:    'rgba(255,255,255,0.14)',
                fontSize: '9px',
                margin:   '0 2px',
                lineHeight: 1,
              }}
            >
              |
            </span>
          )}
          <button
            onClick={() => handleChange(lang)}
            style={{
              fontSize:      '10px',
              fontWeight:    active === lang ? 700 : 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         active === lang ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              opacity:       active === lang ? 1 : 0.48,
              padding:       '4px 5px',
              background:    'none',
              border:        'none',
              cursor:        active === lang ? 'default' : 'pointer',
              transition:    'color 200ms ease, opacity 200ms ease',
              fontFamily:    'inherit',
            }}
            onMouseEnter={(e) => {
              if (active !== lang) e.currentTarget.style.opacity = '0.80'
            }}
            onMouseLeave={(e) => {
              if (active !== lang) e.currentTarget.style.opacity = '0.48'
            }}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
