import { biologicos, findBiologico } from '../data/dashboardData'

// xlsx (SheetJS) se carga de forma perezosa (dynamic import) para que los
// invitados, que nunca suben ni descargan Excel, no paguen ese peso en el
// bundle inicial. Solo se descarga cuando un administrador usa el panel.
let xlsxModulePromise = null
function loadXLSX() {
  xlsxModulePromise ??= import('xlsx')
  return xlsxModulePromise
}

// ---------------------------------------------------------------------------
// Formato esperado del Excel. Cada hoja es opcional: si el archivo subido
// solo trae, por ejemplo, la hoja "Cobertura", únicamente se actualiza ese
// gráfico y el resto de los datos queda como estaba. Los nombres de columna
// no distinguen mayúsculas/minúsculas ni tildes.
// ---------------------------------------------------------------------------

export const SHEET_NAMES = {
  coverage: 'Cobertura',
  goal: 'Meta',
  projection: 'Proyeccion',
  border: 'Frontera',
  compliance: 'Semaforizacion',
  respiratory: 'VirusRespiratorios',
  events: 'EventosInmunoprevenibles',
}

function normalizeKey(key) {
  return String(key)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function getField(row, ...names) {
  const normalizedRow = {}
  for (const key of Object.keys(row)) {
    normalizedRow[normalizeKey(key)] = row[key]
  }
  for (const name of names) {
    const value = normalizedRow[normalizeKey(name)]
    if (value !== undefined && value !== '') return value
  }
  return undefined
}

function toNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function toBoolean(value) {
  if (typeof value === 'boolean') return value
  const s = String(value ?? '').trim().toLowerCase()
  return ['si', 'sí', 'true', 'verdadero', '1', 'x'].includes(s)
}

function normalizeEstado(value) {
  const s = normalizeKey(value)
  if (['verde', 'green'].includes(s)) return 'green'
  if (['ambar', 'amber', 'amarillo'].includes(s)) return 'amber'
  if (['rojo', 'red'].includes(s)) return 'red'
  return 'amber'
}

function normalizeTendencia(value) {
  const s = normalizeKey(value)
  if (['sube', 'up', 'aumento', 'alza'].includes(s)) return 'up'
  if (['baja', 'down', 'disminucion', 'descenso'].includes(s)) return 'down'
  return 'stable'
}

function sheetRows(XLSX, workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName]
  if (!sheet) return null
  return XLSX.utils.sheet_to_json(sheet, { defval: '' })
}

/**
 * Lee un workbook de SheetJS y devuelve { data, summary, errors }.
 * `data` solo contiene las claves de las hojas presentes en el archivo,
 * para que el llamador pueda fusionarlas con el estado actual.
 */
