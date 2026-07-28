/**
 * Genera branding/linkedin-banner.png (1584×396 @2x = 3168×792)
 * a partir de branding/linkedin-banner.html usando el Chrome instalado.
 *
 *   node branding/generate-banner.mjs
 */
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(dir, 'linkedin-banner.html')
const out = path.join(dir, 'linkedin-banner.png')

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1584,396',
  '--force-device-scale-factor=2',
  `--screenshot=${out}`,
  `file://${src}`,
])

console.log(`Banner generado: ${out}`)
