import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardShell({ children, title, activePath, onNavigate }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar activePath={activePath} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}