import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { useVehicleStore } from './vehicleStore'
import VehicleTable from './components/VehicleTable'
import VehicleForm from '../../components/forms/VehicleForm'
import Modal from '../../components/common/Modal'

export default function VehicleRegistry() {
  const vehicles = useVehicleStore((s) => s.vehicles)
  const addVehicle = useVehicleStore((s) => s.addVehicle)
  const updateVehicle = useVehicleStore((s) => s.updateVehicle)
  const deleteVehicle = useVehicleStore((s) => s.deleteVehicle)

  const [search, setSearch] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)

  const filteredVehicles = useMemo(() => {
    if (!search.trim()) return vehicles
    const q = search.toLowerCase()
    return vehicles.filter(
      (v) =>
        v.regNumber.toLowerCase().includes(q) ||
        v.name.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q)
    )
  }, [vehicles, search])

  const openAddModal = () => {
    setEditingVehicle(null)
    setModalOpen(true)
  }

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle)
    setModalOpen(true)
  }

  const handleSubmit = (data) => {
    const success = editingVehicle
      ? updateVehicle(editingVehicle.id, data)
      : addVehicle(data)
    if (success) setModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Remove this vehicle from the registry?')) {
      deleteVehicle(id)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reg. number, name, type..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
        >
          <Plus size={16} />
          Register Vehicle
        </motion.button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <VehicleTable vehicles={filteredVehicles} onEdit={openEditModal} onDelete={handleDelete} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingVehicle ? 'Edit Vehicle' : 'Register New Vehicle'}
      >
        <VehicleForm
          initialData={editingVehicle}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  )
}