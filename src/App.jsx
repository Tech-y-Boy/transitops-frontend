import DashboardShell from './components/layout/DashboardShell'

function App() {
  return (
    <DashboardShell title="Dashboard">
      <div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
        Dashboard content coming in Hour 2 🚀
      </div>
    </DashboardShell>
  )
}

export default App