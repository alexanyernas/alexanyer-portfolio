import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

function RotatingWord() {
  const { t } = useTranslation()
  const words = t('hero.rotating', { returnObjects: true }) as string[]
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2800)
    return () => clearInterval(id)
  }, [words.length, reduced])

  return (
    <span className="relative inline-grid overflow-hidden align-bottom text-accent-500">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-105%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero({ start }: { start: boolean }) {
  const { t } = useTranslation()

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      {/* Firma visual: cuadrícula de puntos desvaneciéndose + matiz radial */}
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(105deg,rgba(0,0,0,.14)_0%,transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(0,113,227,.10),transparent_44%),radial-gradient(circle_at_86%_75%,rgba(88,86,214,.06),transparent_40%)]"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={start ? 'show' : 'hidden'}
        className="relative mx-auto w-full max-w-6xl px-6 pt-24 pb-16 lg:px-10"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-500"
        >
          {t('hero.eyebrow')}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] font-bold tracking-[-0.03em]"
        >
          Alexanyer Naranjo<span className="text-accent-500">.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 text-[clamp(1.35rem,3.4vw,2rem)] font-semibold tracking-[-0.015em] text-neutral-500 dark:text-neutral-300"
        >
          {t('hero.headlineA')} <RotatingWord />
        </motion.p>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div variants={item} className="mt-11 flex flex-wrap gap-3.5">
          <a
            href="#projects"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-500 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {t('hero.ctaProjects')}
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-full border border-neutral-200 px-7 text-[15px] font-semibold text-ink transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-white dark:hover:border-accent-300 dark:hover:text-accent-300"
          >
            {t('hero.ctaContact')}
          </a>
          <a
            href="/cv-alexanyer-naranjo.pdf"
            download="CV-Alexanyer-Naranjo.pdf"
            className="group inline-flex h-12 items-center gap-2 px-3 text-[15px] font-semibold text-neutral-500 transition-colors hover:text-accent-500 dark:text-neutral-400 dark:hover:text-accent-300"
          >
            {t('hero.ctaCv')}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform group-hover:translate-y-0.5">
              <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />
            </svg>
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-neutral-100 pt-8 dark:border-white/10"
        >
          {[
            { value: '5+', label: t('hero.stats.years') },
            { value: '32', label: t('hero.stats.projects') },
            { value: '3', label: t('hero.stats.platforms') },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-bold tracking-[-0.02em]">{s.value}</dd>
              <dd className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
