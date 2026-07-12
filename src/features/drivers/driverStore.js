import { create } from 'zustand'
import { mockDrivers } from '../../lib/mockData'
import toast from 'react-hot-toast'

let idCounter = mockDrivers.length + 1

const isLicenseExpired = (expiryDate) => new Date(expiryDate) < new Date()

export const useDriverStore = create((set, get) => ({
  drivers: mockDrivers,

  addDriver: (driver) => {
    const { drivers } = get()
    const licenseExists = drivers.some(
      (d) => d.licenseNumber.toLowerCase() === driver.licenseNumber.toLowerCase()
    )
    if (licenseExists) {
      toast.error('License number already exists')
      return false
    }
    const newDriver = {
      ...driver,
      id: `D${String(idCounter++).padStart(3, '0')}`,
      status: 'Available',
      safetyScore: Number(driver.safetyScore) || 80,
    }
    set({ drivers: [...drivers, newDriver] })
    toast.success('Driver registered successfully')
    return true
  },

  updateDriver: (id, updates) => {
    const { drivers } = get()
    if (updates.licenseNumber) {
      const licenseExists = drivers.some(
        (d) => d.id !== id && d.licenseNumber.toLowerCase() === updates.licenseNumber.toLowerCase()
      )
      if (licenseExists) {
        toast.error('License number already exists')
        return false
      }
    }
    set({
      drivers: drivers.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })
    toast.success('Driver updated')
    return true
  },

  deleteDriver: (id) => {
    const { drivers } = get()
    set({ drivers: drivers.filter((d) => d.id !== id) })
    toast.success('Driver removed')
  },

  setDriverStatus: (id, status) => {
    const { drivers } = get()
    set({
      drivers: drivers.map((d) => (d.id === id ? { ...d, status } : d)),
    })
  },

  // Only drivers eligible for trip assignment: not Suspended, not expired license
  getAssignableDrivers: () => {
    return get().drivers.filter(
      (d) => d.status !== 'Suspended' && !isLicenseExpired(d.licenseExpiry)
    )
  },

  isLicenseExpired,
}))