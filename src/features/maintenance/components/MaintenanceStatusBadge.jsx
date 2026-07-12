const styles = {
  Active: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Closed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
}

export default function MaintenanceStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}