import { create } from 'zustand'
import { mockVehicles } from '../../lib/mockData'
import toast from 'react-hot-toast'

let idCounter = mockVehicles.length + 1

export const useVehicleStore = create((set, get) => ({
  vehicles: mockVehicles,

  addVehicle: (vehicle) => {
    const { vehicles } = get()
    const regExists = vehicles.some(
      (v) => v.regNumber.toLowerCase() === vehicle.regNumber.toLowerCase()
    )
    if (regExists) {
      toast.error('Registration number already exists')
      return false
    }
    const newVehicle = {
      ...vehicle,
      id: `V${String(idCounter++).padStart(3, '0')}`,
      status: 'Available',
      odometer: Number(vehicle.odometer) || 0,
    }
    set({ vehicles: [...vehicles, newVehicle] })
    toast.success('Vehicle registered successfully')
    return true
  },

  updateVehicle: (id, updates) => {
    const { vehicles } = get()
    if (updates.regNumber) {
      const regExists = vehicles.some(
        (v) => v.id !== id && v.regNumber.toLowerCase() === updates.regNumber.toLowerCase()
      )
      if (regExists) {
        toast.error('Registration number already exists')
        return false
      }
    }
    set({
      vehicles: vehicles.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    })
    toast.success('Vehicle updated')
    return true
  },

  deleteVehicle: (id) => {
    const { vehicles } = get()
    set({ vehicles: vehicles.filter((v) => v.id !== id) })
    toast.success('Vehicle removed')
  },

  setVehicleStatus: (id, status) => {
    const { vehicles } = get()
    set({
      vehicles: vehicles.map((v) => (v.id === id ? { ...v, status } : v)),
    })
  },

  // Only vehicles eligible for dispatch selection (excludes Retired & In Shop)
  getDispatchableVehicles: () => {
    return get().vehicles.filter(
      (v) => v.status !== 'Retired' && v.status !== 'In Shop'
    )
  },
}))