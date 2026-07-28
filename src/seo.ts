import i18n from './i18n'

/**
 * SEO dinámico por idioma. Los valores en español viven estáticos en
 * index.html (lo que ven los crawlers sin JS); aquí se sincronizan
 * título, descripción y Open Graph cuando el visitante cambia de idioma.
 */
const seo = {
  es: {
    title: 'Alexanyer Naranjo · Desarrollador Front-End | Mobile & Web',
    ogTitle: 'Alexanyer Naranjo · Desarrollador Front-End',
    description:
      'Desarrollador Front-End con 5+ años de experiencia. Apps iOS y Android con React Native, Flutter e Ionic; web con Vue.js y React.js. 32 proyectos en producción.',
    ogDescription:
      'Apps iOS y Android con React Native, Flutter e Ionic; web con Vue.js y React.js. 5+ años de experiencia y 32 proyectos en producción.',
    locale: 'es_ES',
  },
  en: {
    title: 'Alexanyer Naranjo · Front-End Developer | Mobile & Web',
    ogTitle: 'Alexanyer Naranjo · Front-End Developer',
    description:
      'Front-End Developer with 5+ years of experience. iOS and Android apps with React Native, Flutter and Ionic; web with Vue.js and React.js. 32 projects shipped to production.',
    ogDescription:
      'iOS and Android apps with React Native, Flutter and Ionic; web with Vue.js and React.js. 5+ years of experience and 32 projects in production.',
    locale: 'en_US',
  },
} as const

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  document.querySelector(`meta[${attr}="${key}"]`)?.setAttribute('content', content)
}

function apply(lng: string) {
  const lang = lng.startsWith('en') ? 'en' : 'es'
  const data = seo[lang]

  document.title = data.title
  setMeta('name', 'description', data.description)
  setMeta('property', 'og:title', data.ogTitle)
  setMeta('property', 'og:description', data.ogDescription)
  setMeta('property', 'og:locale', data.locale)
  setMeta('property', 'og:locale:alternate', lang === 'es' ? 'en_US' : 'es_ES')
  setMeta('name', 'twitter:title', data.ogTitle)
  setMeta('name', 'twitter:description', data.ogDescription)
}

apply(i18n.language)
i18n.on('languageChanged', apply)
