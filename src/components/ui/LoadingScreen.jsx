import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoMark from './LogoMark'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 1, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#020210',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '22px',
            pointerEvents: 'none',
          }}
        >
          {/* Logo — blur dissolve reveal with chromatic pulse */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.92 }}
            animate={{ opacity: 1, filter: 'blur(0px)',  scale: 1.00 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.10 }}
          >
            <LogoMark size={140} hoverable={false} />
          </motion.div>

          {/* Brand line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.50, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            style={{
              width: '32px',
              height: '1px',
              background: 'rgba(63,140,255,0.50)',
              transformOrigin: 'left center',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
