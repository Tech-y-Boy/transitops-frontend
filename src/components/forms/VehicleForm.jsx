import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'

const vehicleSchema = z.object({
  regNumber: z.string().min(3, 'Registration number is required'),
  name: z.string().min(2, 'Vehicle name is required'),
  type: z.enum(['Van', 'Truck', 'Mini Truck']),
  maxLoad: z.coerce.number().positive('Must be greater than 0'),
  odometer: z.coerce.number().min(0),
  acquisitionCost: z.coerce.number().positive('Must be greater than 0'),
  region: z.enum(['North', 'South', 'East', 'West']),
})

export default function VehicleForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || {
      regNumber: '',
      name: '',
      type: 'Van',
      maxLoad: '',
      odometer: 0,
      acquisitionCost: '',
      region: 'North',
    },
  })

  useEffect(() => {
    if (initialData) reset(initialData)
  }, [initialData, reset])

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all'
  const labelClass = 'text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'
  const errorClass = 'text-xs text-danger mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Registration Number</label>
          <input {...register('regNumber')} placeholder="DL01AB1234" className={inputClass} />
          {errors.regNumber && <p className={errorClass}>{errors.regNumber.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Vehicle Name / Model</label>
          <input {...register('name')} placeholder="Van-05" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Type</label>
          <select {...register('type')} className={inputClass}>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Mini Truck">Mini Truck</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Region</label>
          <select {...register('region')} className={inputClass}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Max Load Capacity (kg)</label>
          <input type="number" {...register('maxLoad')} placeholder="500" className={inputClass} />
          {errors.maxLoad && <p className={errorClass}>{errors.maxLoad.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Odometer (km)</label>
          <input type="number" {...register('odometer')} placeholder="0" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Acquisition Cost (₹)</label>
        <input type="number" {...register('acquisitionCost')} placeholder="850000" className={inputClass} />
        {errors.acquisitionCost && <p className={errorClass}>{errors.acquisitionCost.message}</p>}
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
          {initialData ? 'Update Vehicle' : 'Register Vehicle'}
        </button>
      </div>
    </form>
  )
}