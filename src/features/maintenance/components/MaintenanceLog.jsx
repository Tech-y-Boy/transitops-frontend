import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wrench, X, Plus } from 'lucide-react'
import MaintenanceStatusBadge from './MaintenanceStatusBadge'

const maintenanceTypes = ['Oil Change', 'Tire Replacement', 'Brake Service', 'Engine Overhaul', 'General Inspection']

export default function MaintenanceLog({ records, vehicles, onCreate, onClose }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ vehicleId: '', type: 'Oil Change', cost: '' })

  const eligibleVehicles = vehicles.filter((v) => v.status !== 'On Trip' && v.status !== 'Retired')

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = onCreate(form)
    if (success) {
      setForm({ vehicleId: '', type: 'Oil Change', cost: '' })
      setShowForm(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all'
  const labelClass = 'text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">{records.length} maintenance records</p>
        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25"
        >
          <Plus size={16} />
          Log Maintenance
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="mb-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div>
            <label className={labelClass}>Vehicle ({eligibleVehicles.length} eligible)</label>
            <select
              value={form.vehicleId}
              onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
              required
              className={inputClass}
            >
              <option value="">Select vehicle</option>
              {eligibleVehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.name} ({v.regNumber})</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Maintenance Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={inputClass}
            >
              {maintenanceTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estimated Cost (₹)</label>
            <input
              type="number"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              placeholder="3500"
              required
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-3 flex gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold"
            >
              Create Record
            </button>
          </div>
        </motion.form>
      )}

      {records.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Wrench size={40} className="mb-3 opacity-40" />
          <p className="text-sm">No maintenance records</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((r) => {
            const vehicle = vehicles.find((v) => v.id === r.vehicleId)
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                    <Wrench size={16} className="text-amber-500" />
                  </div>
                  <MaintenanceStatusBadge status={r.status} />
                </div>
                <p className="font-medium text-slate-700 dark:text-slate-200 text-sm">{r.type}</p>
                <p className="text-xs text-slate-400 mt-0.5">{vehicle?.name || 'Unknown vehicle'} · {r.date}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white mt-2">₹{r.cost.toLocaleString()}</p>
                {r.status === 'Active' && (
                  <button
                    onClick={() => onClose(r.id)}
                    className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    <X size={13} />
                    Close Maintenance
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}