import * as Progress from '@radix-ui/react-progress'
import { Download, ImageUp, Link2, RefreshCcw, X } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '../ui/button'

export function UploadWidgetUploadItem() {
  return (
    <motion.div
      variants={{
        closed: { opacity: 0, y: 10 },
        open: { opacity: 1, y: 0 },
      }}
      className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          screenshot.png
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">3MB</span>

          <div className="size-1 rounded-full bg-zinc-700" />

          <span>300KB</span>

          <span className="text-green-400 ml-1">-94%</span>

          <div className="size-1 rounded-full bg-zinc-700" />

          <span>45%</span>
        </span>
      </div>

      <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
        <Progress.Indicator
          className="bg-indigo-500 h-1"
          style={{ width: '45%' }}
        />
      </Progress.Root>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button size="icon-sm">
          <Download className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button size="icon-sm">
          <Link2 className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button size="icon-sm">
          <RefreshCcw className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button size="icon-sm">
          <X className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Download compressed image</span>
        </Button>
      </div>
    </motion.div>
  )
}
