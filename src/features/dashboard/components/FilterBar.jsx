import { SlidersHorizontal } from 'lucide-react'

const vehicleTypes = ['All Types', 'Van', 'Truck', 'Mini Truck']
const statuses = ['All Status', 'Available', 'On Trip', 'In Shop', 'Retired']
const regions = ['All Regions', 'North', 'South', 'East', 'West']

function Select({ options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-none outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mr-1">
        <SlidersHorizontal size={16} />
        Filters
      </div>
      <Select
        options={vehicleTypes}
        value={filters.type}
        onChange={(v) => onFilterChange('type', v)}
      />
      <Select
        options={statuses}
        value={filters.status}
        onChange={(v) => onFilterChange('status', v)}
      />
      <Select
        options={regions}
        value={filters.region}
        onChange={(v) => onFilterChange('region', v)}
      />
    </div>
  )
}