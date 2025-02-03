import { UploadCloud } from 'lucide-react'

export function UploadWidgetTitle() {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />

      <span>Upload files</span>
    </div>
  )
}
