import { useTranslation } from 'react-i18next'
import { email, socials } from '../data/projects'
import ContactForm, { emailConfigured } from './ContactForm'
import { Reveal, Wordmark } from './ui'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-neutral-100 dark:border-white/5">
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(285deg,rgba(0,0,0,.12)_0%,transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {t('contact.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            {t('contact.lead')}
          </p>
          {emailConfigured ? (
            <>
              <ContactForm />
              <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
                {t('contact.form.direct')}{' '}
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-accent-500 transition-colors hover:text-accent-600"
                >
                  {email}
                </a>
              </p>
            </>
          ) : (
            <a
              href={`mailto:${email}`}
              className="mt-9 inline-flex h-12 items-center rounded-full bg-accent-500 px-8 text-[15px] font-semibold text-white transition-colors hover:bg-accent-600"
            >
              {t('contact.cta')}
            </a>
          )}
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-neutral-400">
            {t('contact.or')}
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-semibold text-neutral-600 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-accent-300 dark:hover:text-accent-300"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20 flex flex-col items-center gap-2 border-t border-neutral-100 pt-8 text-center dark:border-white/10">
          <span className="text-xl">
            <Wordmark />
          </span>
          <p className="text-[13px] text-neutral-400">{t('footer.tagline')}</p>
          <p className="text-[13px] text-neutral-400">
            © {new Date().getFullYear()} · {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
