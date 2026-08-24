// Configuración estática del dashboard (biológicos y su color) y el set de
// datos "semilla" que se muestra antes de que un administrador suba un
// Excel. Estos datos son ilustrativos — ver README para el formato del
// Excel que los reemplaza.

export const biologicos = [
  {
    id: 'influenza',
    label: 'Influenza',
    color: 'var(--teal)',
    colorSoft: 'rgba(31, 111, 107, 0.14)',
  },
  {
    id: 'fiebreAmarilla',
    label: 'Fiebre amarilla',
    color: 'var(--status-amber)',
    colorSoft: 'rgba(215, 162, 51, 0.16)',
  },
  {
    id: 'vph',
    label: 'VPH',
    color: 'var(--status-red)',
    colorSoft: 'rgba(193, 69, 46, 0.14)',
  },
  {
    id: 'tripleViral',
    label: 'Triple viral',
    color: '#6a4c93',
    colorSoft: 'rgba(106, 76, 147, 0.14)',
  },
]

export const defaultBiologicoId = biologicos[0].id

export function findBiologico(idOrLabel) {
  if (!idOrLabel) return null
  const needle = String(idOrLabel).trim().toLowerCase()
  return (
    biologicos.find((b) => b.id.toLowerCase() === needle) ||
    biologicos.find((b) => b.label.toLowerCase() === needle) ||
    null
  )
}

export function coverageStatus(value) {
  if (value >= 95) return 'green'
  if (value >= 80) return 'amber'
  return 'red'
}

// --- Dataset semilla ------------------------------------------------------
// Esta es la forma exacta que también produce el importador de Excel
// (ver src/lib/excelSchema.js), así que subir un archivo simplemente
// reemplaza (total o parcialmente) este mismo objeto en memoria.

