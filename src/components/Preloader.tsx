import { useEffect } from 'react'
import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const
const DURATION_MS = 1750

/**
 * Preloader de marca: «AN.» — las letras se revelan como cortina tipográfica,
 * el punto azul cae con rebote y emite un pulso; el overlay sale en cortina.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const id = setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, DURATION_MS)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(id)
    }
  }, [onDone])

  return (
    <motion.div
      role="status"
      aria-label="Alexanyer Naranjo"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white dark:bg-night"
    >
      {/* Parallax sutil del contenido durante la salida */}
      <motion.div
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.55, ease }}
        className="flex flex-col items-center"
      >
        <span className="flex items-baseline text-7xl font-bold tracking-[-0.04em] sm:text-8xl">
          <span className="inline-flex overflow-hidden py-1">
            {['A', 'N'].map((ch, i) => (
              <motion.span
                key={ch}
                initial={{ y: '112%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.1, ease }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </span>

          {/* El punto azul: cae con rebote y emite un pulso */}
          <span className="relative ml-1 inline-flex size-[0.22em] items-center justify-center">
            <motion.span
              initial={{ y: '-260%', opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.68, type: 'spring', stiffness: 420, damping: 14 }}
              className="size-full rounded-full bg-accent-500"
            />
            <motion.span
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-accent-500"
              aria-hidden
            />
          </span>
        </span>

        {/* Línea de carga */}
        <span className="mt-8 block h-px w-24 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-600">
          <motion.span
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1.15, delay: 0.25, ease }}
            className="block h-full w-full bg-accent-500"
          />
        </span>
      </motion.div>
    </motion.div>
  )
}
