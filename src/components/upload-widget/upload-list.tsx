import { motion } from 'motion/react'

import { UploadWidgetUploadItem } from './upload-item'
import { useUploads } from '../../store/uploads'

export function UploadWidgetList() {
  const uploads = useUploads(store => store.uploads)

  const isUploadListEmpty = uploads.size === 0

  return (
    <div className="flex-col gap-3 px-4">
      <span className="text-xs font-medium ">
        Uploaded files <span className="text-zinc-400">({uploads.size})</span>
      </span>

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
    </div>
  )
}
