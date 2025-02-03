import { useDropzone } from 'react-dropzone'

export function UploadWidgetDropzone() {
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
    <div className="px-3 flex flex-col gap-3">
      <div
        data-active={isDragActive}
        className="
          p-5 
          h-32 
          
          flex 
          flex-col 
          items-center 
          justify-center 
          gap-1 
          border 
          border-dashed 
          border-zinc-700 
          rounded-lg 
          hover:border-zinc-600 
          data-[active=true]:bg-indigo-500/10 
          data-[active=true]:border-indigo-500 
          
          bg-black/20 
          cursor-pointer 
          transition-colors 
          text-zinc-400 
          data-[active=true]:text-indigo-400
        "
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        <span className="text-xs">Drop your files here or</span>
        <span className="text-xs underline">click to open picker</span>
      </div>

      <span className="text-xs text-zinc-400">
        Only PNG and JPG files are supported
      </span>
    </div>
  )
}
