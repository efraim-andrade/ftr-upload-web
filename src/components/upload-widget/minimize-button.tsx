import * as Collapsible from '@radix-ui/react-collapsible'
import { Minimize2 } from 'lucide-react'

export function UploadWidgetMinimizeButton() {
  return (
    <Collapsible.Trigger className="group w-full bg-white/2 py-3 px-5 flex items-center justify-between">
      <span className="text-sm font-medium">Upload files</span>

      <Minimize2
        strokeWidth={1.5}
        className="size-4 group-hover:text-zinc-100"
      />
    </Collapsible.Trigger>
  )
}
