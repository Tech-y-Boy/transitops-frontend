import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Package, Gauge, Rocket, CheckCircle2, XCircle } from 'lucide-react'
import TripStatusStepper from './TripStatusStepper'
import { useVehicleStore } from '../../vehicles/vehicleStore'
import { useDriverStore } from '../../drivers/driverStore'

export default function TripCard({ trip, onDispatch, onComplete, onCancel, delay = 0 }) {
  const vehicles = useVehicleStore((s) => s.vehicles)
  const drivers = useDriverStore((s) => s.drivers)

  const vehicle = vehicles.find((v) => v.id === trip.vehicleId)
  const driver = drivers.find((d) => d.id === trip.driverId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <TripStatusStepper status={trip.status} />
        <span className="text-xs text-slate-400 font-medium">{trip.id}</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <MapPin size={16} className="text-brand-500" />
        <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">{trip.source}</span>
        <ArrowRight size={14} className="text-slate-300" />
        <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">{trip.destination}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Package size={13} />
          {trip.cargoWeight}kg cargo
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Gauge size={13} />
          {trip.distance}km distance
        </div>
        <div className="text-slate-500 dark:text-slate-400">
          🚚 {vehicle?.name || 'N/A'}
        </div>
        <div className="text-slate-500 dark:text-slate-400">
          👤 {driver?.name || 'N/A'}
        </div>
      </div>

      {trip.status === 'Draft' && (
        <button
          onClick={() => onDispatch(trip.id)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all"
        >
          <Rocket size={14} />
          Dispatch Trip
        </button>
      )}

      {trip.status === 'Dispatched' && (
        <div className="flex gap-2">
          <button
            onClick={() => onComplete(trip)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors"
          >
            <CheckCircle2 size={14} />
            Complete
          </button>
          <button
            onClick={() => onCancel(trip.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-500 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          >
            <XCircle size={14} />
            Cancel
          </button>
        </div>
      )}
    </motion.div>
  )
}