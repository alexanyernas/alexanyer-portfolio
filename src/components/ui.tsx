import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { motion } from 'motion/react'

/** Chip de tecnología — elemento distintivo de la marca. */
export function Pill({
  children,
  highlight = false,
  className = '',
  ...rest
}: { highlight?: boolean } & ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        highlight
          ? 'bg-accent-500 text-white'
          : 'border border-neutral-200 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300'
      } ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

/** Etiqueta pequeña para metadatos (categoría, grupo). */
export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}

const ease = [0.22, 1, 0.36, 1] as const

/** Encabezado de sección con número monoespaciado, según el manual. */
export function SectionHeading({
  num,
  title,
  lead,
}: {
  num: string
  title: string
  lead?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease }}
      className="mb-12"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm font-medium text-accent-500">{num}</span>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{title}</h2>
      </div>
      {lead && (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
          {lead}
        </p>
      )}
    </motion.div>
  )
}

/** Revelado al hacer scroll, reutilizable. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="font-bold tracking-[-0.03em]">
      {compact ? 'AN' : 'Alexanyer Naranjo'}
      <span className="text-accent-500">.</span>
    </span>
  )
}
