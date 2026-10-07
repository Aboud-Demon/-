import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { wedding } from './data/wedding'
import { Reveal } from './components/DecorativeElements'
import Countdown from './components/Countdown'

function StoryPage({ scene, as = 'section', className = '', children, ...props }) {
  const [entered, setEntered] = useState(false)
  const reduceMotion = useReducedMotion()
  const Page = motion[as] ?? motion.section
  const scenes = {
    couple: { initial: { opacity: 0, clipPath: 'inset(0 17% 0 17% round 48% 48% 4px 4px)' }, visible: { opacity: 1, clipPath: 'inset(0 0 0 0 round 0px)' } },
    event: { initial: { opacity: 0, clipPath: 'inset(9% 0 9% 0 round 32px)' }, visible: { opacity: 1, clipPath: 'inset(0 0 0 0 round 0px)' } },
    countdown: { initial: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } },
    closing: { initial: { opacity: 0, clipPath: 'inset(0 0 24% 0)' }, visible: { opacity: 1, clipPath: 'inset(0 0 0 0)' } },
  }
  const sceneMotion = scenes[scene] ?? scenes.event
  return <Page className={`${className}${entered ? ' scene-entered' : ''}`} initial={reduceMotion ? { opacity: 0 } : sceneMotion.initial} whileInView={reduceMotion ? { opacity: 1 } : sceneMotion.visible} onViewportEnter={() => setEntered(true)} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduceMotion ? 0.3 : 1.05, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</Page>
}

function LivingThread({ opened }) {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 58, damping: 24, mass: 0.7 })
  // A single long dash reveals the path continuously as the story scrolls.
  // Normalized SVG pathLength can become sub-pixel dash segments on mobile.
  const pathOffset = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [opened ? 190 : 215, 0])
  const nodeOne = useTransform(smoothProgress, [0.16, 0.24, 0.32], [0.35, 1, 0.35])
  const nodeTwo = useTransform(smoothProgress, [0.42, 0.5, 0.58], [0.35, 1, 0.35])
  const nodeThree = useTransform(smoothProgress, [0.68, 0.76, 0.84], [0.35, 1, 0.35])
  const nodes = [{ point: 0.24, progress: reduceMotion ? 0.55 : nodeOne }, { point: 0.5, progress: reduceMotion ? 0.55 : nodeTwo }, { point: 0.76, progress: reduceMotion ? 0.55 : nodeThree }]
  return createPortal(<motion.svg className={`living-thread${opened ? ' is-open' : ''}`} viewBox="0 0 40 100" preserveAspectRatio="none" aria-hidden="true">
    <path className="living-thread-track" d="M20 0 C20 13 10 17 20 26 C30 35 12 42 20 51 C28 60 10 67 20 76 C30 85 18 91 20 100"/>
    <motion.path className="living-thread-draw" d="M20 0 C20 13 10 17 20 26 C30 35 12 42 20 51 C28 60 10 67 20 76 C30 85 18 91 20 100" style={{ strokeDashoffset: pathOffset }}/>
    {nodes.map(({ point, progress }, index) => <motion.circle key={point} className="living-thread-node" cx="20" cy={point * 100} r={index === 1 ? 2.4 : 1.7} style={{ opacity: progress, scale: progress }}/ >)}
  </motion.svg>, document.body)
}

function SectionIndex({ number, label }) {
  return <div className="section-index" aria-hidden="true"><span>{number} / 05</span><i /> <span>{label}</span></div>
}

function BotanicalSprig({ className = '' }) {
  return <svg className={`botanical-sprig ${className}`} viewBox="0 0 240 340" fill="none" aria-hidden="true">
    <path d="M24 324C71 265 99 214 118 164c19-50 37-91 96-148M77 257c-28-17-48-40-59-70 29 5 52 20 69 45M105 205c-4-31-1-57 12-81 17 24 20 49 11 77M132 151c-26-15-43-35-52-61 29 2 50 15 65 41M160 103c0-28 10-52 30-73 9 27 6 51-10 75M75 259c27-8 52-8 76 0-22 20-46 26-73 18M109 190c27-4 51 1 72 15-25 15-49 16-74 4M147 128c26-8 50-7 74 4-22 20-46 27-73 19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 189l-7-3m43 36-8-2m65-96 3-7m9 65 6-5m-1-92-2-8m33 40 7-3m24-87 1-8m-7 65 8 1m-50 51 2-8m42 26 8-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
}

function OrnamentDivider({ light = false }) {
  return <div className={`ornament-divider${light ? ' is-light' : ''}`} aria-hidden="true"><span/><b>✧</b><span/></div>
}

function CalendarIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="5" y="7" width="22" height="21" rx="4"/><path d="M10 4v6M22 4v6M5 13h22M11 18h.01M16 18h.01M21 18h.01M11 23h.01M16 23h.01" strokeLinecap="round"/></svg>
}
function ClockIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function PinIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M25 13c0 7-9 15-9 15s-9-8-9-15a9 9 0 1 1 18 0Z"/><circle cx="16" cy="13" r="3"/></svg>
}

function Intro({ onOpen, opening }) {
  const reduce = useReducedMotion()
  const lineVariants = reduce ? reducedIntroLineVariants : introLineVariants
  const sequenceVariants = { hidden: {}, visible: { transition: { delayChildren: reduce ? 0 : 0.35, staggerChildren: reduce ? 0.12 : 0.58 } } }
  return <motion.section className={`intro screen${opening ? ' is-opening' : ''}`} aria-labelledby="intro-title" initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(18% 12% round 48% 48% 8px 8px)' }} animate={{ opacity: 1, clipPath: 'inset(0% 0% round 0% 0% 0 0)' }} exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'circle(0% at 50% 75%)' }} transition={{ duration: reduce ? 0.2 : 1.15, ease: [0.76, 0, 0.24, 1] }}>
    <div className="intro-glow" aria-hidden="true"/>
    <div className="intro-arch" aria-hidden="true"><span/><span/></div>
    <BotanicalSprig className="intro-sprig intro-sprig-left"/><BotanicalSprig className="intro-sprig intro-sprig-right"/>
    <div className="intro-frame" aria-hidden="true"/>
    <SectionIndex number="01" label="دعوة زفاف"/>
    <motion.div className="intro-content" initial="hidden" animate="visible" variants={sequenceVariants}>
      <motion.span className="bismillah intro-beat" variants={lineVariants}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</motion.span>
      <motion.div variants={lineVariants}><OrnamentDivider light/></motion.div>
      <motion.p id="intro-title" className="intro-copy" variants={lineVariants}>بكل حب، ندعوكم لمشاركتنا<br/>بداية فصلٍ جديد من حياتنا</motion.p>
      <motion.button className="open-button" onClick={onOpen} variants={lineVariants} whileTap={{ scale: 0.96 }}><span className="open-arrow" aria-hidden="true">›</span><span>افتح الدعوة</span></motion.button>
    </motion.div>
    <div className="scroll-cue intro-cue" aria-hidden="true"><span className="scroll-icon">↕</span><span>مرّروا لاكتشاف الحكاية</span></div>
  </motion.section>
}

const introLineVariants = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)', y: 5 },
  visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
}
const reducedIntroLineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24 } },
}

const nameSequence = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.62 } },
}

function StaggeredNames({ className }) {
  const [writing, setWriting] = useState(false)
  const reduceMotion = useReducedMotion()
  const wordVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { opacity: 0, y: 18, clipPath: 'inset(0 0 0 100%)', filter: 'blur(7px)' },
        visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
      }
  const joinVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } } }

  return <motion.div className={className} variants={nameSequence} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} onViewportEnter={() => setWriting(true)}>
    <motion.h1 className={`cinematic-name${writing ? ' is-writing' : ''}`} variants={wordVariants}>{wedding.groom}</motion.h1>
    <motion.i className="names-join" variants={joinVariants} aria-label="و">و</motion.i>
    <motion.h1 className={`cinematic-name${writing ? ' is-writing' : ''}`} variants={wordVariants}>{wedding.bride}</motion.h1>
  </motion.div>
}

function CoupleSection() {
  return <StoryPage scene="couple" className="couple screen" aria-label="العروسان">
    <div className="couple-wash" aria-hidden="true"/>
    <div className="couple-arch" aria-hidden="true"><span/></div>
    <BotanicalSprig className="couple-sprig couple-sprig-left"/>
    <SectionIndex number="02" label="بداية الحكاية"/>
    <Reveal variant="date" className="couple-kicker">{wedding.day} · <span lang="en" dir="ltr">{wedding.date.replaceAll('-', '/')}</span></Reveal>
    <StaggeredNames className="names-block"/>
    <Reveal variant="line" delay={0.16}><OrnamentDivider/></Reveal>
    <Reveal variant="ink" delay={0.22} className="couple-copy"><p>بفرحٍ يملأ القلب، يسعدنا أن نشارككم يومًا مميزًا من حياتنا، ونحتفل معكم ببداية فصلٍ جديد من حكايتنا.</p><p>وجودكم معنا يجعل فرحتنا أجمل.</p></Reveal>
  </StoryPage>
}

