import { create } from "zustand";

export type Upload = {
  name: string
  file: File
}

type UploadState = {
  uploads: Map<string, Upload>

  addUploads: (files: File[]) => void
}

export const useUploads  = create<UploadState>((set, get) => {
  function addUploads(files: File[]) {
    for(const file of files) {
      const uploadId = crypto.randomUUID()

      const upload: Upload = {
        name: file.name,
        file
      }

      set(state => {
        return { uploads: state.uploads.set(uploadId, upload) }
      })
    }
  }
  
  return {
    uploads: new Map(),

    addUploads
  }
})