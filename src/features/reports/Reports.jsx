import { useMemo } from 'react'
import { Gauge, TrendingUp, DollarSign, Fuel } from 'lucide-react'
import { useVehicleStore } from '../vehicles/vehicleStore'
import { useTripStore } from '../trips/tripStore'
import { useExpenseStore } from '../expenses/expenseStore'
import ReportCard from './components/ReportCard'
import ExportButton from './components/ExportButton'
import ROIChart from '../../components/charts/ROIChart'
import FuelEfficiencyChart from '../../components/charts/FuelEfficiencyChart'

export default function Reports() {
  const vehicles = useVehicleStore((s) => s.vehicles)
  const trips = useTripStore((s) => s.trips)
  const getOperationalCost = useExpenseStore((s) => s.getOperationalCost)

  const vehicleStats = useMemo(() => {
    return vehicles.map((v) => {
      const { fuelCost, maintenanceCost, total } = getOperationalCost(v.id)
      const vehicleTrips = trips.filter((t) => t.vehicleId === v.id && t.status === 'Completed')
      const totalDistance = vehicleTrips.reduce((sum, t) => sum + (t.distance || 0), 0)
      const totalFuel = vehicleTrips.reduce((sum, t) => sum + (t.fuelConsumed || 0), 0)
      const efficiency = totalFuel > 0 ? +(totalDistance / totalFuel).toFixed(1) : 0

      // Simplified revenue estimate: ₹15/km per completed trip (placeholder until backend provides real revenue)
      const revenue = totalDistance * 15
      const roi = v.acquisitionCost > 0 ? +(((revenue - total) / v.acquisitionCost) * 100).toFixed(1) : 0

      return {
        name: v.name,
        fuelCost,
        maintenanceCost,
        totalCost: total,
        efficiency,
        roi,
      }
    })
  }, [vehicles, trips, getOperationalCost])

  const activeVehicles = vehicles.filter((v) => v.status !== 'Retired').length
  const onTripVehicles = vehicles.filter((v) => v.status === 'On Trip').length
  const fleetUtilization = activeVehicles > 0 ? Math.round((onTripVehicles / activeVehicles) * 100) : 0
  const totalOperationalCost = vehicleStats.reduce((sum, v) => sum + v.totalCost, 0)
  const avgEfficiency = vehicleStats.filter((v) => v.efficiency > 0)
  const avgFuelEfficiency = avgEfficiency.length
    ? +(avgEfficiency.reduce((sum, v) => sum + v.efficiency, 0) / avgEfficiency.length).toFixed(1)
    : 0

  const roiChartData = vehicleStats.map((v) => ({ name: v.name, roi: v.roi }))
  const efficiencyChartData = vehicleStats
    .filter((v) => v.efficiency > 0)
    .map((v) => ({ name: v.name, efficiency: v.efficiency }))

  const exportData = vehicleStats.map((v) => ({
    Vehicle: v.name,
    'Fuel Cost': v.fuelCost,
    'Maintenance Cost': v.maintenanceCost,
    'Total Cost': v.totalCost,
    'Fuel Efficiency (km/L)': v.efficiency,
    'ROI (%)': v.roi,
  }))

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <ExportButton data={exportData} filename="transitops-fleet-report.csv" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ReportCard label="Fleet Utilization" value={`${fleetUtilization}%`} subtext="Vehicles currently on trip" icon={Gauge} delay={0} />
        <ReportCard label="Avg Fuel Efficiency" value={`${avgFuelEfficiency} km/L`} subtext="Across completed trips" icon={Fuel} delay={0.05} />
        <ReportCard label="Total Operational Cost" value={`₹${totalOperationalCost.toLocaleString()}`} subtext="Fuel + Maintenance" icon={DollarSign} delay={0.1} />
        <ReportCard label="Fleet Size" value={vehicles.length} subtext={`${activeVehicles} active`} icon={TrendingUp} delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ROIChart data={roiChartData} />
        <FuelEfficiencyChart data={efficiencyChartData} />
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">
          Per-Vehicle Cost Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="pb-3 font-medium">Vehicle</th>
                <th className="pb-3 font-medium">Fuel Cost</th>
                <th className="pb-3 font-medium">Maintenance Cost</th>
                <th className="pb-3 font-medium">Total Cost</th>
                <th className="pb-3 font-medium">Efficiency</th>
                <th className="pb-3 font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {vehicleStats.map((v) => (
                <tr key={v.name} className="border-b border-slate-100 dark:border-slate-800/60">
                  <td className="py-3 font-medium text-slate-700 dark:text-slate-200">{v.name}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">₹{v.fuelCost.toLocaleString()}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">₹{v.maintenanceCost.toLocaleString()}</td>
                  <td className="py-3 font-medium text-slate-700 dark:text-slate-200">₹{v.totalCost.toLocaleString()}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{v.efficiency || '—'} km/L</td>
                  <td className={`py-3 font-medium ${v.roi >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{v.roi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}