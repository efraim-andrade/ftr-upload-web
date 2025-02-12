import * as Progress from '@radix-ui/react-progress'
import { Download, ImageUp, Link2, RefreshCcw, X } from 'lucide-react'
import { motion } from 'motion/react'

import { type Upload, useUploads } from '../../store/uploads'
import { downloadUrl } from '../../utils/download-url'
import { formatBytes } from '../../utils/format-bytes'
import { Button } from '../ui/button'

type UploadWidgetUploadItemProps = {
  upload: Upload
  uploadId: string
}

export function UploadWidgetUploadItem({
  upload,
  uploadId,
}: UploadWidgetUploadItemProps) {
  const cancelUpload = useUploads(store => store.cancelUpload)
  const retryUpload = useUploads(store => store.retryUpload)

  const progress = Math.min(
    upload.compressedSizeInBytes
      ? Math.round(
          (upload.uploadSizeInBytes * 100) / upload.compressedSizeInBytes
        )
      : 0,
    100
  )

  const compressedValuePercentage = (() => {
    if (!upload.compressedSizeInBytes) return

    return Math.round(
      ((upload.originalSizeInBytes - upload.compressedSizeInBytes) * 100) /
        upload.originalSizeInBytes
    )
  })()

  return (
    <motion.div
      variants={{
        closed: { opacity: 0, y: 10 },
        open: { opacity: 1, y: 0 },
      }}
      className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1 max-w-40">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />

          <span className="truncate max-w-[180px]">{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">
            {formatBytes(upload.originalSizeInBytes)}
          </span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {upload.compressedSizeInBytes ? (
            <>
              <span>{formatBytes(upload.compressedSizeInBytes)}</span>

              <span className="text-green-400 ml-1">
                -{compressedValuePercentage}%
              </span>
            </>
          ) : null}

          <div className="size-1 rounded-full bg-zinc-700" />

          {upload.status === 'success' && <span>100%</span>}

          {upload.status === 'progress' && <span>{progress}%</span>}

          {upload.status === 'error' && (
            <span className="text-red-400">Error</span>
          )}

          {upload.status === 'canceled' && (
            <span className="text-yellow-400">Canceled</span>
          )}
        </span>
      </div>

      <Progress.Root
        value={progress}
        data-status={upload.status}
        className="group bg-zinc-800 rounded-full h-1 overflow-hidden"
      >
        <Progress.Indicator
          className="
            bg-indigo-500 
            h-1 
            transition-all
            group-data-[status=success]:bg-green-400 
            group-data-[status=error]:bg-red-400 
            group-data-[status=canceled]:bg-yellow-400
          "
          style={{
            width: upload.status === 'progress' ? `${progress}%` : '100%',
          }}
        />
      </Progress.Root>

      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Button
          aria-disabled={!upload.remoteUrl}
          size="icon-sm"
          onClick={() => upload.remoteUrl && downloadUrl(upload.remoteUrl)}
        >
          <Download className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button
          disabled={!upload.remoteUrl}
          size="icon-sm"
          onClick={() =>
            upload.remoteUrl && navigator.clipboard.writeText(upload.remoteUrl)
          }
        >
          <Link2 className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button
          disabled={!['canceled', 'error'].includes(upload.status)}
          size="icon-sm"
          onClick={() => retryUpload(uploadId)}
        >
          <RefreshCcw className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button
          disabled={upload.status !== 'progress'}
          size="icon-sm"
          onClick={() => cancelUpload(uploadId)}
        >
          <X className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </motion.div>
  )
}
