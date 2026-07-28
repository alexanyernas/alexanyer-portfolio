import { useTranslation } from 'react-i18next'
import { Reveal, SectionHeading, Tag } from './ui'

interface Job {
  role: string
  company: string
  period: string
  location: string
  summary: string
  tech: string[]
}

export default function Experience() {
  const { t } = useTranslation()
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[]

  return (
    <section id="experience" className="border-t border-neutral-100 py-24 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading num="02" title={t('experience.title')} lead={t('experience.lead')} />

        <ol className="relative ml-2 space-y-2 border-l border-neutral-200 dark:border-neutral-600">
          {jobs.map((job, i) => (
            <li key={`${job.company}-${job.period}`}>
              <Reveal delay={Math.min(i * 0.05, 0.25)} className="group relative pb-8 pl-8 sm:pl-10">
                <span
                  className={`absolute top-2 -left-[5px] size-2.5 rounded-full transition-colors ${
                    i === 0 ? 'bg-accent-500' : 'bg-neutral-300 group-hover:bg-accent-500 dark:bg-neutral-600'
                  }`}
                  aria-hidden
                />
                <div className="rounded-2xl border border-transparent p-5 transition-colors group-hover:border-neutral-100 group-hover:bg-neutral-50/60 sm:p-6 dark:group-hover:border-white/5 dark:group-hover:bg-white/[0.03]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">
                      {job.role} <span className="text-neutral-400 dark:text-neutral-500">·</span>{' '}
                      <span className="text-accent-500">{job.company}</span>
                    </h3>
                    <p className="font-mono text-xs text-neutral-400">{job.period}</p>
                  </div>
                  <p className="mt-0.5 text-[13px] text-neutral-400">{job.location}</p>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {job.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tech.map((tech) => (
                      <Tag
                        key={tech}
                        className="bg-neutral-100 text-neutral-500 dark:bg-white/5 dark:text-neutral-300"
                      >
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
