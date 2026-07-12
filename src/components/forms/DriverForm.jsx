import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'

const driverSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  licenseNumber: z.string().min(3, 'License number is required'),
  licenseCategory: z.enum(['LMV', 'HMV']),
  licenseExpiry: z.string().min(1, 'License expiry date is required'),
  contact: z.string().min(10, 'Enter a valid contact number'),
  safetyScore: z.coerce.number().min(0).max(100),
})

export default function DriverForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: initialData || {
      name: '',
      licenseNumber: '',
      licenseCategory: 'LMV',
      licenseExpiry: '',
      contact: '',
      safetyScore: 80,
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
      <div>
        <label className={labelClass}>Driver Name</label>
        <input {...register('name')} placeholder="Alex Kumar" className={inputClass} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>License Number</label>
          <input {...register('licenseNumber')} placeholder="DL-LIC-9081" className={inputClass} />
          {errors.licenseNumber && <p className={errorClass}>{errors.licenseNumber.message}</p>}
        </div>
        <div>
          <label className={labelClass}>License Category</label>
          <select {...register('licenseCategory')} className={inputClass}>
            <option value="LMV">LMV</option>
            <option value="HMV">HMV</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>License Expiry Date</label>
          <input type="date" {...register('licenseExpiry')} className={inputClass} />
          {errors.licenseExpiry && <p className={errorClass}>{errors.licenseExpiry.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Contact Number</label>
          <input {...register('contact')} placeholder="9876543210" className={inputClass} />
          {errors.contact && <p className={errorClass}>{errors.contact.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Safety Score (0-100)</label>
        <input type="number" {...register('safetyScore')} placeholder="80" className={inputClass} />
        {errors.safetyScore && <p className={errorClass}>{errors.safetyScore.message}</p>}
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
          {initialData ? 'Update Driver' : 'Register Driver'}
        </button>
      </div>
    </form>
  )
}