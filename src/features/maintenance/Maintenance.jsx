import { useMaintenanceStore } from './maintenanceStore'
import { useVehicleStore } from '../vehicles/vehicleStore'
import MaintenanceLog from './components/MaintenanceLog'

export default function Maintenance() {
  const records = useMaintenanceStore((s) => s.records)
  const createRecord = useMaintenanceStore((s) => s.createRecord)
  const closeRecord = useMaintenanceStore((s) => s.closeRecord)
  const vehicles = useVehicleStore((s) => s.vehicles)

  return (
    <MaintenanceLog
      records={records}
      vehicles={vehicles}
      onCreate={createRecord}
      onClose={closeRecord}
    />
  )
}