import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

function convertToCSV(rows) {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const csvRows = [headers.join(',')]
  rows.forEach((row) => {
    csvRows.push(headers.map((h) => `"${row[h]}"`).join(','))
  })
  return csvRows.join('\n')
}

export default function ExportButton({ data, filename = 'transitops-report.csv' }) {
  const handleExport = () => {
    if (!data.length) {
      toast.error('No data to export')
      return
    }
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Report exported as CSV')
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
    >
      <Download size={15} />
      Export CSV
    </button>
  )
}