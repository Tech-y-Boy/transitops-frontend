import { Pencil, Trash2, Gauge } from 'lucide-react'
import VehicleStatusBadge from './VehicleStatusBadge'

export default function VehicleTable({ vehicles, onEdit, onDelete }) {
  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <Gauge size={40} className="mb-3 opacity-40" />
        <p className="text-sm">No vehicles found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="pb-3 font-medium">Reg. Number</th>
            <th className="pb-3 font-medium">Name / Model</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium">Max Load</th>
            <th className="pb-3 font-medium">Odometer</th>
            <th className="pb-3 font-medium">Region</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr
              key={v.id}
              className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td className="py-3.5 font-medium text-slate-700 dark:text-slate-200">{v.regNumber}</td>
              <td className="py-3.5 text-slate-600 dark:text-slate-300">{v.name}</td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{v.type}</td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{v.maxLoad} kg</td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{v.odometer.toLocaleString()} km</td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{v.region}</td>
              <td className="py-3.5"><VehicleStatusBadge status={v.status} /></td>
              <td className="py-3.5">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(v)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(v.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-danger transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}