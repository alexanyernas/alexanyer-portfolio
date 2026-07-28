import { useTranslation } from 'react-i18next'
import { Pill, Reveal, SectionHeading } from './ui'

const core = ['React Native', 'Flutter', 'Ionic']
// Orden: lenguajes → frameworks front-end → runtime/back-end → bases de datos → CMS → herramientas
const supporting = ['JavaScript', 'TypeScript', 'Vue.js', 'React.js', 'Next.js', 'Node.js', 'MongoDB', 'MySQL', 'WordPress', 'Docker', 'Git']

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="border-t border-neutral-100 py-24 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading num="01" title={t('about.title')} lead={t('about.lead')} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
          <div className="space-y-5 text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            <Reveal>
              <p>{t('about.p1')}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>{t('about.p2')}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>{t('about.p3')}</p>
            </Reveal>

            <Reveal delay={0.22} className="space-y-6 pt-4">
              <div>
                <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {t('about.specialties')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {core.map((s) => (
                    <Pill key={s} highlight>{s}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {t('about.supporting')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {supporting.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <figure className="relative mx-auto w-fit">
              <div
                className="dot-grid absolute -top-6 -right-6 size-40 opacity-40 [mask-image:linear-gradient(135deg,rgba(0,0,0,.5),transparent_70%)]"
                aria-hidden
              />
              <img
                src="/assets/me.webp"
                alt={t('about.photoAlt')}
                width={500}
                height={500}
                loading="lazy"
                className="relative w-64 rounded-2xl border border-neutral-100 shadow-[0_20px_60px_-20px_rgba(29,29,31,0.25)] sm:w-80 dark:border-white/10"
              />
              <figcaption className="mt-4 text-center font-mono text-xs text-neutral-400">
                const build = () =&gt; ship(app);
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
