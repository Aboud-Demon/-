import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { wedding } from '../data/wedding'

function getRemaining() {
  // Wedding begins at 4:00 PM Baghdad time (UTC+03:00).
  const target = new Date(`${wedding.date}T${wedding.startTime}:00+03:00`).getTime()
  const difference = target - Date.now()
  if (difference <= 0) return null
  return { days: Math.floor(difference / 86400000), hours: Math.floor((difference / 3600000) % 24), minutes: Math.floor((difference / 60000) % 60), seconds: Math.floor((difference / 1000) % 60) }
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  if (!remaining) return <p className="after-wedding">اليوم بدأت الحكاية <span aria-hidden="true">✧</span></p>
  const items = [['days', 'يوم'], ['hours', 'ساعة'], ['minutes', 'دقيقة'], ['seconds', 'ثانية']]
  return <div className="countdown" aria-label={`باقي ${remaining.days} يوم و${remaining.hours} ساعة و${remaining.minutes} دقيقة`}>
    {items.map(([key, label]) => <div className="count-unit" key={key}>
      <span className="count-number" lang="en" dir="ltr" aria-label={String(remaining[key]).padStart(2, '0')}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span key={remaining[key]} className="count-digit" aria-hidden="true" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(3px)' }} transition={{ duration: reduceMotion ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1] }}>{String(remaining[key]).padStart(2, '0')}</motion.span>
        </AnimatePresence>
      </span>
      <span className="count-label">{label}</span>
    </div>)}
  </div>
}
