import { Toaster } from 'react-hot-toast'
import DashboardShell from './components/layout/DashboardShell'
import Dashboard from './features/dashboard/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ProtectedRoute>
        <DashboardShell title="Dashboard">
          <Dashboard />
        </DashboardShell>
      </ProtectedRoute>
    </>
  )
}

export default App