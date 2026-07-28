import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const emailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

type Status = 'idle' | 'sending' | 'success' | 'error'
type Field = 'from_name' | 'from_email' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

const MESSAGE_MIN = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues: Values = { from_name: '', from_email: '', message: '' }

const labelClasses =
  'mb-1.5 block text-left font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400'

function fieldClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-neutral-400 transition-colors focus:outline-none dark:bg-night-raised dark:text-white dark:placeholder:text-neutral-500 ${
    hasError
      ? 'border-red-400 focus:border-red-500 dark:border-red-400/70 dark:focus:border-red-400'
      : 'border-neutral-200 focus:border-accent-500 dark:border-neutral-600 dark:focus:border-accent-300'
  }`
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 overflow-hidden text-left text-[13px] font-medium text-red-500 dark:text-red-400"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export default function ContactForm() {
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const validateField = (field: Field, value: string): string | undefined => {
    const trimmed = value.trim()
    switch (field) {
      case 'from_name':
        if (!trimmed) return t('contact.form.errors.nameRequired')
        return undefined
      case 'from_email':
        if (!trimmed) return t('contact.form.errors.emailRequired')
        if (!EMAIL_PATTERN.test(trimmed)) return t('contact.form.errors.emailInvalid')
        return undefined
      case 'message':
        if (!trimmed) return t('contact.form.errors.messageRequired')
        if (trimmed.length < MESSAGE_MIN)
          return t('contact.form.errors.messageShort', { min: MESSAGE_MIN })
        return undefined
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field
    const value = e.target.value
    setValues((v) => ({ ...v, [field]: value }))
    // Revalida en vivo solo los campos que ya mostraban error
    if (errors[field]) {
      setErrors((errs) => ({ ...errs, [field]: validateField(field, value) }))
    }
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field
    setErrors((errs) => ({ ...errs, [field]: validateField(field, values[field]) }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const nextErrors: Errors = {}
    for (const field of Object.keys(values) as Field[]) {
      const error = validateField(field, values[field])
      if (error) nextErrors[field] = error
    }
    setErrors(nextErrors)

    const firstInvalid = (Object.keys(nextErrors) as Field[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current!, {
        publicKey: PUBLIC_KEY!,
      })
      setValues(initialValues)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="mx-auto mt-10 w-full max-w-xl rounded-2xl border border-neutral-100 bg-white/70 p-6 text-left shadow-[0_20px_50px_-30px_rgba(29,29,31,0.25)] backdrop-blur-sm sm:p-8 dark:border-white/[0.07] dark:bg-night-soft/70"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            {t('contact.form.name')}
          </label>
          <input
            id="contact-name"
            name="from_name"
            type="text"
            value={values.from_name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            placeholder={t('contact.form.namePlaceholder')}
            aria-invalid={Boolean(errors.from_name)}
            aria-describedby={errors.from_name ? 'contact-name-error' : undefined}
            className={fieldClasses(Boolean(errors.from_name))}
          />
          <FieldError id="contact-name-error" message={errors.from_name} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            {t('contact.form.email')}
          </label>
          <input
            id="contact-email"
            name="from_email"
            type="email"
            value={values.from_email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            placeholder={t('contact.form.emailPlaceholder')}
            aria-invalid={Boolean(errors.from_email)}
            aria-describedby={errors.from_email ? 'contact-email-error' : undefined}
            className={fieldClasses(Boolean(errors.from_email))}
          />
          <FieldError id="contact-email-error" message={errors.from_email} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClasses}>
          {t('contact.form.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t('contact.form.messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${fieldClasses(Boolean(errors.message))} resize-y`}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-500 px-8 text-[15px] font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
        >
          {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
        </button>

        <div aria-live="polite" className="min-h-5 text-sm font-medium">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-accent-500"
              >
                ✓ {t('contact.form.success')}
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 dark:text-red-400"
              >
                {t('contact.form.error')}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  )
}
