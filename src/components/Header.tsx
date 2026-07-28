import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { Wordmark } from './ui'

const sections = ['about', 'experience', 'projects', 'contact'] as const

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => scrollY.on('change', (y) => setScrolled(y > 12)), [scrollY])

  // Bloquea el scroll del fondo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const nextLang = i18n.language.startsWith('es') ? 'en' : 'es'

  const controls = (
    <>
      <button
        onClick={toggle}
        aria-label={theme === 'dark' ? t('actions.themeLight') : t('actions.themeDark')}
        className="flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-accent-300 dark:hover:text-accent-300"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
      <button
        onClick={() => i18n.changeLanguage(nextLang)}
        aria-label={t('actions.language')}
        className="flex h-9 items-center rounded-full border border-neutral-200 px-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-accent-300 dark:hover:text-accent-300"
      >
        {nextLang}
      </button>
    </>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? 'border-b border-neutral-100 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-night/80'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="text-lg" aria-label="Alexanyer Naranjo — inicio">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="principal">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-ink dark:text-neutral-400 dark:hover:text-white"
            >
              {t(`nav.${s}`)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">{controls}</div>

        {/* Móvil */}
        <div className="flex items-center gap-2.5 md:hidden">
          {controls}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            className="flex size-9 flex-col items-center justify-center gap-[5px] rounded-full border border-neutral-200 dark:border-neutral-600"
          >
            <span className={`h-[1.5px] w-4 bg-current transition-transform ${open ? 'translate-y-[3.25px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] w-4 bg-current transition-transform ${open ? '-translate-y-[3.25px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-neutral-100 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/5 dark:bg-night/95"
            aria-label="principal móvil"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-ink dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {t(`nav.${s}`)}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
