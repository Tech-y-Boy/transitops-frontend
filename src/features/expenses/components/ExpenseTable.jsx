import { Receipt } from 'lucide-react'

const typeColors = {
  Toll: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  Maintenance: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Other: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
}

export default function ExpenseTable({ expenses, vehicles }) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Receipt size={32} className="mb-2 opacity-40" />
        <p className="text-sm">No expenses logged yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="pb-3 font-medium">Vehicle</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => {
            const vehicle = vehicles.find((v) => v.id === exp.vehicleId)
            return (
              <tr key={exp.id} className="border-b border-slate-100 dark:border-slate-800/60">
                <td className="py-3 text-slate-700 dark:text-slate-200 font-medium">{vehicle?.name || 'N/A'}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[exp.type] || typeColors.Other}`}>
                    {exp.type}
                  </span>
                </td>
                <td className="py-3 text-slate-500 dark:text-slate-400">₹{exp.amount.toLocaleString()}</td>
                <td className="py-3 text-slate-500 dark:text-slate-400">{exp.date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}