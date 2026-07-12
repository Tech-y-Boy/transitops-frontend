import DashboardShell from './components/layout/DashboardShell'
import Dashboard from './features/dashboard/Dashboard'

function App() {
  return (
    <DashboardShell title="Dashboard">
      <Dashboard />
    </DashboardShell>
  )
}

export default App