function formatDisplayTime(value) {
  const [hourText, minute] = value.split(':')
  const hour = Number(hourText)
  return `${hour % 12 || 12}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`
}

function EventSection() {
  return <StoryPage scene="event" className="event screen">
    <SectionIndex number="03" label="تفاصيل المناسبة"/>
    <Reveal variant="ink" className="section-heading"><h2>تفاصيل المناسبة</h2><OrnamentDivider/></Reveal>
    <div className="event-cards">
      <Reveal variant="date" delay={0.04} className="detail-card date-card"><span className="detail-icon"><CalendarIcon/></span><div><span className="detail-label">التاريخ</span><p className="weekday">{wedding.day}</p><p className="event-date" lang="en" dir="ltr">{wedding.date.replaceAll('-', '/')}</p></div></Reveal>
      <Reveal variant="orbit" delay={0.12} className="detail-card time-card"><span className="detail-icon"><ClockIcon/></span><div className="time-schedule"><div className="time-slot"><span className="time-part-label">وقت البدء</span><span className="event-time" lang="en" dir="ltr">{formatDisplayTime(wedding.startTime)}</span></div><div className="time-slot"><span className="time-part-label">وقت الانتهاء</span><span className="event-time" lang="en" dir="ltr">{formatDisplayTime(wedding.endTime)}</span></div></div></Reveal>
      <Reveal variant="route" delay={0.2} className="detail-card venue-card"><span className="detail-icon"><PinIcon/></span><div><span className="detail-label">المكان</span><p className="venue-title">{wedding.venue}</p><p className="venue-subtitle">{wedding.location}</p><a className="map-link" href={wedding.mapsUrl}>عرض الموقع <span aria-hidden="true">↗</span></a></div></Reveal>
    </div>
  </StoryPage>
}

function CountdownSection() {
  return <StoryPage scene="countdown" className="count-section screen">
    <div className="count-glow" aria-hidden="true"/><BotanicalSprig className="count-sprig count-sprig-right"/>
    <SectionIndex number="04" label="العدّ التنازلي"/>
    <Reveal variant="orbit" className="count-heading"><h2>العدّ التنازلي</h2><p>حتى موعد لقائنا</p></Reveal>
    <Reveal variant="orbit" delay={0.12}><Countdown/></Reveal>
    <Reveal variant="line" delay={0.2}><OrnamentDivider light/></Reveal>
    <Reveal variant="ink" delay={0.26} className="count-note">نتشرّف بحضوركم<br/>ومشاركتكم فرحتنا</Reveal>
  </StoryPage>
}

function ClosingSection() {
  const [year, month, day] = wedding.date.split('-')
  return <StoryPage scene="closing" as="footer" className="closing screen">
    <BotanicalSprig className="closing-sprig closing-sprig-left"/><BotanicalSprig className="closing-sprig closing-sprig-right"/>
    <SectionIndex number="05" label="إلى اللقاء"/>
    <Reveal variant="ink" className="closing-message"><p>ننتظر حضوركم<br/>لتكتمل بهذه الفرحة</p><OrnamentDivider/></Reveal>
    <StaggeredNames className="closing-names"/>
    <Reveal variant="date" delay={0.18}><p className="closing-thanks">شكرًا لكم<br/>وجودكم معنا يجعل يومنا<br/>أكثر تميّزًا وجمالًا</p></Reveal>
    <div className="closing-date" lang="en" dir="ltr">{year}/{month}/{day}</div>
  </StoryPage>
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const audioRef = useRef(null)
  const reduceMotion = useReducedMotion()

  function handleOpenInvitation() {
    if (opening) return
    setOpening(true)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.18
      audio.play().catch((error) => console.warn('Audio playback was blocked:', error))
    }
    window.setTimeout(() => setOpened(true), 360)
  }

  return <main className="experience">
    <AnimatePresence mode="wait">
      {!opened ? <Intro key="intro" opening={opening} onOpen={handleOpenInvitation}/> : <motion.div key="invitation" className="invitation" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'circle(0% at 50% 75%)', scale: 0.98 }} animate={{ opacity: 1, clipPath: 'circle(150% at 50% 75%)', scale: 1 }} transition={{ duration: reduceMotion ? 0.25 : 1.45, ease: [0.76, 0, 0.24, 1] }}>
        <div className="page-grain" aria-hidden="true"/>
        <CoupleSection/><EventSection/><CountdownSection/><ClosingSection/>
      </motion.div>}
    </AnimatePresence>
    <LivingThread opened={opened}/>
    <audio ref={audioRef} src={wedding.musicPath} loop preload="auto" aria-hidden="true"/>
  </main>
}
