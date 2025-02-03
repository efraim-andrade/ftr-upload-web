import { motion } from 'motion/react'

import { UploadWidgetUploadItem } from './upload-item'

export function UploadWidgetList() {
  const isUploadListEmpty = false

  return (
    <div className="flex-col gap-3 px-4">
      <span className="text-xs font-medium ">
        Uploaded files <span className="text-zinc-400">(2)</span>
      </span>

      {isUploadListEmpty ? (
        <span className="text-zinc-400 text-xs">No uploads added</span>
      ) : (
        <motion.div
          variants={{
            closed: { opacity: 0 },
            open: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="closed"
          animate="open"
          className="flex flex-col gap-2 mt-2"
        >
          <UploadWidgetUploadItem />
          <UploadWidgetUploadItem />
          <UploadWidgetUploadItem />
        </motion.div>
      )}
    </div>
  )
}
