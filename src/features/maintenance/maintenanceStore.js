import { create } from 'zustand'
import { mockMaintenance } from '../../lib/mockData'
import { useVehicleStore } from '../vehicles/vehicleStore'
import toast from 'react-hot-toast'

let idCounter = mockMaintenance.length + 1

export const useMaintenanceStore = create((set, get) => ({
  records: mockMaintenance,

  // Creating an active maintenance record automatically flips vehicle to "In Shop"
  createRecord: (data) => {
    const { setVehicleStatus, vehicles } = useVehicleStore.getState()
    const vehicle = vehicles.find((v) => v.id === data.vehicleId)

    if (!vehicle) {
      toast.error('Vehicle not found')
      return false
    }
    if (vehicle.status === 'On Trip') {
      toast.error('Cannot log maintenance for a vehicle currently on trip')
      return false
    }

    const newRecord = {
      ...data,
      id: `M${String(idCounter++).padStart(3, '0')}`,
      cost: Number(data.cost),
      status: 'Active',
      date: data.date || new Date().toISOString().split('T')[0],
    }

    setVehicleStatus(data.vehicleId, 'In Shop')
    set({ records: [...get().records, newRecord] })
    toast.success('Maintenance logged — vehicle marked In Shop')
    return true
  },

  // Closing maintenance restores vehicle to Available (unless it was Retired)
  closeRecord: (recordId) => {
    const { records } = get()
    const record = records.find((r) => r.id === recordId)
    if (!record) return false

    const { setVehicleStatus, vehicles } = useVehicleStore.getState()
    const vehicle = vehicles.find((v) => v.id === record.vehicleId)

    if (vehicle && vehicle.status !== 'Retired') {
      setVehicleStatus(record.vehicleId, 'Available')
    }

    set({
      records: records.map((r) => (r.id === recordId ? { ...r, status: 'Closed' } : r)),
    })
    toast.success('Maintenance closed — vehicle available again')
    return true
  },

  deleteRecord: (recordId) => {
    set({ records: get().records.filter((r) => r.id !== recordId) })
  },
}))