export const defaultDashboardData = {
  // { [biologicoId]: [{ territorio, cobertura }] }
  coverageByTerritory: {
    influenza: [
      { territorio: 'Bogotá', cobertura: 96 },
      { territorio: 'Antioquia', cobertura: 91 },
      { territorio: 'Valle del Cauca', cobertura: 87 },
      { territorio: 'Atlántico', cobertura: 82 },
      { territorio: 'Santander', cobertura: 79 },
      { territorio: 'Nariño', cobertura: 74 },
      { territorio: 'Chocó', cobertura: 61 },
      { territorio: 'La Guajira', cobertura: 58 },
    ],
    fiebreAmarilla: [
      { territorio: 'Bogotá', cobertura: 88 },
      { territorio: 'Antioquia', cobertura: 84 },
      { territorio: 'Valle del Cauca', cobertura: 90 },
      { territorio: 'Atlántico', cobertura: 71 },
      { territorio: 'Santander', cobertura: 93 },
      { territorio: 'Nariño', cobertura: 96 },
      { territorio: 'Chocó', cobertura: 68 },
      { territorio: 'La Guajira', cobertura: 52 },
    ],
    vph: [
      { territorio: 'Bogotá', cobertura: 72 },
      { territorio: 'Antioquia', cobertura: 65 },
      { territorio: 'Valle del Cauca', cobertura: 58 },
      { territorio: 'Atlántico', cobertura: 55 },
      { territorio: 'Santander', cobertura: 61 },
      { territorio: 'Nariño', cobertura: 49 },
      { territorio: 'Chocó', cobertura: 38 },
      { territorio: 'La Guajira', cobertura: 33 },
    ],
    tripleViral: [
      { territorio: 'Bogotá', cobertura: 97 },
      { territorio: 'Antioquia', cobertura: 94 },
      { territorio: 'Valle del Cauca', cobertura: 92 },
      { territorio: 'Atlántico', cobertura: 89 },
      { territorio: 'Santander', cobertura: 90 },
      { territorio: 'Nariño', cobertura: 85 },
      { territorio: 'Chocó', cobertura: 73 },
      { territorio: 'La Guajira', cobertura: 66 },
    ],
  },

  // { [biologicoId]: { avance, poblacionObjetivo, corte } }
  goalByBiologico: {
    influenza: { avance: 78, poblacionObjetivo: '5+ millones', corte: 'corte a agosto de 2026' },
    fiebreAmarilla: { avance: 65, poblacionObjetivo: 'zonas de riesgo endémico', corte: 'corte a agosto de 2026' },
    vph: { avance: 55, poblacionObjetivo: 'niñas y niños 9–17 años', corte: 'corte a agosto de 2026' },
    tripleViral: { avance: 90, poblacionObjetivo: 'primera infancia', corte: 'corte a agosto de 2026' },
  },

  // [{ mes, influenza, fiebreAmarilla, vph, tripleViral, proyectado }]
  yearEndProjection: [
    { mes: 'Ene', influenza: 12, fiebreAmarilla: 8, vph: 5, tripleViral: 22, proyectado: false },
    { mes: 'Feb', influenza: 22, fiebreAmarilla: 15, vph: 11, tripleViral: 31, proyectado: false },
    { mes: 'Mar', influenza: 34, fiebreAmarilla: 24, vph: 18, tripleViral: 40, proyectado: false },
    { mes: 'Abr', influenza: 45, fiebreAmarilla: 33, vph: 26, tripleViral: 48, proyectado: false },
    { mes: 'May', influenza: 55, fiebreAmarilla: 42, vph: 34, tripleViral: 56, proyectado: false },
    { mes: 'Jun', influenza: 63, fiebreAmarilla: 50, vph: 41, tripleViral: 64, proyectado: false },
    { mes: 'Jul', influenza: 71, fiebreAmarilla: 58, vph: 48, tripleViral: 71, proyectado: false },
    { mes: 'Ago', influenza: 78, fiebreAmarilla: 65, vph: 55, tripleViral: 78, proyectado: false },
    { mes: 'Sep', influenza: 85, fiebreAmarilla: 72, vph: 62, tripleViral: 84, proyectado: true },
    { mes: 'Oct', influenza: 90, fiebreAmarilla: 79, vph: 69, tripleViral: 89, proyectado: true },
    { mes: 'Nov', influenza: 95, fiebreAmarilla: 86, vph: 77, tripleViral: 94, proyectado: true },
    { mes: 'Dic', influenza: 99, fiebreAmarilla: 92, vph: 84, tripleViral: 98, proyectado: true },
  ],

  // { [biologicoId]: [{ municipio, frontera, nacional }] }
  borderCoverage: {
    influenza: [
      { municipio: 'Maicao', frontera: 63, nacional: 84 },
      { municipio: 'Cúcuta', frontera: 71, nacional: 84 },
      { municipio: 'Ipiales', frontera: 68, nacional: 84 },
      { municipio: 'Leticia', frontera: 55, nacional: 84 },
      { municipio: 'Arauca', frontera: 66, nacional: 84 },
    ],
    fiebreAmarilla: [
      { municipio: 'Maicao', frontera: 70, nacional: 80 },
      { municipio: 'Cúcuta', frontera: 66, nacional: 80 },
      { municipio: 'Ipiales', frontera: 74, nacional: 80 },
      { municipio: 'Leticia', frontera: 61, nacional: 80 },
      { municipio: 'Arauca', frontera: 69, nacional: 80 },
    ],
    vph: [
      { municipio: 'Maicao', frontera: 41, nacional: 60 },
      { municipio: 'Cúcuta', frontera: 48, nacional: 60 },
      { municipio: 'Ipiales', frontera: 44, nacional: 60 },
      { municipio: 'Leticia', frontera: 33, nacional: 60 },
      { municipio: 'Arauca', frontera: 39, nacional: 60 },
    ],
    tripleViral: [
      { municipio: 'Maicao', frontera: 80, nacional: 92 },
      { municipio: 'Cúcuta', frontera: 84, nacional: 92 },
      { municipio: 'Ipiales', frontera: 79, nacional: 92 },
      { municipio: 'Leticia', frontera: 71, nacional: 92 },
      { municipio: 'Arauca', frontera: 82, nacional: 92 },
    ],
  },

  // [{ categoria, estado, valor, biologicoId }]
  complianceSemaphore: [
    { categoria: 'Esquema completo primera infancia', estado: 'green', valor: 96, biologicoId: 'tripleViral' },
    { categoria: 'Influenza población objetivo', estado: 'amber', valor: 78, biologicoId: 'influenza' },
    { categoria: 'Fiebre amarilla zonas de riesgo', estado: 'amber', valor: 72, biologicoId: 'fiebreAmarilla' },
    { categoria: 'VPH esquema completo', estado: 'red', valor: 55, biologicoId: 'vph' },
    { categoria: 'Refuerzos zona de frontera', estado: 'red', valor: 61, biologicoId: 'influenza' },
    { categoria: 'Triple viral segundo refuerzo', estado: 'green', valor: 91, biologicoId: 'tripleViral' },
  ],

  // [{ semana, influenza, vsr, covid }] — vigilancia, no se filtra por biológico
  respiratoryVirusCirculation: [
    { semana: 'S1', influenza: 8, vsr: 5, covid: 4 },
    { semana: 'S3', influenza: 11, vsr: 7, covid: 5 },
    { semana: 'S5', influenza: 15, vsr: 10, covid: 6 },
    { semana: 'S7', influenza: 21, vsr: 16, covid: 7 },
    { semana: 'S9', influenza: 28, vsr: 22, covid: 8 },
    { semana: 'S11', influenza: 24, vsr: 19, covid: 9 },
    { semana: 'S13', influenza: 18, vsr: 14, covid: 7 },
    { semana: 'S15', influenza: 13, vsr: 9, covid: 6 },
  ],

  // [{ evento, casos, tendencia }] — vigilancia, no se filtra por biológico
  immunopreventableEvents: [
    { evento: 'Tos ferina', casos: 142, tendencia: 'up' },
    { evento: 'Sarampión', casos: 3, tendencia: 'stable' },
    { evento: 'Parotiditis', casos: 58, tendencia: 'down' },
    { evento: 'Varicela', casos: 410, tendencia: 'up' },
    { evento: 'Hepatitis B aguda', casos: 21, tendencia: 'stable' },
    { evento: 'Meningitis Hib', casos: 6, tendencia: 'down' },
  ],
}
