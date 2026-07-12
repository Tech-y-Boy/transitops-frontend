import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useTripStore } from './tripStore'
import TripCard from './components/TripCard'
import TripForm from '../../components/forms/TripForm'
import DispatchModal from './components/DispatchModal'
import Modal from '../../components/common/Modal'

const columns = [
  { key: 'Draft', label: 'Draft', color: 'text-slate-400' },
  { key: 'Dispatched', label: 'Dispatched', color: 'text-blue-500' },
  { key: 'Completed', label: 'Completed', color: 'text-emerald-500' },
  { key: 'Cancelled', label: 'Cancelled', color: 'text-rose-500' },
]

export default function TripManagement() {
  const trips = useTripStore((s) => s.trips)
  const createTrip = useTripStore((s) => s.createTrip)
  const dispatchTrip = useTripStore((s) => s.dispatchTrip)
  const completeTrip = useTripStore((s) => s.completeTrip)
  const cancelTrip = useTripStore((s) => s.cancelTrip)

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [completingTrip, setCompletingTrip] = useState(null)

  const tripsByStatus = useMemo(() => {
    const grouped = {}
    columns.forEach((col) => {
      grouped[col.key] = trips.filter((t) => t.status === col.key)
    })
    return grouped
  }, [trips])

  const handleCreate = (data) => {
    const success = createTrip(data)
    if (success) setCreateModalOpen(false)
  }

  const handleCompleteConfirm = ({ finalOdometer, fuelConsumed }) => {
    completeTrip(completingTrip.id, { finalOdometer, fuelConsumed })
    setCompletingTrip(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-400">
          {trips.length} total trips · {tripsByStatus.Dispatched.length} active
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
        >
          <Plus size={16} />
          Create Trip
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.key}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-sm font-semibold ${col.color}`}>{col.label}</span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {tripsByStatus[col.key].length}
              </span>
            </div>
            <div className="space-y-3">
              {tripsByStatus[col.key].length === 0 ? (
                <div className="text-xs text-slate-300 dark:text-slate-600 text-center py-8 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  No trips
                </div>
              ) : (
                tripsByStatus[col.key].map((trip, idx) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    delay={idx * 0.05}
                    onDispatch={dispatchTrip}
                    onComplete={setCompletingTrip}
                    onCancel={cancelTrip}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Trip">
        <TripForm onSubmit={handleCreate} onCancel={() => setCreateModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!completingTrip} onClose={() => setCompletingTrip(null)} title="Complete Trip">
        {completingTrip && (
          <DispatchModal
            trip={completingTrip}
            onConfirm={handleCompleteConfirm}
            onCancel={() => setCompletingTrip(null)}
          />
        )}
      </Modal>
    </div>
  )
}