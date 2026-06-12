import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useModal } from '../../context/ModalContext'
import LogoMark from './LogoMark'

/* ── Animation variants ─────────────────────────────────── */

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28 } },
  exit:    { opacity: 0, transition: { duration: 0.24 } },
}

const panelVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.40, ease: [0.16, 1, 0.3, 1], delay: 0.04 },
  },
  exit: {
    opacity: 0, y: 12, scale: 0.97,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
}

/* ── Shared input base style ────────────────────────────── */

const inputBase = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '10px',
  color: '#F0F2FF',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Space Grotesk, sans-serif',
  transition: 'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
}

/* ── Sub-components ─────────────────────────────────────── */

function Field({ label, required, error, children }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: error ? 'rgba(255,100,80,0.90)' : 'rgba(138,144,168,0.65)',
        marginBottom: '7px',
      }}>
        {label}
        {required && (
          <span style={{ color: 'rgba(63,140,255,0.75)', marginLeft: '3px' }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <p style={{
          marginTop: '5px',
          fontSize: '11px',
          color: 'rgba(255,100,80,0.75)',
          letterSpacing: '0.01em',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

function TextInput({ type = 'text', value, onChange, placeholder, error, inputRef }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        ...inputBase,
        borderColor: focused
          ? 'rgba(63,140,255,0.50)'
          : error ? 'rgba(255,100,80,0.45)' : 'rgba(255,255,255,0.10)',
        boxShadow: focused ? '0 0 0 3px rgba(63,140,255,0.09)' : 'none',
        background: error && !focused ? 'rgba(255,80,60,0.04)' : 'rgba(255,255,255,0.04)',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function Textarea({ value, onChange, placeholder, error, rows = 4 }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        ...inputBase,
        resize: 'vertical',
        lineHeight: 1.65,
        minHeight: `${rows * 26 + 22}px`,
        borderColor: focused
          ? 'rgba(63,140,255,0.50)'
          : error ? 'rgba(255,100,80,0.45)' : 'rgba(255,255,255,0.10)',
        boxShadow: focused ? '0 0 0 3px rgba(63,140,255,0.09)' : 'none',
        background: error && !focused ? 'rgba(255,80,60,0.04)' : 'rgba(255,255,255,0.04)',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function SelectField({ value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={onChange}
        style={{
          ...inputBase,
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
          paddingRight: '36px',
          color: value ? '#F0F2FF' : 'rgba(138,144,168,0.45)',
          borderColor: focused ? 'rgba(63,140,255,0.50)' : 'rgba(255,255,255,0.10)',
          boxShadow: focused ? '0 0 0 3px rgba(63,140,255,0.09)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="" disabled style={{ background: '#060a1a', color: '#8A90A8' }}>
          {placeholder}
        </option>
        {options.map((opt, i) => (
          <option key={i} value={opt} style={{ background: '#060a1a', color: '#F0F2FF' }}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        width="12" height="7" viewBox="0 0 12 7" fill="none"
        style={{
          position: 'absolute', right: '13px', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          color: 'rgba(138,144,168,0.45)',
        }}
      >
        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function ServiceCheckbox({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      padding: '9px 14px',
      background: checked ? 'rgba(63,140,255,0.07)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${checked ? 'rgba(63,140,255,0.24)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: '10px',
      transition: 'all 180ms ease',
      userSelect: 'none',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <span style={{
        width: '15px', height: '15px',
        borderRadius: '4px',
        border: `1.5px solid ${checked ? 'rgba(63,140,255,0.75)' : 'rgba(255,255,255,0.18)'}`,
        background: checked ? 'rgba(63,140,255,0.22)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 180ms ease',
      }}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3L3.5 5.5L8 1" stroke="#3F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{
        fontSize: '13px',
        color: checked ? '#F0F2FF' : 'rgba(138,144,168,0.80)',
        letterSpacing: '-0.005em',
        transition: 'color 180ms ease',
      }}>
        {label}
      </span>
    </label>
  )
}

function Divider() {
  return (
    <div style={{
      height: '1px',
      background: 'rgba(255,255,255,0.06)',
      margin: '6px 0',
    }} />
  )
}

function SectionLabel({ text }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '18px',
    }}>
      <div style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.10)' }} />
      <span style={{
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(138,144,168,0.42)',
      }}>
        {text}
      </span>
    </div>
  )
}

/* ── Main component ─────────────────────────────────────── */

const INITIAL = {
  name: '', company: '', email: '', phone: '',
  website: '', location: '', services: [],
  brandDesc: '', goal: '', budget: '', timeline: '',
  references: '', successCriteria: '',
}

export default function ProjectModal() {
  const { isOpen, closeModal } = useModal()
  const { t, i18n } = useTranslation()
  const panelRef    = useRef(null)
  const firstInput  = useRef(null)

  const [form,       setForm]       = useState(INITIAL)
  const [errors,     setErrors]     = useState({})
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const serviceOptions  = t('form.services',  { returnObjects: true })
  const goalOptions     = t('form.goals',     { returnObjects: true })
  const budgetOptions   = t('form.budgets',   { returnObjects: true })
  const timelineOptions = t('form.timelines', { returnObjects: true })

  /* ESC key + body scroll lock */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  /* Focus trap */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll(
      'input:not([style*="display: none"]), textarea, select, button, a[href]'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    const trap = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', trap)
    setTimeout(() => firstInput.current?.focus(), 80)
    return () => document.removeEventListener('keydown', trap)
  }, [isOpen])

  /* Reset form after close animation completes */
  useEffect(() => {
    if (!isOpen) {
      const tid = setTimeout(() => {
        setForm(INITIAL)
        setErrors({})
        setSubmitted(false)
        setSubmitting(false)
      }, 420)
      return () => clearTimeout(tid)
    }
  }, [isOpen])

  const setField = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const toggleService = (svc) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(svc)
        ? f.services.filter(s => s !== svc)
        : [...f.services, svc],
    }))
    setErrors(e => ({ ...e, services: undefined }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = t('form.err_required')
    if (!form.company.trim()) errs.company = t('form.err_required')
    if (!form.email.trim() && !form.phone.trim()) {
      errs.email = t('form.err_contact')
      errs.phone = t('form.err_contact')
    } else if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t('form.err_email')
    }
    if (!Array.isArray(form.services) || form.services.length === 0)
      errs.services = t('form.err_services')
    if (!form.brandDesc.trim()) errs.brandDesc = t('form.err_required')
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      // Scroll to first error field
      panelRef.current?.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitting(true)

    const payload = {
      name:            form.name,
      company:         form.company,
      email:           form.email,
      phone:           form.phone,
      website:         form.website,
      location:        form.location,
      services:        form.services,
      brandDescription: form.brandDesc,
      goal:            form.goal,
      budget:          form.budget,
      timeline:        form.timeline,
      references:      form.references,
      successCriteria: form.successCriteria,
      language:        i18n.language || 'en',
      submittedAt:     new Date().toISOString(),
    }

    console.log('[İÇ Project Brief]', payload)

    /*
     * Future integrations — replace console.log with one of:
     *
     * EmailJS:
     *   await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', payload, 'PUBLIC_KEY')
     *
     * Formspree:
     *   await fetch('https://formspree.io/f/YOUR_ID', {
     *     method: 'POST', headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(payload),
     *   })
     *
     * Custom API / CRM / Google Sheets webhook:
     *   await fetch('/api/project-brief', {
     *     method: 'POST', headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(payload),
     *   })
     */

    await new Promise(r => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(2,2,16,0.86)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(20px, 4vw, 44px) clamp(16px, 3vw, 32px)',
          }}
          onClick={closeModal}
        >
          <motion.div
            key="modal-panel"
            ref={panelRef}
            variants={panelVariants}
            style={{
              width: '100%',
              maxWidth: '860px',
              alignSelf: 'flex-start',
              position: 'relative',
              background: 'rgba(4,6,20,0.98)',
              backdropFilter: 'blur(52px) saturate(120%)',
              WebkitBackdropFilter: 'blur(52px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Chromatic glow — top-left */}
            <div style={{
              position: 'absolute', top: '-18%', left: '-8%',
              width: '55%', paddingBottom: '55%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(63,140,255,0.09) 0%, transparent 65%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Chromatic glow — bottom-right */}
            <div style={{
              position: 'absolute', bottom: '-10%', right: '-6%',
              width: '42%', paddingBottom: '42%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(100,70,255,0.06) 0%, transparent 65%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* İÇ watermark */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: 0.022,
              zIndex: 0,
              mixBlendMode: 'screen',
            }}>
              <LogoMark watermark size={380} />
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '18px', right: '18px',
                width: '36px', height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(138,144,168,0.65)',
                zIndex: 10,
                transition: 'background 180ms ease, color 180ms ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
                e.currentTarget.style.color = '#F0F2FF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = 'rgba(138,144,168,0.65)'
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Content area */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: 'clamp(28px, 5vw, 52px)',
            }}>
              <AnimatePresence mode="wait">

                {/* ── Success state ── */}
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } }}
                    style={{ textAlign: 'center', padding: '56px 0 40px' }}
                  >
                    <div style={{
                      width: '68px', height: '68px',
                      borderRadius: '50%',
                      background: 'rgba(63,140,255,0.10)',
                      border: '1px solid rgba(63,140,255,0.28)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 28px',
                    }}>
                      <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
                        <path d="M2 11L10 19L28 2" stroke="#3F8CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 style={{
                      fontSize: 'clamp(32px, 5vw, 52px)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: '#F0F2FF',
                      marginBottom: '14px',
                      lineHeight: 1.1,
                    }}>
                      {t('form.done_title')}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(14px, 1.5vw, 17px)',
                      lineHeight: 1.68,
                      color: '#8A90A8',
                      maxWidth: '420px',
                      margin: '0 auto 10px',
                      opacity: 0.82,
                    }}>
                      {t('form.done_msg')}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      color: '#3D4258',
                      marginBottom: '36px',
                    }}>
                      {t('form.done_time')}
                    </p>
                    <button
                      onClick={closeModal}
                      style={{
                        padding: '12px 32px',
                        background: 'rgba(63,140,255,0.10)',
                        border: '1px solid rgba(63,140,255,0.24)',
                        borderRadius: '100px',
                        color: 'rgba(63,140,255,0.90)',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'background 180ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(63,140,255,0.16)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(63,140,255,0.10)')}
                    >
                      {t('form.done_close')}
                    </button>
                  </motion.div>
                ) : (

                  /* ── Form ── */
                  <motion.div key="form" initial={{ opacity: 1 }}>

                    {/* Header */}
                    <div style={{ marginBottom: '36px', paddingRight: '44px' }}>
                      <h2 style={{
                        fontSize: 'clamp(24px, 3.8vw, 44px)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#F0F2FF',
                        lineHeight: 1.08,
                        marginBottom: '10px',
                      }}>
                        {t('form.title')}
                      </h2>
                      <p style={{
                        fontSize: 'clamp(13px, 1.4vw, 15px)',
                        lineHeight: 1.70,
                        color: '#8A90A8',
                        opacity: 0.75,
                        maxWidth: '520px',
                      }}>
                        {t('form.subtitle')}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>

                      {/* ── Section 1 — Contact ── */}
                      <SectionLabel text={t('form.s1_label')} />

                      <div
                        className="grid sm:grid-cols-2"
                        style={{ gap: '14px', marginBottom: '14px' }}
                      >
                        <div data-error={!!errors.name || undefined}>
                          <Field label={t('form.name_label')} required error={errors.name}>
                            <TextInput
                              inputRef={firstInput}
                              value={form.name}
                              onChange={setField('name')}
                              placeholder={t('form.name_placeholder')}
                              error={errors.name}
                            />
                          </Field>
                        </div>
                        <div data-error={!!errors.company || undefined}>
                          <Field label={t('form.company_label')} required error={errors.company}>
                            <TextInput
                              value={form.company}
                              onChange={setField('company')}
                              placeholder={t('form.company_placeholder')}
                              error={errors.company}
                            />
                          </Field>
                        </div>
                        <div data-error={!!errors.email || undefined}>
                          <Field label={t('form.email_label')} required error={errors.email}>
                            <TextInput
                              type="email"
                              value={form.email}
                              onChange={setField('email')}
                              placeholder={t('form.email_placeholder')}
                              error={errors.email}
                            />
                          </Field>
                        </div>
                        <Field label={t('form.phone_label')} required error={errors.phone}>
                          <TextInput
                            type="tel"
                            value={form.phone}
                            onChange={setField('phone')}
                            placeholder={t('form.phone_placeholder')}
                            error={errors.phone}
                          />
                        </Field>
                        <Field label={t('form.website_label')}>
                          <TextInput
                            value={form.website}
                            onChange={setField('website')}
                            placeholder={t('form.website_placeholder')}
                          />
                        </Field>
                        <Field label={t('form.location_label')}>
                          <TextInput
                            value={form.location}
                            onChange={setField('location')}
                            placeholder={t('form.location_placeholder')}
                          />
                        </Field>
                      </div>

                      <Divider />

                      {/* ── Section 2 — Services ── */}
                      <div style={{ margin: '22px 0' }}>
                        <SectionLabel text={t('form.s2_label')} />
                        <div data-error={!!errors.services || undefined}>
                          <Field
                            label={t('form.services_label')}
                            required
                            error={errors.services}
                          >
                            <div
                              className="grid sm:grid-cols-2 lg:grid-cols-3"
                              style={{ gap: '8px', marginTop: '8px' }}
                            >
                              {Array.isArray(serviceOptions) && serviceOptions.map((svc, i) => (
                                <ServiceCheckbox
                                  key={i}
                                  label={svc}
                                  checked={form.services.includes(svc)}
                                  onChange={() => toggleService(svc)}
                                />
                              ))}
                            </div>
                          </Field>
                        </div>
                      </div>

                      {/* Brand description */}
                      <div style={{ marginBottom: '22px' }} data-error={!!errors.brandDesc || undefined}>
                        <Field
                          label={t('form.brand_label')}
                          required
                          error={errors.brandDesc}
                        >
                          <Textarea
                            value={form.brandDesc}
                            onChange={setField('brandDesc')}
                            placeholder={t('form.brand_placeholder')}
                            error={errors.brandDesc}
                            rows={4}
                          />
                        </Field>
                      </div>

                      <Divider />

                      {/* ── Section 3 — Project Details ── */}
                      <div style={{ margin: '22px 0' }}>
                        <SectionLabel text={t('form.s3_label')} />
                        <div className="grid sm:grid-cols-3" style={{ gap: '14px' }}>
                          <Field label={t('form.goal_label')}>
                            <SelectField
                              value={form.goal}
                              onChange={setField('goal')}
                              options={Array.isArray(goalOptions) ? goalOptions : []}
                              placeholder={t('form.goal_placeholder')}
                            />
                          </Field>
                          <Field label={t('form.budget_label')}>
                            <SelectField
                              value={form.budget}
                              onChange={setField('budget')}
                              options={Array.isArray(budgetOptions) ? budgetOptions : []}
                              placeholder={t('form.budget_placeholder')}
                            />
                          </Field>
                          <Field label={t('form.timeline_label')}>
                            <SelectField
                              value={form.timeline}
                              onChange={setField('timeline')}
                              options={Array.isArray(timelineOptions) ? timelineOptions : []}
                              placeholder={t('form.timeline_placeholder')}
                            />
                          </Field>
                        </div>
                      </div>

                      <Divider />

                      {/* ── Section 4 — References ── */}
                      <div style={{ margin: '22px 0' }}>
                        <SectionLabel text={t('form.s4_label')} />
                        <Field label={t('form.references_label')}>
                          <Textarea
                            value={form.references}
                            onChange={setField('references')}
                            placeholder={t('form.references_placeholder')}
                            rows={3}
                          />
                        </Field>
                      </div>

                      {/* Success criteria */}
                      <div style={{ marginBottom: '30px' }}>
                        <Field label={t('form.success_q_question')}>
                          <Textarea
                            value={form.successCriteria}
                            onChange={setField('successCriteria')}
                            placeholder={t('form.success_q_placeholder')}
                            rows={3}
                          />
                        </Field>
                      </div>

                      {/* ── Submit ── */}
                      <div style={{
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '16px',
                        justifyContent: 'space-between',
                      }}>
                        <button
                          type="submit"
                          disabled={submitting}
                          style={{
                            padding: '14px 36px',
                            background: submitting
                              ? 'rgba(63,140,255,0.28)'
                              : 'linear-gradient(135deg, rgba(63,140,255,0.95) 0%, rgba(45,110,235,0.90) 100%)',
                            border: '1px solid rgba(63,140,255,0.45)',
                            borderRadius: '100px',
                            color: '#F0F2FF',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                            cursor: submitting ? 'wait' : 'pointer',
                            fontFamily: 'inherit',
                            transition: 'opacity 180ms ease, background 180ms ease',
                            opacity: submitting ? 0.65 : 1,
                            boxShadow: submitting ? 'none' : '0 0 24px rgba(63,140,255,0.20)',
                          }}
                          onMouseEnter={(e) => {
                            if (!submitting) e.currentTarget.style.boxShadow = '0 0 40px rgba(63,140,255,0.35)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = submitting ? 'none' : '0 0 24px rgba(63,140,255,0.20)'
                          }}
                        >
                          {submitting ? t('form.submitting') : t('form.submit')}
                        </button>

                        <a
                          href="https://wa.me/905xxxxxxxxx"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: 'rgba(138,144,168,0.50)',
                            letterSpacing: '0.04em',
                            textDecoration: 'none',
                            transition: 'color 180ms ease',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(138,144,168,0.90)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(138,144,168,0.50)')}
                        >
                          {t('form.whatsapp_alt')} →
                        </a>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
