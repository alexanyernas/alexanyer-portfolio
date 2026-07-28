/**
 * Genera public/cv-alexanyer-naranjo.pdf a partir de cv/cv-es.html
 * usando el Chrome instalado (sin dependencias extra).
 *
 *   node cv/generate.mjs
 */
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(dir, 'cv-es.html')
const out = path.join(dir, '..', 'public', 'cv-alexanyer-naranjo.pdf')

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${out}`,
  `file://${src}`,
])

console.log(`PDF generado: ${out}`)
