export type Category = 'web' | 'mobile'

export interface Project {
  id: number
  name: string
  folder: string
  imagesCount: number
  category: Category
  relatedGroup?: string
  featured?: boolean
}

export const projects: Project[] = [
  // ── Destacados ──────────────────────────────────────────────────────────
  { id: 1, name: 'App de Envíos', folder: 'app_envios', imagesCount: 15, category: 'mobile', featured: true },
  { id: 2, name: 'Monitoreo de Dispositivos IoT', folder: 'monitoreo_iot', imagesCount: 9, category: 'mobile', featured: true },
  { id: 3, name: 'Sermadre App', folder: 'sermadre_app', imagesCount: 3, category: 'mobile', featured: true },
  { id: 4, name: 'Capazítate', folder: 'capazitate', imagesCount: 9, category: 'web', featured: true },

  // ── Grupo Oxford ────────────────────────────────────────────────────────
  { id: 5, name: 'Oxford App', folder: 'oxford_app', imagesCount: 3, category: 'mobile', relatedGroup: 'oxford' },
  { id: 6, name: 'Oxford SRE App', folder: 'oxford_sre_app', imagesCount: 3, category: 'mobile', relatedGroup: 'oxford' },
  { id: 7, name: 'Oxford en Línea', folder: 'oxford_en_linea', imagesCount: 3, category: 'web', relatedGroup: 'oxford' },
  { id: 8, name: 'Oxford SRE', folder: 'oxford_sre', imagesCount: 3, category: 'web', relatedGroup: 'oxford' },

  // ── Grupo Chelo ─────────────────────────────────────────────────────────
  { id: 9, name: 'Chelo Mobile', folder: 'chelo_mobile', imagesCount: 3, category: 'mobile', relatedGroup: 'chelo' },
  { id: 10, name: 'Chelo Desktop', folder: 'chelo_desktop', imagesCount: 3, category: 'web', relatedGroup: 'chelo' },

  // ── Grupo QRWoof ────────────────────────────────────────────────────────
  { id: 11, name: 'QRWoof App', folder: 'qrwoof_app', imagesCount: 2, category: 'mobile', relatedGroup: 'qrwoof' },
  { id: 12, name: 'QRWoof Desktop', folder: 'qrwoof_desktop', imagesCount: 3, category: 'web', relatedGroup: 'qrwoof' },

  // ── Grupo Saon ──────────────────────────────────────────────────────────
  { id: 13, name: 'Saon App v1', folder: 'saon_app_1', imagesCount: 3, category: 'mobile', relatedGroup: 'saon' },
  { id: 14, name: 'Saon App v2', folder: 'saon_app_2', imagesCount: 3, category: 'mobile', relatedGroup: 'saon' },
  { id: 15, name: 'Saon Web', folder: 'saon_web', imagesCount: 3, category: 'web', relatedGroup: 'saon' },

  // ── Grupo Bienes Raíces ─────────────────────────────────────────────────
  { id: 16, name: 'App de Bienes Raíces', folder: 'app_bienes_raices', imagesCount: 6, category: 'mobile', relatedGroup: 'bienes-raices' },
  { id: 17, name: 'Admin de Bienes Raíces', folder: 'admin_bienes_raices', imagesCount: 4, category: 'web', relatedGroup: 'bienes-raices' },

  // ── Grupo Insumos en Barcos ─────────────────────────────────────────────
  { id: 18, name: 'ChatBot de Proveedores para Insumos en Barcos', folder: 'chatbot_proveedor_insumos_barcos', imagesCount: 9, category: 'mobile', relatedGroup: 'insumos-barcos' },
  { id: 19, name: 'Chat de Insumos en Barcos', folder: 'chat_insumos_barcos', imagesCount: 4, category: 'web', relatedGroup: 'insumos-barcos' },
  { id: 20, name: 'Entrenador de ChatBot para Proveedores', folder: 'entrenador_chatbot', imagesCount: 4, category: 'web', relatedGroup: 'insumos-barcos' },
  { id: 21, name: 'Sistema de Insumos en Barcos', folder: 'sistema_insumos_barcos', imagesCount: 6, category: 'web', relatedGroup: 'insumos-barcos' },

  // ── Web standalone ──────────────────────────────────────────────────────
  { id: 22, name: 'Buddy', folder: 'buddy', imagesCount: 3, category: 'web' },
  { id: 23, name: 'Contratando Personal', folder: 'contratando_personal', imagesCount: 2, category: 'web' },
  { id: 24, name: 'Educa2', folder: 'educa2', imagesCount: 3, category: 'web' },
  { id: 25, name: 'Efectividad de Trabajadores', folder: 'efectividad_trabajadores', imagesCount: 6, category: 'web' },
  { id: 26, name: 'Grupos de Extensión UCV', folder: 'grupos_extension', imagesCount: 6, category: 'web' },
  { id: 27, name: 'Imajin', folder: 'imajin', imagesCount: 8, category: 'web' },
  { id: 28, name: 'OJC', folder: 'ojc', imagesCount: 3, category: 'web' },
  { id: 29, name: 'Punicorp', folder: 'punicorp', imagesCount: 3, category: 'web' },
  { id: 30, name: 'Registro de Ventas', folder: 'registro_de_ventas', imagesCount: 5, category: 'web' },
  { id: 31, name: 'Restaurante', folder: 'restaurante', imagesCount: 3, category: 'web' },
  { id: 32, name: 'TOTC', folder: 'totc', imagesCount: 4, category: 'web' },
]

export const projectImages = (p: Project): string[] =>
  Array.from({ length: p.imagesCount }, (_, i) => `/projects/${p.folder}/${i + 1}.webp`)

export const projectCover = (p: Project): string => `/projects/${p.folder}/1.webp`

export const socials = [
  { name: 'GitHub', url: 'https://github.com/alexanyernas' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/alexanyernas' },
  { name: 'YouTube', url: 'https://youtube.com/@AlexanyerNaranjo' },
  { name: 'X / Twitter', url: 'https://twitter.com/alexanyernas' },
  { name: 'Instagram', url: 'https://instagram.com/alexanyernas' },
] as const

export const email = 'alexanyernaranjo@gmail.com'
