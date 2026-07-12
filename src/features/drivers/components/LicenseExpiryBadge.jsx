import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'

function getExpiryStatus(expiryDate) {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))

  if (daysLeft < 0) return { label: 'Expired', style: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400', icon: AlertTriangle }
  if (daysLeft <= 60) return { label: `Expires in ${daysLeft}d`, style: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', icon: Clock }
  return { label: 'Valid', style: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400', icon: CheckCircle2 }
}

export default function LicenseExpiryBadge({ expiryDate }) {
  const { label, style, icon: Icon } = getExpiryStatus(expiryDate)

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
      <Icon size={12} />
      {label}
    </span>
  )
}