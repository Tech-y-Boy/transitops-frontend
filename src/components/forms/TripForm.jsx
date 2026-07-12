import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useVehicleStore } from '../../features/vehicles/vehicleStore'
import { useDriverStore } from '../../features/drivers/driverStore'

const tripSchema = z.object({
  source: z.string().min(2, 'Source is required'),
  destination: z.string().min(2, 'Destination is required'),
  vehicleId: z.string().min(1, 'Select a vehicle'),
  driverId: z.string().min(1, 'Select a driver'),
  cargoWeight: z.coerce.number().positive('Must be greater than 0'),
  distance: z.coerce.number().positive('Must be greater than 0'),
})

export default function TripForm({ onSubmit, onCancel }) {
  const getDispatchableVehicles = useVehicleStore((s) => s.getDispatchableVehicles)
  const getAssignableDrivers = useDriverStore((s) => s.getAssignableDrivers)

  const availableVehicles = getDispatchableVehicles().filter((v) => v.status === 'Available')
  const availableDrivers = getAssignableDrivers().filter((d) => d.status === 'Available')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: { source: '', destination: '', vehicleId: '', driverId: '', cargoWeight: '', distance: '' },
  })

  const selectedVehicleId = watch('vehicleId')
  const selectedVehicle = availableVehicles.find((v) => v.id === selectedVehicleId)

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all'
  const labelClass = 'text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'
  const errorClass = 'text-xs text-danger mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Source</label>
          <input {...register('source')} placeholder="Delhi" className={inputClass} />
          {errors.source && <p className={errorClass}>{errors.source.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Destination</label>
          <input {...register('destination')} placeholder="Jaipur" className={inputClass} />
          {errors.destination && <p className={errorClass}>{errors.destination.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Vehicle ({availableVehicles.length} available)
        </label>
        <select {...register('vehicleId')} className={inputClass}>
          <option value="">Select a vehicle</option>
          {availableVehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.regNumber}) — max {v.maxLoad}kg
            </option>
          ))}
        </select>
        {errors.vehicleId && <p className={errorClass}>{errors.vehicleId.message}</p>}
        {availableVehicles.length === 0 && (
          <p className="text-xs text-amber-500 mt-1">No available vehicles right now</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Driver ({availableDrivers.length} available)
        </label>
        <select {...register('driverId')} className={inputClass}>
          <option value="">Select a driver</option>
          {availableDrivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.licenseCategory}
            </option>
          ))}
        </select>
        {errors.driverId && <p className={errorClass}>{errors.driverId.message}</p>}
        {availableDrivers.length === 0 && (
          <p className="text-xs text-amber-500 mt-1">No available drivers right now</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Cargo Weight (kg) {selectedVehicle && `— max ${selectedVehicle.maxLoad}kg`}
          </label>
          <input type="number" {...register('cargoWeight')} placeholder="450" className={inputClass} />
          {errors.cargoWeight && <p className={errorClass}>{errors.cargoWeight.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Planned Distance (km)</label>
          <input type="number" {...register('distance')} placeholder="280" className={inputClass} />
          {errors.distance && <p className={errorClass}>{errors.distance.message}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all disabled:opacity-60"
        >
          Create Trip
        </button>
      </div>
    </form>
  )
}