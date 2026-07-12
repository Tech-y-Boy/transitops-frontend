import { motion } from 'framer-motion'
import { Sun, Moon, Bell, Search } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

export default function Topbar({ title = 'Dashboard', userName = 'Fleet Manager' }) {
  const isDarkMode = useUIStore((s) => s.isDarkMode)
  const toggleDarkMode = useUIStore((s) => s.toggleDarkMode)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 className="font-display font-semibold text-xl text-slate-800 dark:text-white">
          {title}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-400 w-56">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <motion.div
            key={isDarkMode ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-semibold">
            {userName.charAt(0)}
          </div>
          <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200">
            {userName}
          </span>
        </div>
      </div>
    </header>
  )
}