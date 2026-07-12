import { useMemo, useState } from 'react'
import { Truck, CheckCircle2, Wrench, Route, Clock, Users, Gauge } from 'lucide-react'
import KpiCard from './components/KpiCard'
import FilterBar from './components/FilterBar'
import UtilizationChart from '../../components/charts/UtilizationChart'
import {
  mockVehicles,
  mockDrivers,
  mockTrips,
  weeklyUtilization,
} from '../../lib/mockData'

export default function Dashboard() {
  const [filters, setFilters] = useState({
    type: 'All Types',
    status: 'All Status',
    region: 'All Regions',
  })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter((v) => {
      const typeMatch = filters.type === 'All Types' || v.type === filters.type
      const statusMatch = filters.status === 'All Status' || v.status === filters.status
      const regionMatch = filters.region === 'All Regions' || v.region === filters.region
      return typeMatch && statusMatch && regionMatch
    })
  }, [filters])

  const kpis = useMemo(() => {
    const activeVehicles = filteredVehicles.filter((v) => v.status !== 'Retired').length
    const availableVehicles = filteredVehicles.filter((v) => v.status === 'Available').length
    const inMaintenance = filteredVehicles.filter((v) => v.status === 'In Shop').length
    const activeTrips = mockTrips.filter((t) => t.status === 'Dispatched').length
    const pendingTrips = mockTrips.filter((t) => t.status === 'Draft').length
    const driversOnDuty = mockDrivers.filter((d) => d.status === 'On Trip' || d.status === 'Available').length
    const utilization = activeVehicles > 0
      ? Math.round((filteredVehicles.filter((v) => v.status === 'On Trip').length / activeVehicles) * 100)
      : 0

    return { activeVehicles, availableVehicles, inMaintenance, activeTrips, pendingTrips, driversOnDuty, utilization }
  }, [filteredVehicles])

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Active Vehicles" value={kpis.activeVehicles} icon={Truck} color="brand" delay={0} />
        <KpiCard label="Available Vehicles" value={kpis.availableVehicles} icon={CheckCircle2} color="success" delay={0.05} />
        <KpiCard label="In Maintenance" value={kpis.inMaintenance} icon={Wrench} color="warning" delay={0.1} />
        <KpiCard label="Active Trips" value={kpis.activeTrips} icon={Route} color="brand" delay={0.15} />
        <KpiCard label="Pending Trips" value={kpis.pendingTrips} icon={Clock} color="warning" delay={0.2} />
        <KpiCard label="Drivers On Duty" value={kpis.driversOnDuty} icon={Users} color="success" delay={0.25} />
        <KpiCard label="Fleet Utilization" value={`${kpis.utilization}%`} icon={Gauge} color="danger" trend={4.2} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <UtilizationChart data={weeklyUtilization} />
        </div>
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">
            Vehicle Status Breakdown
          </h3>
          <div className="space-y-3">
            {['Available', 'On Trip', 'In Shop', 'Retired'].map((status) => {
              const count = filteredVehicles.filter((v) => v.status === status).length
              const total = filteredVehicles.length || 1
              const pct = Math.round((count / total) * 100)
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">{status}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}