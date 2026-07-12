import { useState } from 'react'
import { Gauge, Fuel } from 'lucide-react'

export default function DispatchModal({ trip, onConfirm, onCancel }) {
  const [finalOdometer, setFinalOdometer] = useState('')
  const [fuelConsumed, setFuelConsumed] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm({ finalOdometer, fuelConsumed })
  }

  const inputClass =
    'w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all'
  const labelClass = 'text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Completing trip <span className="font-semibold text-slate-700 dark:text-slate-200">{trip.id}</span> ({trip.source} → {trip.destination})
      </p>

      <div>
        <label className={labelClass}>Final Odometer Reading (km)</label>
        <div className="relative">
          <Gauge size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="number"
            value={finalOdometer}
            onChange={(e) => setFinalOdometer(e.target.value)}
            placeholder="45680"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Fuel Consumed (liters)</label>
        <div className="relative">
          <Fuel size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="number"
            value={fuelConsumed}
            onChange={(e) => setFuelConsumed(e.target.value)}
            placeholder="18"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
        >
          Mark Complete
        </button>
      </div>
    </form>
  )
}