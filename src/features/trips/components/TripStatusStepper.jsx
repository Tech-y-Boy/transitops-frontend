import { Check, X } from 'lucide-react'

const stages = ['Draft', 'Dispatched', 'Completed']

export default function TripStatusStepper({ status }) {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 text-rose-500 text-xs font-medium">
        <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
          <X size={12} />
        </div>
        Cancelled
      </div>
    )
  }

  const currentIndex = stages.indexOf(status)

  return (
    <div className="flex items-center">
      {stages.map((stage, idx) => {
        const isDone = idx < currentIndex
        const isCurrent = idx === currentIndex
        return (
          <div key={stage} className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors
                ${isDone ? 'bg-brand-500 text-white' : isCurrent ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}
              `}
            >
              {isDone ? <Check size={11} /> : idx + 1}
            </div>
            {idx < stages.length - 1 && (
              <div className={`w-6 h-0.5 ${isDone ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </div>
        )
      })}
      <span className="ml-2 text-xs font-medium text-slate-600 dark:text-slate-300">{status}</span>
    </div>
  )
}