export async function parseWorkbook(workbook) {
  const XLSX = await loadXLSX()
  const data = {}
  const summary = []
  const errors = []

  // --- Cobertura por territorio ---
  const coverageRows = sheetRows(XLSX, workbook, SHEET_NAMES.coverage)
  if (coverageRows) {
    const byBiologico = {}
    coverageRows.forEach((row, i) => {
      const bio = findBiologico(getField(row, 'Biologico', 'Biológico'))
      const territorio = getField(row, 'Territorio')
      const cobertura = getField(row, 'Cobertura')
      if (!bio || !territorio || cobertura === undefined) {
        errors.push(`Cobertura, fila ${i + 2}: falta biológico, territorio o cobertura.`)
        return
      }
      byBiologico[bio.id] ??= []
      byBiologico[bio.id].push({ territorio: String(territorio), cobertura: toNumber(cobertura) })
    })
    if (Object.keys(byBiologico).length) {
      data.coverageByTerritory = byBiologico
      summary.push(`Cobertura por territorio (${coverageRows.length} filas)`)
    }
  }

  // --- Meta por biológico ---
  const goalRows = sheetRows(XLSX, workbook, SHEET_NAMES.goal)
  if (goalRows) {
    const byBiologico = {}
    goalRows.forEach((row, i) => {
      const bio = findBiologico(getField(row, 'Biologico', 'Biológico'))
      const avance = getField(row, 'Avance')
      if (!bio || avance === undefined) {
        errors.push(`Meta, fila ${i + 2}: falta biológico o avance.`)
        return
      }
      byBiologico[bio.id] = {
        avance: toNumber(avance),
        poblacionObjetivo: String(getField(row, 'PoblacionObjetivo', 'Población objetivo') ?? ''),
        corte: String(getField(row, 'Corte') ?? ''),
      }
    })
    if (Object.keys(byBiologico).length) {
      data.goalByBiologico = byBiologico
      summary.push(`Meta por biológico (${goalRows.length} filas)`)
    }
  }

  // --- Proyección a fin de año ---
  const projectionRows = sheetRows(XLSX, workbook, SHEET_NAMES.projection)
  if (projectionRows) {
    const rows = projectionRows
      .map((row, i) => {
        const mes = getField(row, 'Mes')
        if (!mes) {
          errors.push(`Proyeccion, fila ${i + 2}: falta el mes.`)
          return null
        }
        return {
          mes: String(mes),
          influenza: toNumber(getField(row, 'Influenza')),
          fiebreAmarilla: toNumber(getField(row, 'FiebreAmarilla', 'Fiebre amarilla')),
          vph: toNumber(getField(row, 'VPH')),
          tripleViral: toNumber(getField(row, 'TripleViral', 'Triple viral')),
          proyectado: toBoolean(getField(row, 'Proyectado')),
        }
      })
      .filter(Boolean)
    if (rows.length) {
      data.yearEndProjection = rows
      summary.push(`Proyección a fin de año (${rows.length} filas)`)
    }
  }

  // --- Cobertura en frontera ---
  const borderRows = sheetRows(XLSX, workbook, SHEET_NAMES.border)
  if (borderRows) {
    const byBiologico = {}
    borderRows.forEach((row, i) => {
      const bio = findBiologico(getField(row, 'Biologico', 'Biológico'))
      const municipio = getField(row, 'Municipio')
      if (!bio || !municipio) {
        errors.push(`Frontera, fila ${i + 2}: falta biológico o municipio.`)
        return
      }
      byBiologico[bio.id] ??= []
      byBiologico[bio.id].push({
        municipio: String(municipio),
        frontera: toNumber(getField(row, 'Frontera')),
        nacional: toNumber(getField(row, 'Nacional')),
      })
    })
    if (Object.keys(byBiologico).length) {
      data.borderCoverage = byBiologico
      summary.push(`Cobertura en frontera (${borderRows.length} filas)`)
    }
  }

  // --- Semaforización de cumplimiento ---
  const complianceRows = sheetRows(XLSX, workbook, SHEET_NAMES.compliance)
  if (complianceRows) {
    const rows = complianceRows
      .map((row, i) => {
        const categoria = getField(row, 'Categoria', 'Categoría')
        if (!categoria) {
          errors.push(`Semaforizacion, fila ${i + 2}: falta la categoría.`)
          return null
        }
        const bio = findBiologico(getField(row, 'Biologico', 'Biológico'))
        return {
          categoria: String(categoria),
          estado: normalizeEstado(getField(row, 'Estado')),
          valor: toNumber(getField(row, 'Valor')),
          biologicoId: bio ? bio.id : biologicos[0].id,
        }
      })
      .filter(Boolean)
    if (rows.length) {
      data.complianceSemaphore = rows
      summary.push(`Semaforización de cumplimiento (${rows.length} filas)`)
    }
  }

  // --- Circulación de virus respiratorios ---
  const respiratoryRows = sheetRows(XLSX, workbook, SHEET_NAMES.respiratory)
  if (respiratoryRows) {
    const rows = respiratoryRows
      .map((row, i) => {
        const semana = getField(row, 'Semana')
        if (!semana) {
          errors.push(`VirusRespiratorios, fila ${i + 2}: falta la semana.`)
          return null
        }
        return {
          semana: String(semana),
          influenza: toNumber(getField(row, 'Influenza')),
          vsr: toNumber(getField(row, 'VSR')),
          covid: toNumber(getField(row, 'COVID', 'Covid')),
        }
      })
      .filter(Boolean)
    if (rows.length) {
      data.respiratoryVirusCirculation = rows
      summary.push(`Circulación de virus respiratorios (${rows.length} filas)`)
    }
  }

  // --- Eventos inmunoprevenibles ---
  const eventsRows = sheetRows(XLSX, workbook, SHEET_NAMES.events)
  if (eventsRows) {
    const rows = eventsRows
      .map((row, i) => {
        const evento = getField(row, 'Evento')
        if (!evento) {
          errors.push(`EventosInmunoprevenibles, fila ${i + 2}: falta el evento.`)
          return null
        }
        return {
          evento: String(evento),
          casos: toNumber(getField(row, 'Casos')),
          tendencia: normalizeTendencia(getField(row, 'Tendencia')),
        }
      })
      .filter(Boolean)
    if (rows.length) {
      data.immunopreventableEvents = rows
      summary.push(`Eventos inmunoprevenibles (${rows.length} filas)`)
    }
  }

  return { data, summary, errors }
}

