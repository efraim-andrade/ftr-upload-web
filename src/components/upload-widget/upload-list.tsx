import * as ScrollArea from '@radix-ui/react-scroll-area'
import { motion } from 'motion/react'

import { useUploads } from '../../store/uploads'
import { UploadWidgetUploadItem } from './upload-item'

export function UploadWidgetList() {
  const uploads = useUploads(store => store.uploads)

  const isUploadListEmpty = uploads.size === 0

  return (
    <div className="flex-col gap-3 px-4">
      <span className="text-xs font-medium ">
        Uploaded files <span className="text-zinc-400">({uploads.size})</span>
      </span>

      <ScrollArea.Root type="scroll" className="overflow-hidden">
        <ScrollArea.Viewport className="h-[220px]">
          {isUploadListEmpty ? (
            <span className="text-zinc-400 text-xs">No uploads added</span>
          ) : (
            <motion.div
              variants={{
                closed: { opacity: 0 },
                open: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              initial="closed"
              animate="open"
              className="flex flex-col gap-2 mt-2"
            >
              {Array.from(uploads).map(([uploadId, upload]) => {
                return (
                  <UploadWidgetUploadItem
                    key={uploadId}
                    upload={upload}
                    uploadId={uploadId}
                  />
                )
              })}
            </motion.div>
          )}
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-zinc-800 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-zinc-600 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
