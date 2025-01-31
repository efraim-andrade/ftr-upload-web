import { Minimize2 } from 'lucide-react'

export function UploadWidgetHeader() {
  return (
    <div className="w-full p-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between">
      <span className="text-sm font-medium">Upload files</span>

      <button type="button">
        <Minimize2 strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  )
}
