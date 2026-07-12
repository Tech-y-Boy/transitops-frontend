import { create } from 'zustand'
import { mockTrips } from '../../lib/mockData'
import { useVehicleStore } from '../vehicles/vehicleStore'
import { useDriverStore } from '../drivers/driverStore'
import toast from 'react-hot-toast'

let idCounter = mockTrips.length + 1

export const useTripStore = create((set, get) => ({
  trips: mockTrips,

  // Create a trip in Draft status — validates cargo weight against vehicle capacity
  createTrip: (tripData) => {
    const { vehicles } = useVehicleStore.getState()
    const vehicle = vehicles.find((v) => v.id === tripData.vehicleId)

    if (!vehicle) {
      toast.error('Selected vehicle not found')
      return false
    }

    if (Number(tripData.cargoWeight) > vehicle.maxLoad) {
      toast.error(`Cargo weight (${tripData.cargoWeight}kg) exceeds vehicle capacity (${vehicle.maxLoad}kg)`)
      return false
    }

    const newTrip = {
      ...tripData,
      id: `T${String(idCounter++).padStart(3, '0')}`,
      cargoWeight: Number(tripData.cargoWeight),
      distance: Number(tripData.distance),
      status: 'Draft',
    }

    set({ trips: [...get().trips, newTrip] })
    toast.success('Trip created as Draft')
    return true
  },

  // Dispatch: validates vehicle & driver availability, then flips both to "On Trip"
  dispatchTrip: (tripId) => {
    const { trips } = get()
    const trip = trips.find((t) => t.id === tripId)
    if (!trip) return false

    const { vehicles, setVehicleStatus } = useVehicleStore.getState()
    const { drivers, setDriverStatus, isLicenseExpired } = useDriverStore.getState()

    const vehicle = vehicles.find((v) => v.id === trip.vehicleId)
    const driver = drivers.find((d) => d.id === trip.driverId)

    if (!vehicle || vehicle.status === 'Retired' || vehicle.status === 'In Shop') {
      toast.error('Vehicle is not available for dispatch')
      return false
    }
    if (vehicle.status === 'On Trip') {
      toast.error('Vehicle is already assigned to another trip')
      return false
    }
    if (!driver || driver.status === 'Suspended') {
      toast.error('Driver is suspended and cannot be dispatched')
      return false
    }
    if (isLicenseExpired(driver.licenseExpiry)) {
      toast.error('Driver license has expired')
      return false
    }
    if (driver.status === 'On Trip') {
      toast.error('Driver is already assigned to another trip')
      return false
    }

    setVehicleStatus(trip.vehicleId, 'On Trip')
    setDriverStatus(trip.driverId, 'On Trip')

    set({
      trips: trips.map((t) => (t.id === tripId ? { ...t, status: 'Dispatched' } : t)),
    })
    toast.success('Trip dispatched successfully')
    return true
  },

  // Complete: restores vehicle & driver to Available, records final odometer/fuel
  completeTrip: (tripId, { finalOdometer, fuelConsumed }) => {
    const { trips } = get()
    const trip = trips.find((t) => t.id === tripId)
    if (!trip) return false

    const { setVehicleStatus, vehicles } = useVehicleStore.getState()
    const { setDriverStatus } = useDriverStore.getState()

    setVehicleStatus(trip.vehicleId, 'Available')
    setDriverStatus(trip.driverId, 'Available')

    // update vehicle odometer if provided
    if (finalOdometer) {
      const vehicle = vehicles.find((v) => v.id === trip.vehicleId)
      if (vehicle) {
        useVehicleStore.getState().updateVehicle(trip.vehicleId, {
          odometer: Number(finalOdometer),
        })
      }
    }

    set({
      trips: trips.map((t) =>
        t.id === tripId
          ? { ...t, status: 'Completed', finalOdometer: Number(finalOdometer) || null, fuelConsumed: Number(fuelConsumed) || null }
          : t
      ),
    })
    toast.success('Trip completed')
    return true
  },

  // Cancel: restores vehicle & driver to Available if trip was dispatched
  cancelTrip: (tripId) => {
    const { trips } = get()
    const trip = trips.find((t) => t.id === tripId)
    if (!trip) return false

    if (trip.status === 'Dispatched') {
      const { setVehicleStatus } = useVehicleStore.getState()
      const { setDriverStatus } = useDriverStore.getState()
      setVehicleStatus(trip.vehicleId, 'Available')
      setDriverStatus(trip.driverId, 'Available')
    }

    set({
      trips: trips.map((t) => (t.id === tripId ? { ...t, status: 'Cancelled' } : t)),
    })
    toast.success('Trip cancelled')
    return true
  },

  deleteTrip: (tripId) => {
    set({ trips: get().trips.filter((t) => t.id !== tripId) })
  },
}))