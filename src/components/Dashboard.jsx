import { useState } from 'react'
import { viewer } from '../data/content'
import { biologicos, defaultBiologicoId } from '../data/dashboardData'
import { useDashboardData } from '../context/DashboardDataContext'
import { useRole } from '../context/RoleContext'
import BiologicoSelector from './BiologicoSelector'
import AdminDataPanel from './AdminDataPanel'
import KpiStats from './KpiStats'
import DashboardTabs, { TABS } from './DashboardTabs'
import CoverageByTerritoryChart from './charts/CoverageByTerritoryChart'
import BiologicoGoalChart from './charts/BiologicoGoalChart'
import ComplianceSemaphoreChart from './charts/ComplianceSemaphoreChart'
import YearEndProjectionChart from './charts/YearEndProjectionChart'
import BorderCoverageChart from './charts/BorderCoverageChart'
import RespiratoryVirusChart from './charts/RespiratoryVirusChart'
import ImmunopreventableEventsChart from './charts/ImmunopreventableEventsChart'
import './charts/charts-shared.css'
import './Dashboard.css'

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState(defaultBiologicoId)
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const biologico = biologicos.find((b) => b.id === selectedId) ?? biologicos[0]
  const { data } = useDashboardData()
  const { isAdmin } = useRole()

  const coverageRows = data.coverageByTerritory[biologico.id]
  const goal = data.goalByBiologico[biologico.id]
  const borderRows = data.borderCoverage[biologico.id]
  const activeTabMeta = TABS.find((t) => t.id === activeTab) ?? TABS[0]

  return (
    <section id="visor" className="dashboard">
      <div className="container">
        <div className="dashboard__head">
          <div className="section-head">
            <span className="eyebrow">{viewer.eyebrow}</span>
            <h2>{viewer.title}</h2>
            <p className="dashboard__intro">
              Indicadores construidos con componentes de React (Recharts) en vez del
              visor embebido de Power BI. Elige un biológico para filtrar los
              gráficos y navega por pestañas según el tema que quieras explorar.
            </p>
          </div>
          <span className="dashboard__badge">Datos ilustrativos</span>
        </div>

        {isAdmin && <AdminDataPanel />}

        <div className="dashboard__controls">
          <div className="dashboard__filter">
            <span className="dashboard__filter-label">Biológico</span>
            <BiologicoSelector selectedId={selectedId} onChange={setSelectedId} />
          </div>
        </div>

        <KpiStats
          biologico={biologico}
          coverageRows={coverageRows}
          goal={goal}
          borderRows={borderRows}
          events={data.immunopreventableEvents}
        />

        <DashboardTabs activeId={activeTab} onChange={setActiveTab} />

        <div className="dashboard__jumbotron">
          <span className="dashboard__jumbotron-eyebrow">{activeTabMeta.label}</span>
          <h3 className="dashboard__jumbotron-title">{activeTabMeta.title}</h3>
          <p className="dashboard__jumbotron-desc">{activeTabMeta.description}</p>

          {activeTab === 'cobertura' && (
            <div className="dashboard__grid dashboard__grid--panel">
              <CoverageByTerritoryChart biologico={biologico} data={coverageRows} />
              <BiologicoGoalChart biologico={biologico} goal={goal} />
            </div>
          )}

          {activeTab === 'frontera' && (
            <div className="dashboard__grid dashboard__grid--panel">
              <BorderCoverageChart biologico={biologico} data={borderRows} />
              <ComplianceSemaphoreChart biologico={biologico} items={data.complianceSemaphore} />
            </div>
          )}

          {activeTab === 'proyeccion' && (
            <div className="dashboard__grid dashboard__grid--panel">
              <YearEndProjectionChart biologico={biologico} data={data.yearEndProjection} />
            </div>
          )}

          {activeTab === 'vigilancia' && (
            <div className="dashboard__grid dashboard__grid--panel">
              <RespiratoryVirusChart data={data.respiratoryVirusCirculation} />
              <ImmunopreventableEventsChart data={data.immunopreventableEvents} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
