export const mockVehicles = [
  { id: 'V001', regNumber: 'DL01AB1234', name: 'Van-05', type: 'Van', maxLoad: 500, odometer: 45210, acquisitionCost: 850000, status: 'Available', region: 'North' },
  { id: 'V002', regNumber: 'DL02CD5678', name: 'Truck-12', type: 'Truck', maxLoad: 2000, odometer: 98450, acquisitionCost: 1800000, status: 'On Trip', region: 'South' },
  { id: 'V003', regNumber: 'DL03EF9012', name: 'Van-08', type: 'Van', maxLoad: 500, odometer: 32100, acquisitionCost: 820000, status: 'In Shop', region: 'East' },
  { id: 'V004', regNumber: 'DL04GH3456', name: 'Truck-03', type: 'Truck', maxLoad: 3000, odometer: 120300, acquisitionCost: 2100000, status: 'Available', region: 'West' },
  { id: 'V005', regNumber: 'DL05IJ7890', name: 'Mini-Truck-01', type: 'Mini Truck', maxLoad: 1000, odometer: 21000, acquisitionCost: 650000, status: 'On Trip', region: 'North' },
  { id: 'V006', regNumber: 'DL06KL1122', name: 'Van-11', type: 'Van', maxLoad: 500, odometer: 8500, acquisitionCost: 870000, status: 'Retired', region: 'South' },
  { id: 'V007', regNumber: 'DL07MN3344', name: 'Truck-07', type: 'Truck', maxLoad: 2500, odometer: 67200, acquisitionCost: 1950000, status: 'Available', region: 'East' },
]

export const mockDrivers = [
  { id: 'D001', name: 'Alex Kumar', licenseNumber: 'DL-LIC-9081', licenseCategory: 'HMV', licenseExpiry: '2027-03-15', contact: '9876543210', safetyScore: 92, status: 'Available' },
  { id: 'D002', name: 'Priya Sharma', licenseNumber: 'DL-LIC-9082', licenseCategory: 'LMV', licenseExpiry: '2026-08-20', contact: '9876543211', safetyScore: 88, status: 'On Trip' },
  { id: 'D003', name: 'Rohit Verma', licenseNumber: 'DL-LIC-9083', licenseCategory: 'HMV', licenseExpiry: '2026-07-25', contact: '9876543212', safetyScore: 75, status: 'On Trip' },
  { id: 'D004', name: 'Sneha Patel', licenseNumber: 'DL-LIC-9084', licenseCategory: 'LMV', licenseExpiry: '2025-12-01', contact: '9876543213', safetyScore: 95, status: 'Suspended' },
  { id: 'D005', name: 'Vikram Singh', licenseNumber: 'DL-LIC-9085', licenseCategory: 'HMV', licenseExpiry: '2027-01-10', contact: '9876543214', safetyScore: 90, status: 'Available' },
  { id: 'D006', name: 'Anjali Gupta', licenseNumber: 'DL-LIC-9086', licenseCategory: 'LMV', licenseExpiry: '2026-11-30', contact: '9876543215', safetyScore: 82, status: 'Off Duty' },
]

export const mockTrips = [
  { id: 'T001', source: 'Delhi', destination: 'Jaipur', vehicleId: 'V002', driverId: 'D002', cargoWeight: 1800, distance: 280, status: 'Dispatched' },
  { id: 'T002', source: 'Delhi', destination: 'Chandigarh', vehicleId: 'V005', driverId: 'D003', cargoWeight: 900, distance: 250, status: 'Dispatched' },
  { id: 'T003', source: 'Mumbai', destination: 'Pune', vehicleId: 'V004', driverId: 'D001', cargoWeight: 2400, distance: 150, status: 'Completed' },
  { id: 'T004', source: 'Delhi', destination: 'Agra', vehicleId: 'V001', driverId: 'D005', cargoWeight: 400, distance: 230, status: 'Draft' },
  { id: 'T005', source: 'Bangalore', destination: 'Chennai', vehicleId: 'V007', driverId: 'D006', cargoWeight: 2100, distance: 350, status: 'Cancelled' },
]

export const mockFuelLogs = [
  { id: 'F001', vehicleId: 'V002', liters: 45, cost: 4500, date: '2026-07-10' },
  { id: 'F002', vehicleId: 'V004', liters: 60, cost: 6000, date: '2026-07-09' },
  { id: 'F003', vehicleId: 'V001', liters: 20, cost: 2000, date: '2026-07-08' },
]

export const mockExpenses = [
  { id: 'E001', vehicleId: 'V002', type: 'Toll', amount: 850, date: '2026-07-10' },
  { id: 'E002', vehicleId: 'V004', type: 'Maintenance', amount: 12000, date: '2026-07-05' },
  { id: 'E003', vehicleId: 'V001', type: 'Toll', amount: 320, date: '2026-07-08' },
]

export const mockMaintenance = [
  { id: 'M001', vehicleId: 'V003', type: 'Oil Change', status: 'Active', cost: 3500, date: '2026-07-11' },
  { id: 'M002', vehicleId: 'V006', type: 'Engine Overhaul', status: 'Active', cost: 45000, date: '2026-07-01' },
]

export const weeklyUtilization = [
  { day: 'Mon', utilization: 62 },
  { day: 'Tue', utilization: 68 },
  { day: 'Wed', utilization: 71 },
  { day: 'Thu', utilization: 65 },
  { day: 'Fri', utilization: 78 },
  { day: 'Sat', utilization: 55 },
  { day: 'Sun', utilization: 40 },
]