import { create } from 'zustand'

// Mock users for RBAC demo — in production this would come from the backend
const mockUsers = [
  { email: 'fleet@transitops.com', password: 'fleet123', name: 'Ramesh Iyer', role: 'Fleet Manager' },
  { email: 'driver@transitops.com', password: 'driver123', name: 'Alex Kumar', role: 'Driver' },
  { email: 'safety@transitops.com', password: 'safety123', name: 'Meena Rao', role: 'Safety Officer' },
  { email: 'finance@transitops.com', password: 'finance123', name: 'Karan Mehta', role: 'Financial Analyst' },
]

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('transitops-user')) || null,
  isAuthenticated: !!localStorage.getItem('transitops-user'),
  error: null,

  login: (email, password) => {
    const found = mockUsers.find((u) => u.email === email && u.password === password)
    if (!found) {
      set({ error: 'Invalid email or password' })
      return false
    }
    const userData = { name: found.name, email: found.email, role: found.role }
    localStorage.setItem('transitops-user', JSON.stringify(userData))
    set({ user: userData, isAuthenticated: true, error: null })
    return true
  },

  logout: () => {
    localStorage.removeItem('transitops-user')
    set({ user: null, isAuthenticated: false })
  },

  clearError: () => set({ error: null }),
}))