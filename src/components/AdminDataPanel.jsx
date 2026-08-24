import { useRef, useState } from 'react'
import { useDashboardData } from '../context/DashboardDataContext'
import { parseWorkbook, buildWorkbookFromData, readWorkbookFromFile, downloadWorkbook, SHEET_NAMES } from '../lib/excelSchema'
import './AdminDataPanel.css'

export default function AdminDataPanel() {
  const { data, lastUpdate, mergeData, resetData } = useDashboardData()
  const fileInputRef = useRef(null)
  const [status, setStatus] = useState(null) // { kind: 'success'|'error', summary, errors }
  const [isLoading, setIsLoading] = useState(false)

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setIsLoading(true)
    setStatus(null)
    try {
      const workbook = await readWorkbookFromFile(file)
      const { data: partialData, summary, errors } = await parseWorkbook(workbook)

      if (!summary.length) {
        setStatus({
          kind: 'error',
          summary: [],
          errors: [
            `No se reconoció ninguna hoja válida. Usa alguno de estos nombres: ${Object.values(SHEET_NAMES).join(', ')}.`,
          ],
        })
      } else {
        mergeData(partialData)
        setStatus({ kind: 'success', summary, errors })
      }
    } catch (err) {
      setStatus({ kind: 'error', summary: [], errors: [`No se pudo leer el archivo: ${err.message}`] })
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleDownloadTemplate() {
    const workbook = await buildWorkbookFromData(data)
    await downloadWorkbook(workbook, 'observatorio-plantilla-datos.xlsx')
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <div>
          <span className="admin-panel__badge">Modo administrador</span>
          <h3>Actualizar datos del dashboard</h3>
          <p>
            Sube un Excel (.xlsx) con una o varias de estas hojas: {Object.values(SHEET_NAMES).join(', ')}.
            Solo se actualizan las hojas presentes en el archivo; el resto de los datos se conserva.
          </p>
        </div>
        {lastUpdate && (
          <span className="admin-panel__timestamp">
            Última actualización: {lastUpdate.toLocaleString('es-CO')}
          </span>
        )}
      </div>

      <div className="admin-panel__actions">
        <label className="btn btn-primary admin-panel__upload">
          {isLoading ? 'Leyendo archivo…' : 'Subir Excel'}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            disabled={isLoading}
            hidden
          />
        </label>
        <button type="button" className="btn btn-outline" onClick={handleDownloadTemplate}>
          Descargar plantilla con los datos actuales
        </button>
        <button type="button" className="btn btn-outline admin-panel__reset" onClick={resetData}>
          Restablecer datos de ejemplo
        </button>
      </div>

      {status && (
        <div className={`admin-panel__status admin-panel__status--${status.kind}`}>
          {status.summary.length > 0 && (
            <div>
              <p className="admin-panel__status-title">Actualizado:</p>
              <ul>
                {status.summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
          {status.errors.length > 0 && (
            <div>
              <p className="admin-panel__status-title">
                {status.kind === 'error' ? 'No se pudo actualizar:' : 'Filas omitidas:'}
              </p>
              <ul>
                {status.errors.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
