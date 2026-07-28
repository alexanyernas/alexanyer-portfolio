import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { projectImages, type Project } from '../data/projects'
import { Tag } from './ui'
import { useProjectName } from './Projects'

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useTranslation()
  const name = useProjectName(project)
  const images = projectImages(project)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  // Las capturas web de página completa son muy altas: se muestran con scroll interno
  const [tall, setTall] = useState<Record<number, boolean>>({})
  const dialogRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (delta: number) => {
      setDirection(delta)
      setIndex((i) => (i + delta + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [go, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm sm:p-8 dark:bg-black/70"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={name}
        tabIndex={-1}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none dark:bg-night-soft"
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-4 dark:border-white/5">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-lg font-semibold tracking-[-0.01em]">{name}</h3>
              <Tag
                className={
                  project.category === 'mobile'
                    ? 'bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300'
                    : 'bg-neutral-100 text-neutral-500 dark:bg-white/5 dark:text-neutral-300'
                }
              >
                {project.category === 'mobile' ? t('projects.categoryMobile') : t('projects.categoryWeb')}
              </Tag>
              {project.relatedGroup && (
                <Tag className="bg-tint/10 text-tint dark:bg-tint/20 dark:text-accent-200">
                  {t(`projects.groups.${project.relatedGroup}`)}
                </Tag>
              )}
            </div>
            <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
              {t(`projects.descriptions.${project.folder}`)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t('projects.close')}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-neutral-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Visor */}
        <div className="relative flex-1 overflow-hidden bg-neutral-50 dark:bg-night">
          <div
            className="flex h-[52svh] items-center justify-center overflow-y-auto p-4 sm:h-[58svh]"
            aria-live="polite"
            aria-label={t('projects.imageOf', { current: index + 1, total: images.length, name })}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={t('projects.imageOf', { current: index + 1, total: images.length, name })}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.28, ease }}
                onLoad={(e) => {
                  const img = e.currentTarget
                  if (img.naturalHeight / img.naturalWidth > 2.2) {
                    setTall((v) => ({ ...v, [index]: true }))
                  }
                }}
                className={
                  tall[index] && project.category === 'web'
                    ? 'w-full self-start rounded-lg shadow-sm'
                    : 'max-h-full max-w-full rounded-lg object-contain shadow-sm'
                }
              />
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label={t('projects.prev')}
                className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-transform hover:scale-105 dark:bg-night-raised dark:text-white"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label={t('projects.next')}
                className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-transform hover:scale-105 dark:bg-night-raised dark:text-white"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto border-t border-neutral-100 px-4 py-3 dark:border-white/5">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={t('projects.imageOf', { current: i + 1, total: images.length, name })}
                aria-current={i === index}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === index
                    ? 'border-accent-500'
                    : 'border-transparent opacity-50 hover:opacity-90'
                }`}
              >
                <img src={src} alt="" loading="lazy" className="size-full object-cover object-top" />
              </button>
            ))}
            <span className="ml-auto shrink-0 pl-2 font-mono text-[11px] text-neutral-400">
              {index + 1} / {images.length}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
