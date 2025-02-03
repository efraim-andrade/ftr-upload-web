import { motion } from 'motion/react'
import { useDropzone } from 'react-dropzone'

import { CircularProgressBar } from '../ui/circular-progress-bar'

export function UploadWidgetDropzone() {
  const isThereAnyPendingUpload = true
  const uploadGlobalPercentage = 66

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop(acceptedFiles) {
      console.log(acceptedFiles)
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="px-3 flex flex-col gap-3"
    >
      <div
        data-active={isDragActive}
        className="
          flex 
          flex-col 
          items-center 
          justify-center 
          gap-1 

          p-5 
          h-32 
          border 
          border-dashed 
          border-zinc-700 
          rounded-lg 
          hover:border-zinc-600 
          data-[active=true]:border-indigo-500 
          
          bg-black/20 
          cursor-pointer 
          transition-colors 
          text-zinc-400 
          data-[active=true]:text-indigo-400
          data-[active=true]:bg-indigo-500/10 
        "
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        {isThereAnyPendingUpload ? (
          <div className="flex flex-col gap-2.5 items-center">
            <CircularProgressBar
              progress={uploadGlobalPercentage}
              size={56}
              strokeWidth={4}
            />
            <span className="text-xs">Uploading 2 files...</span>
          </div>
        ) : (
          <>
            <span className="text-xs">Drop your files here or</span>
            <span className="text-xs underline">click to open picker</span>
          </>
        )}
      </div>

      <span className="text-xxs text-zinc-400">
        Only PNG and JPG files are supported
      </span>
    </motion.div>
  )
}
