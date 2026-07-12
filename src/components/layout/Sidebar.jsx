import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  Fuel,
  BarChart3,
  ChevronLeft,
} from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Vehicles', icon: Truck, path: '/vehicles' },
  { label: 'Drivers', icon: Users, path: '/drivers' },
  { label: 'Trips', icon: Route, path: '/trips' },
  { label: 'Maintenance', icon: Wrench, path: '/maintenance' },
  { label: 'Expenses', icon: Fuel, path: '/expenses' },
  { label: 'Reports', icon: BarChart3, path: '/reports' },
]

export default function Sidebar({ activePath, onNavigate }) {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-screen sticky top-0 flex flex-col bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shrink-0">
          <Truck size={20} className="text-white" />
        </div>
        {isSidebarOpen && (
          <span className="font-display font-bold text-lg text-slate-800 dark:text-white tracking-tight">
            TransitOps
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activePath === item.path
          return (
            <button
              key={item.path}
              onClick={() => onNavigate?.(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative group
                ${isActive
                  ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-r-full"
                />
              )}
              <item.icon size={20} className="shrink-0" />
              {isSidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <motion.div animate={{ rotate: isSidebarOpen ? 0 : 180 }}>
            <ChevronLeft size={18} />
          </motion.div>
          {isSidebarOpen && <span className="text-xs font-medium">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  )
}