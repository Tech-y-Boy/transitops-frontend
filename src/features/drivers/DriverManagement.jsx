import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { useDriverStore } from './driverStore'
import DriverTable from './components/DriverTable'
import DriverForm from '../../components/forms/DriverForm'
import Modal from '../../components/common/Modal'

export default function DriverManagement() {
  const drivers = useDriverStore((s) => s.drivers)
  const addDriver = useDriverStore((s) => s.addDriver)
  const updateDriver = useDriverStore((s) => s.updateDriver)
  const deleteDriver = useDriverStore((s) => s.deleteDriver)

  const [search, setSearch] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState(null)

  const filteredDrivers = useMemo(() => {
    if (!search.trim()) return drivers
    const q = search.toLowerCase()
    return drivers.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.licenseNumber.toLowerCase().includes(q)
    )
  }, [drivers, search])

  const openAddModal = () => {
    setEditingDriver(null)
    setModalOpen(true)
  }

  const openEditModal = (driver) => {
    setEditingDriver(driver)
    setModalOpen(true)
  }

  const handleSubmit = (data) => {
    const success = editingDriver
      ? updateDriver(editingDriver.id, data)
      : addDriver(data)
    if (success) setModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Remove this driver from the system?')) {
      deleteDriver(id)
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
            placeholder="Search by name or license..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
        >
          <Plus size={16} />
          Register Driver
        </motion.button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <DriverTable drivers={filteredDrivers} onEdit={openEditModal} onDelete={handleDelete} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDriver ? 'Edit Driver' : 'Register New Driver'}
      >
        <DriverForm
          initialData={editingDriver}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  )
}