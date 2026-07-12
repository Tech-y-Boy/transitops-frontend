import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const colorMap = {
  brand: 'from-brand-500 to-brand-600',
  success: 'from-emerald-500 to-emerald-600',
  warning: 'from-amber-500 to-amber-600',
  danger: 'from-rose-500 to-rose-600',
}

export default function KpiCard({ label, value, icon: Icon, color = 'brand', trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-display font-bold text-slate-800 dark:text-white">
            {value}
          </p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{Math.abs(trend)}% vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shrink-0`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </motion.div>
  )
}