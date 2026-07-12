import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import DashboardShell from './components/layout/DashboardShell'
import Dashboard from './features/dashboard/Dashboard'
import VehicleRegistry from './features/vehicles/VehicleRegistry'
import DriverManagement from './features/drivers/DriverManagement'
import ProtectedRoute from './routes/ProtectedRoute'

const pageTitles = {
  '/': 'Dashboard',
  '/vehicles': 'Vehicle Registry',
  '/drivers': 'Driver Management',
  '/trips': 'Trip Management',
  '/maintenance': 'Maintenance',
  '/expenses': 'Fuel & Expenses',
  '/reports': 'Reports & Analytics',
}

function AppContent() {
  const [activePath, setActivePath] = useState('/')

  const renderPage = () => {
    switch (activePath) {
      case '/vehicles':
        return <VehicleRegistry />
      case '/drivers':
        return <DriverManagement />
      case '/':
        return <Dashboard />
      default:
        return (
          <div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
            {pageTitles[activePath]} coming soon 🚀
          </div>
        )
    }
  }

  return (
    <DashboardShell title={pageTitles[activePath]} activePath={activePath} onNavigate={setActivePath}>
      {renderPage()}
    </DashboardShell>
  )
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </>
  )
}

export default App