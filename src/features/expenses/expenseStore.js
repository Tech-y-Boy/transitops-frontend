import { create } from 'zustand'
import { mockFuelLogs, mockExpenses } from '../../lib/mockData'
import { useMaintenanceStore } from '../maintenance/maintenanceStore'
import toast from 'react-hot-toast'

let fuelIdCounter = mockFuelLogs.length + 1
let expenseIdCounter = mockExpenses.length + 1

export const useExpenseStore = create((set, get) => ({
  fuelLogs: mockFuelLogs,
  expenses: mockExpenses,

  addFuelLog: (data) => {
    const newLog = {
      ...data,
      id: `F${String(fuelIdCounter++).padStart(3, '0')}`,
      liters: Number(data.liters),
      cost: Number(data.cost),
      date: data.date || new Date().toISOString().split('T')[0],
    }
    set({ fuelLogs: [...get().fuelLogs, newLog] })
    toast.success('Fuel log recorded')
  },

  addExpense: (data) => {
    const newExpense = {
      ...data,
      id: `E${String(expenseIdCounter++).padStart(3, '0')}`,
      amount: Number(data.amount),
      date: data.date || new Date().toISOString().split('T')[0],
    }
    set({ expenses: [...get().expenses, newExpense] })
    toast.success('Expense recorded')
  },

  // Total operational cost per vehicle = Fuel + Maintenance costs (per spec 3.7)
  getOperationalCost: (vehicleId) => {
    const { fuelLogs, expenses } = get()
    const { records } = useMaintenanceStore.getState()

    const fuelCost = fuelLogs
      .filter((f) => f.vehicleId === vehicleId)
      .reduce((sum, f) => sum + f.cost, 0)

    const maintenanceCost = records
      .filter((r) => r.vehicleId === vehicleId)
      .reduce((sum, r) => sum + r.cost, 0)

    const otherExpenses = expenses
      .filter((e) => e.vehicleId === vehicleId)
      .reduce((sum, e) => sum + e.amount, 0)

    return { fuelCost, maintenanceCost, otherExpenses, total: fuelCost + maintenanceCost + otherExpenses }
  },
}))