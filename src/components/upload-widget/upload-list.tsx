import { UploadWidgetUploadItem } from './upload-item'

export function UploadWidgetList() {
  return (
    <div className="flex-col gap-3 px-4">
      <span className="text-xs font-medium ">
        Uploaded files <span className="text-zinc-400">(2)</span>
      </span>

      <div className="flex flex-col gap-2 mt-2">
        <UploadWidgetUploadItem />
        <UploadWidgetUploadItem />
      </div>
    </div>
  )
}
