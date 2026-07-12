import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Fuel, Receipt, TrendingUp } from 'lucide-react'
import { useExpenseStore } from './expenseStore'
import { useVehicleStore } from '../vehicles/vehicleStore'
import FuelLogTable from './components/FuelLogTable'
import ExpenseTable from './components/ExpenseTable'
import Modal from '../../components/common/Modal'

export default function Expenses() {
  const fuelLogs = useExpenseStore((s) => s.fuelLogs)
  const expenses = useExpenseStore((s) => s.expenses)
  const addFuelLog = useExpenseStore((s) => s.addFuelLog)
  const addExpense = useExpenseStore((s) => s.addExpense)
  const vehicles = useVehicleStore((s) => s.vehicles)

  const [activeTab, setActiveTab] = useState('fuel')
  const [modalType, setModalType] = useState(null) // 'fuel' | 'expense' | null

  const [fuelForm, setFuelForm] = useState({ vehicleId: '', liters: '', cost: '' })
  const [expenseForm, setExpenseForm] = useState({ vehicleId: '', type: 'Toll', amount: '' })

  const totalFuelCost = fuelLogs.reduce((sum, f) => sum + f.cost, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all'
  const labelClass = 'text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'

  const handleFuelSubmit = (e) => {
    e.preventDefault()
    addFuelLog(fuelForm)
    setFuelForm({ vehicleId: '', liters: '', cost: '' })
    setModalType(null)
  }

  const handleExpenseSubmit = (e) => {
    e.preventDefault()
    addExpense(expenseForm)
    setExpenseForm({ vehicleId: '', type: 'Toll', amount: '' })
    setModalType(null)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
            <Fuel size={14} /> Total Fuel Cost
          </div>
          <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">₹{totalFuelCost.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
            <Receipt size={14} /> Other Expenses
          </div>
          <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
            <TrendingUp size={14} /> Combined Total
          </div>
          <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">₹{(totalFuelCost + totalExpenses).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('fuel')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'fuel' ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'}`}
          >
            Fuel Logs
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'expenses' ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'}`}
          >
            Other Expenses
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setModalType(activeTab === 'fuel' ? 'fuel' : 'expense')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25"
        >
          <Plus size={16} />
          {activeTab === 'fuel' ? 'Log Fuel' : 'Log Expense'}
        </motion.button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        {activeTab === 'fuel' ? (
          <FuelLogTable logs={fuelLogs} vehicles={vehicles} />
        ) : (
          <ExpenseTable expenses={expenses} vehicles={vehicles} />
        )}
      </div>

      <Modal isOpen={modalType === 'fuel'} onClose={() => setModalType(null)} title="Log Fuel Entry">
        <form onSubmit={handleFuelSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Vehicle</label>
            <select
              value={fuelForm.vehicleId}
              onChange={(e) => setFuelForm({ ...fuelForm, vehicleId: e.target.value })}
              required
              className={inputClass}
            >
              <option value="">Select vehicle</option>
              {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Liters</label>
              <input type="number" value={fuelForm.liters} onChange={(e) => setFuelForm({ ...fuelForm, liters: e.target.value })} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Cost (₹)</label>
              <input type="number" value={fuelForm.cost} onChange={(e) => setFuelForm({ ...fuelForm, cost: e.target.value })} required className={inputClass} />
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold">
            Save Fuel Log
          </button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'expense'} onClose={() => setModalType(null)} title="Log Expense">
        <form onSubmit={handleExpenseSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Vehicle</label>
            <select
              value={expenseForm.vehicleId}
              onChange={(e) => setExpenseForm({ ...expenseForm, vehicleId: e.target.value })}
              required
              className={inputClass}
            >
              <option value="">Select vehicle</option>
              {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type</label>
              <select value={expenseForm.type} onChange={(e) => setExpenseForm({ ...expenseForm, type: e.target.value })} className={inputClass}>
                <option value="Toll">Toll</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Amount (₹)</label>
              <input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} required className={inputClass} />
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold">
            Save Expense
          </button>
        </form>
      </Modal>
    </div>
  )
}