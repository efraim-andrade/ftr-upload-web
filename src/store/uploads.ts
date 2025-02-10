import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { CanceledError } from 'axios'
import { useShallow } from 'zustand/react/shallow'

import { uploadFileToStorage } from '../http/upload-file-to-storage'
import { compressImage } from '../utils/compress-image'

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: 'progress' | 'success' | 'error' | 'canceled'
  originalSizeInBytes: number
  uploadSizeInBytes: number
}

type UploadState = {
  uploads: Map<string, Upload>

  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
}

enableMapSet()

export const useUploads = create<UploadState, [['zustand/immer', never]]>(
  immer((set, get) => {
    function updateUpload(uploadId: string, data: Partial<Upload>) {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      set(state => {
        state.uploads.set(uploadId, { ...upload, ...data })
      })
    }

    async function processUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId)

      if (!upload) return

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxHeight: 200,
          maxWidth: 200,
          quality: 0.5,
        })

        await uploadFileToStorage(
          {
            file: compressedFile,
            onProgress: sizeInBytes => {
              updateUpload(uploadId, { uploadSizeInBytes: sizeInBytes })
            },
          },
          { signal: upload.abortController.signal }
        )

        updateUpload(uploadId, { status: 'success' })
      } catch (error) {
        if (error instanceof CanceledError) {
          updateUpload(uploadId, { status: 'canceled' })
          return
        }

        updateUpload(uploadId, { status: 'error' })
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId)

      if (!upload) return

      upload.abortController.abort()
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID()

        const abortController = new AbortController()

        const upload: Upload = {
          name: file.name,
          file,
          status: 'progress',
          abortController,
          originalSizeInBytes: file.size,
          uploadSizeInBytes: 0,
        }

        set(state => {
          state.uploads.set(uploadId, upload)
        })

        processUpload(uploadId)
      }
    }

    return {
      uploads: new Map(),

      addUploads,
      cancelUpload,
    }
  })
)

export const usePendingUploads = () => {
  return useUploads(
    useShallow(store => {
      const isThereAnyPendingUploads = Array.from(store.uploads.values()).some(
        upload => upload.status === 'progress'
      )

      if (!isThereAnyPendingUploads) {
        return { isThereAnyPendingUploads, globalPercentage: 100 }
      }

      const initialValue = { total: 0, uploaded: 0 }

      const { total, uploaded } = Array.from(store.uploads.values()).reduce(
        (accumulator, upload) => {
          accumulator.total += upload.originalSizeInBytes
          accumulator.uploaded += upload.uploadSizeInBytes

          return accumulator
        },
        initialValue
      )

      const globalPercentage = Math.min(
        Math.round((uploaded * 100) / total),
        100
      )

      return {
        isThereAnyPendingUploads,
        globalPercentage,
      }
    })
  )
}