/**
 * Construye un workbook de SheetJS a partir del estado actual del
 * dashboard, para que el administrador pueda descargarlo, editarlo y
 * volver a subirlo.
 */
export async function buildWorkbookFromData(dashboardData) {
  const XLSX = await loadXLSX()
  const wb = XLSX.utils.book_new()
  const labelOf = (id) => biologicos.find((b) => b.id === id)?.label ?? id

  const coverageRows = Object.entries(dashboardData.coverageByTerritory).flatMap(([bioId, rows]) =>
    rows.map((r) => ({ Biologico: labelOf(bioId), Territorio: r.territorio, Cobertura: r.cobertura })),
  )
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(coverageRows), SHEET_NAMES.coverage)

  const goalRows = Object.entries(dashboardData.goalByBiologico).map(([bioId, g]) => ({
    Biologico: labelOf(bioId),
    Avance: g.avance,
    PoblacionObjetivo: g.poblacionObjetivo,
    Corte: g.corte,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(goalRows), SHEET_NAMES.goal)

  const projectionRows = dashboardData.yearEndProjection.map((r) => ({
    Mes: r.mes,
    Influenza: r.influenza,
    FiebreAmarilla: r.fiebreAmarilla,
    VPH: r.vph,
    TripleViral: r.tripleViral,
    Proyectado: r.proyectado ? 'Si' : 'No',
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(projectionRows), SHEET_NAMES.projection)

  const borderRows = Object.entries(dashboardData.borderCoverage).flatMap(([bioId, rows]) =>
    rows.map((r) => ({
      Biologico: labelOf(bioId),
      Municipio: r.municipio,
      Frontera: r.frontera,
      Nacional: r.nacional,
    })),
  )
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(borderRows), SHEET_NAMES.border)

  const complianceRows = dashboardData.complianceSemaphore.map((r) => ({
    Categoria: r.categoria,
    Estado: { green: 'Verde', amber: 'Ambar', red: 'Rojo' }[r.estado] ?? r.estado,
    Valor: r.valor,
    Biologico: labelOf(r.biologicoId),
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(complianceRows), SHEET_NAMES.compliance)

  const respiratoryRows = dashboardData.respiratoryVirusCirculation.map((r) => ({
    Semana: r.semana,
    Influenza: r.influenza,
    VSR: r.vsr,
    COVID: r.covid,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(respiratoryRows), SHEET_NAMES.respiratory)

  const eventsRows = dashboardData.immunopreventableEvents.map((r) => ({
    Evento: r.evento,
    Casos: r.casos,
    Tendencia: { up: 'Sube', stable: 'Estable', down: 'Baja' }[r.tendencia] ?? r.tendencia,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(eventsRows), SHEET_NAMES.events)

  return wb
}

export async function readWorkbookFromFile(file) {
  const XLSX = await loadXLSX()
  const buffer = await file.arrayBuffer()
  return XLSX.read(buffer, { type: 'array' })
}

export async function downloadWorkbook(workbook, filename) {
  const XLSX = await loadXLSX()
  XLSX.writeFile(workbook, filename)
}
