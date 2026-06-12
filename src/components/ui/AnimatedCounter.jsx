import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({
  to,
  suffix = '',
  prefix = '',
  duration = 1600,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const [displayed, setDisplayed] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isInView) return

    const start = performance.now()
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      setDisplayed(Math.round(eased * to))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [isInView, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{displayed}{suffix}
    </span>
  )
}
