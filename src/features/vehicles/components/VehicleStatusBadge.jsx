const statusStyles = {
  Available: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'On Trip': 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'In Shop': 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Retired: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
}

const dotStyles = {
  Available: 'bg-emerald-500',
  'On Trip': 'bg-blue-500',
  'In Shop': 'bg-amber-500',
  Retired: 'bg-slate-400',
}

export default function VehicleStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.Retired}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status] || dotStyles.Retired}`} />
      {status}
    </span>
  )
}