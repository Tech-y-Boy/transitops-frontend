import { Fuel } from 'lucide-react'

export default function FuelLogTable({ logs, vehicles }) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Fuel size={32} className="mb-2 opacity-40" />
        <p className="text-sm">No fuel logs yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="pb-3 font-medium">Vehicle</th>
            <th className="pb-3 font-medium">Liters</th>
            <th className="pb-3 font-medium">Cost</th>
            <th className="pb-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const vehicle = vehicles.find((v) => v.id === log.vehicleId)
            return (
              <tr key={log.id} className="border-b border-slate-100 dark:border-slate-800/60">
                <td className="py-3 text-slate-700 dark:text-slate-200 font-medium">{vehicle?.name || 'N/A'}</td>
                <td className="py-3 text-slate-500 dark:text-slate-400">{log.liters} L</td>
                <td className="py-3 text-slate-500 dark:text-slate-400">₹{log.cost.toLocaleString()}</td>
                <td className="py-3 text-slate-500 dark:text-slate-400">{log.date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}