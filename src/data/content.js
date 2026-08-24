// Contenido del Observatorio de Salud Pública y Epidemiología
// Facultad de Medicina, Universidad de los Andes.
// Centralizado aquí para mantener los componentes de presentación limpios.

export const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Qué es', href: '#que-es' },
  { label: 'Visor', href: '#visor' },
  { label: 'Objetivos', href: '#objetivos' },
  { label: 'Boletines', href: '#boletines' },
  { label: 'Contacto', href: '#contacto' },
]

export const hero = {
  eyebrow: 'Facultad de Medicina · Universidad de los Andes',
  title: 'Observatorio de Salud Pública y Epidemiología',
  lead: 'Un espacio físico y virtual de seguimiento, monitoreo y evaluación de los principales procesos e indicadores de salud de Colombia y la región, para aportar desde la academia y la sociedad civil al control social y la gobernanza ciudadana en la toma de decisiones de política pública en salud.',
  ctaPrimary: { label: 'Ver visor de indicadores', href: '#visor' },
  ctaSecondary: { label: 'Últimos boletines', href: '#boletines' },
}

export const about = {
  eyebrow: 'Qué es',
  title: '¿Qué es el Observatorio?',
  body: 'Es un espacio físico y virtual de seguimiento, monitoreo y evaluación de los principales procesos e indicadores de salud de Colombia y la región, para aportar desde la academia y la sociedad civil al control social y la gobernanza ciudadana en la toma de decisiones en política pública en salud.',
}

export const viewer = {
  eyebrow: 'Visor del observatorio',
  title: 'Indicadores de vacunación en tiempo real',
  intro: 'En este visor encontrarás:',
  items: [
    { text: 'Coberturas de vacunación de eventos trazadores por municipio y territorio, actualizadas.', status: 'green' },
    { text: 'Metas y cumplimiento de vacunación en el acceso a la vacuna contra influenza.', status: 'green' },
    { text: 'Semaforización de cumplimiento de coberturas de vacunación a fecha de corte.', status: 'amber' },
    { text: 'Proyecciones de vacunación a final de año por biológico.', status: 'amber' },
    { text: 'Coberturas de vacunación en zonas de frontera.', status: 'amber' },
    { text: 'Circulación de virus respiratorios en frecuencias relativas y de positividad.', status: 'red' },
    { text: 'Monitoreo de eventos inmunoprevenibles en frecuencias absolutas y relativas.', status: 'red' },
  ],
  embedUrl:
    'https://app.powerbi.com/view?r=eyJrIjoiMDI5YmE5YWQtMGE0MS00MmI5LThhYzItMzBjOTA4NDExMzBmIiwidCI6ImZhYmQwNDdjLWZmNDgtNDkyYS04YmJiLThmOThiOWZiOWNjYSIsImMiOjR9',
}

export const objectives = {
  eyebrow: 'Propósito',
  title: 'Objetivos del Observatorio',
  items: [
    'Monitorear la situación de salud, así como la respuesta institucional y ciudadana frente al cumplimiento de las metas gubernamentales o indicativas en salud a nivel nacional e internacional.',
    'Indagar a partir de fuentes de información secundarias y terciarias en salud con una mirada crítica pero propositiva.',
    'Elaborar planes de análisis a partir de una reflexión previa a la medición de indicadores, mostrando brechas e inequidades poblacionales.',
    'Favorecer espacios de análisis con la ciudadanía, la academia, expertos y actores gubernamentales responsables como tomadores de decisión.',
    'Ser un espacio de formación de capacidades del talento humano de pregrado y posgrado en el análisis de situación de salud, la investigación y la traducción del conocimiento informado por la evidencia.',
  ],
}

