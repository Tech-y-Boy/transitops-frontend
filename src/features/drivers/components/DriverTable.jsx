import { Pencil, Trash2, Users, ShieldCheck } from 'lucide-react'
import LicenseExpiryBadge from './LicenseExpiryBadge'

const statusStyles = {
  Available: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'On Trip': 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'Off Duty': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  Suspended: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
}

function SafetyScore({ score }) {
  const color = score >= 85 ? 'text-emerald-500' : score >= 70 ? 'text-amber-500' : 'text-rose-500'
  return (
    <div className="flex items-center gap-1.5">
      <ShieldCheck size={14} className={color} />
      <span className={`font-medium ${color}`}>{score}</span>
    </div>
  )
}

export default function DriverTable({ drivers, onEdit, onDelete }) {
  if (drivers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <Users size={40} className="mb-3 opacity-40" />
        <p className="text-sm">No drivers found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">License No.</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">License Status</th>
            <th className="pb-3 font-medium">Safety Score</th>
            <th className="pb-3 font-medium">Contact</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr
              key={d.id}
              className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td className="py-3.5 font-medium text-slate-700 dark:text-slate-200">{d.name}</td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{d.licenseNumber}</td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{d.licenseCategory}</td>
              <td className="py-3.5"><LicenseExpiryBadge expiryDate={d.licenseExpiry} /></td>
              <td className="py-3.5"><SafetyScore score={d.safetyScore} /></td>
              <td className="py-3.5 text-slate-500 dark:text-slate-400">{d.contact}</td>
              <td className="py-3.5">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[d.status]}`}>
                  {d.status}
                </span>
              </td>
              <td className="py-3.5">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(d)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(d.id)}
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