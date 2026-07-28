import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { projects, projectCover, type Category, type Project } from '../data/projects'
import { SectionHeading, Tag } from './ui'
import ProjectModal from './ProjectModal'

type Filter = 'all' | Category

const ease = [0.22, 1, 0.36, 1] as const
const PAGE_SIZE = 9

export function useProjectName(project: Project): string {
  const { t, i18n } = useTranslation()
  if (i18n.language.startsWith('en')) {
    const names = t('projects.names', { returnObjects: true }) as Record<string, string>
    return names[project.name] ?? project.name
  }
  return project.name
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const { t } = useTranslation()
  const name = useProjectName(project)
  const description = t(`projects.descriptions.${project.folder}`)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease }}
    >
      <button
        onClick={() => onOpen(project)}
        aria-label={`${t('projects.viewProject')}: ${name}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-[0_24px_50px_-24px_rgba(0,113,227,0.35)] dark:border-white/[0.07] dark:bg-night-soft dark:hover:border-accent-300/40"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-night-raised">
          <img
            src={projectCover(project)}
            alt=""
            loading="lazy"
            className={`size-full transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
              project.category === 'mobile' ? 'object-contain p-4' : 'object-cover object-top'
            }`}
          />
          {project.featured && (
            <Tag className="absolute top-3 left-3 bg-accent-500 text-white shadow-sm">
              ★ {t('projects.featured')}
            </Tag>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
          <span className="absolute right-3 bottom-3 translate-y-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-ink opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {t('projects.viewProject')} →
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent-500">
              {name}
            </h3>
            <Tag
              className={
                project.category === 'mobile'
                  ? 'shrink-0 bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300'
                  : 'shrink-0 bg-neutral-100 text-neutral-500 dark:bg-white/5 dark:text-neutral-300'
              }
            >
              {project.category === 'mobile' ? t('projects.categoryMobile') : t('projects.categoryWeb')}
            </Tag>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
          <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-neutral-400">
            <span>
              {project.imagesCount}{' '}
              {project.imagesCount === 1 ? t('projects.screenshot') : t('projects.screenshots')}
            </span>
            {project.relatedGroup && (
              <span className="text-tint/80 dark:text-accent-200/70">
                {t(`projects.groups.${project.relatedGroup}`)}
              </span>
            )}
          </div>
        </div>
      </button>
    </motion.li>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const [page, setPage] = useState(1)
  const [active, setActive] = useState<Project | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const changeFilter = (f: Filter) => {
    setFilter(f)
    setPage(1)
  }

  const changePage = (p: number) => {
    setPage(p)
    document.getElementById('projects')?.scrollIntoView()
  }

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('projects.filterAll') },
    { key: 'web', label: t('projects.filterWeb') },
    { key: 'mobile', label: t('projects.filterMobile') },
  ]

  return (
    <section id="projects" className="border-t border-neutral-100 py-24 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading num="03" title={t('projects.title')} lead={t('projects.lead')} />

        <div role="group" aria-label={t('projects.title')} className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const selected = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => changeFilter(f.key)}
                aria-pressed={selected}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? 'text-white'
                    : 'border border-neutral-200 text-neutral-600 hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-accent-300 dark:hover:text-accent-300'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent-500"
                    transition={{ duration: 0.35, ease }}
                    aria-hidden
                  />
                )}
                <span className="relative">
                  {f.label}
                  <span className="ml-2 font-mono text-[11px] opacity-70">
                    {f.key === 'all' ? projects.length : projects.filter((p) => p.category === f.key).length}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {totalPages > 1 && (
          <nav
            aria-label={t('projects.pagination.label')}
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              aria-label={t('projects.pagination.prev')}
              className="flex size-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors enabled:hover:border-accent-500 enabled:hover:text-accent-500 disabled:opacity-35 dark:border-neutral-600 dark:text-neutral-300 dark:enabled:hover:border-accent-300 dark:enabled:hover:text-accent-300"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => changePage(n)}
                aria-label={t('projects.pagination.page', { page: n })}
                aria-current={n === page ? 'page' : undefined}
                className={`relative size-10 rounded-full font-mono text-sm font-semibold transition-colors ${
                  n === page
                    ? 'text-white'
                    : 'border border-neutral-200 text-neutral-600 hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-accent-300 dark:hover:text-accent-300'
                }`}
              >
                {n === page && (
                  <motion.span
                    layoutId="page-pill"
                    className="absolute inset-0 rounded-full bg-accent-500"
                    transition={{ duration: 0.35, ease }}
                    aria-hidden
                  />
                )}
                <span className="relative">{n}</span>
              </button>
            ))}

            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              aria-label={t('projects.pagination.next')}
              className="flex size-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors enabled:hover:border-accent-500 enabled:hover:text-accent-500 disabled:opacity-35 dark:border-neutral-600 dark:text-neutral-300 dark:enabled:hover:border-accent-300 dark:enabled:hover:text-accent-300"
            >
              →
            </button>

            <span className="ml-3 font-mono text-xs text-neutral-400">
              {t('projects.pagination.showing', {
                from: (page - 1) * PAGE_SIZE + 1,
                to: Math.min(page * PAGE_SIZE, filtered.length),
                total: filtered.length,
              })}
            </span>
          </nav>
        )}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