export const vaccinationScope = {
  eyebrow: 'Observatorio regional de vacunación',
  title: 'Alcances del Observatorio Regional de Vacunación',
  items: [
    'Identificar buenas prácticas en estrategias y logística de vacunación en el Plan Ampliado de Inmunizaciones en Colombia y a nivel regional, que sirvan como estudio de caso.',
    'Realizar monitoreo de coberturas de vacunación y cumplimiento de metas por municipio y departamento, visibilizando poblaciones susceptibles.',
    'Hacer seguimiento a la relación entre coberturas de vacunación e incidencia de eventos inmunoprevenibles.',
    'Monitorear iniciativas de medición de eficacia vacunal, farmacovigilancia, vigilancia genómica y sus resultados.',
    'Monitorear estrategias de comunicación social del riesgo sobre vacunación y participación ciudadana.',
    'Realizar unidades de análisis con tomadores de decisión nacionales y territoriales para favorecer el análisis situacional de la vacunación y la gobernanza.',
    'Identificar posibles inequidades y brechas en el acceso poblacional al Plan Ampliado de Inmunizaciones.',
    'Hacer seguimiento a la modernización del PAI en Colombia.',
    'Dar pautas para una mejor planeación y gestión de la vacunación en población rural y rural dispersa, desde el modelo de Atención Primaria en Salud.',
    'Constituirse en centro de información, basado en fuentes institucionales y ciudadanas, para mejorar la comunicación social del riesgo en vacunación.',
  ],
  documents: {
    title: 'Actualización e incorporación del PAI al nuevo modelo de atención en salud',
    links: [
      { label: 'Revisión de esquemas de vacunación', href: 'https://medicina.uniandes.edu.co/sites/default/files/eventos/2023/03-marzo/pai/revision-esquemas-de-vacunacion.pdf' },
      { label: 'Coberturas de vacunación', href: 'https://medicina.uniandes.edu.co/sites/default/files/eventos/2023/03-marzo/pai/coberturas-de-vacunacion.pdf' },
      { label: 'Marco modelo', href: 'https://medicina.uniandes.edu.co/sites/default/files/eventos/2023/03-marzo/pai/marco-modelo.pdf' },
      { label: 'Diálogos deliberativos', href: 'https://medicina.uniandes.edu.co/sites/default/files/eventos/2023/03-marzo/pai/dialogos-deliberativos.pdf' },
      { label: 'Relatoría: hoja de ruta para inmunización contra el VSR en Colombia', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/relatoria-vsr.pdf' },
    ],
  },
}

export const bulletins = {
  eyebrow: 'Publicaciones periódicas',
  title: 'Boletines del Observatorio',
  items: [
    { date: 'Julio 2026', label: 'Boletín de julio de 2026', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-julio2026-observatorio-sp-uniandes.pdf', featured: true },
    { date: 'Mayo 2026', label: 'Análisis del Plan Nacional de Desarrollo', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/analisis-especial-pnd.pdf' },
    { date: 'Mayo 2026', label: 'Boletín de mayo de 2026', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-mayo2026-observatorio-sp-uniandes.pdf' },
    { date: 'Septiembre 2025', label: 'Boletín de septiembre de 2025', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-septiembre2025-observatorio-sp-uniandes.pdf' },
    { date: 'Agosto 2025', label: 'Boletín de agosto de 2025', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-agosto2025-observatorio-sp-uniandes.pdf' },
    { date: 'Junio 2025', label: 'Boletín de junio de 2025', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-junio2025-observatorio-sp-uniandes.pdf' },
    { date: 'Agosto 2024', label: 'Boletín de agosto de 2024', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-agoto2024-observatorio-sp-uniandes.pdf' },
    { date: 'Junio 2024', label: 'Boletín de junio de 2024', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-junio2024-observatorio-sp-uniandes.pdf' },
    { date: 'Abril 2024', label: 'Boletín de abril de 2024', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-abril2024-observatorio-sp-uniandes.pdf' },
    { date: 'Febrero 2024', label: 'Boletín de febrero de 2024', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/boletin-febrero2024-observatorio-sp-uniandes.pdf' },
  ],
}

export const memorias = {
  eyebrow: 'Memorias',
  title: 'Mayo 2026 — Programa: Innovar para proteger',
  links: [
    { label: 'Memoria técnica', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/2026-05-innovar-proteger/MEMORIA%20TECNICA%20PROGRAMA_INNOVAR%20PARA%20PROTEGER%202026.pdf' },
    { label: 'Briefing book', href: 'https://medicina.uniandes.edu.co/sites/default/files/observatorio-sp/2026-05-innovar-proteger/Briefing%20book.pdf' },
  ],
  related: {
    label: 'Sesiones del Club de Revistas en Salud Pública y Epidemiología 2026',
    href: 'https://medicina.uniandes.edu.co/es/noticias/club-de-revistas-salud-publica-epidemiologia-2026',
  },
}

export const contact = {
  eyebrow: 'Contacto',
  title: 'Hablemos de indicadores y política pública',
  coordinator: 'Luis Jorge Hernández — Coordinador',
  email: 'observatoriosp@uniandes.edu.co',
  twitter: { handle: '@analizarsalud', href: 'https://twitter.com/analizarsalud' },
  links: [
    { label: 'Observatorio de Gobernanza del Aire', href: 'https://gobernanzadelaire.uniandes.edu.co/' },
    { label: 'ASOCEPIC', href: 'https://asocepic.org/' },
  ],
}

export const footer = {
  institution: 'Universidad de los Andes',
  faculty: 'Facultad de Medicina',
  address: 'Carrera 1 No 18A – 10, Bloque Q, Piso 8, Bogotá, Colombia',
  phone: 'Teléfono (601) 332 4282',
  legal: [
    'Vigilada Mineducación',
    'Reconocimiento como Universidad: Decreto 1297 del 30 de mayo de 1964.',
    'Reconocimiento personería jurídica: Resolución 28 del 23 de febrero de 1949, Minjusticia.',
  ],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/mediuniandes/' },
    { label: 'X', href: 'https://twitter.com/MediUniandes' },
    { label: 'Facebook', href: 'https://www.facebook.com/MediUniandes' },
    { label: 'YouTube', href: 'https://www.youtube.com/mediuniandes' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/showcase/24975919/admin/' },
  ],
}
