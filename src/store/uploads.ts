import { CanceledError } from 'axios'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/react/shallow'

import { uploadFileToStorage } from '../http/upload-file-to-storage'
import { compressImage } from '../utils/compress-image'

export type Upload = {
  name: string
  file: File
  abortController?: AbortController
  status: 'progress' | 'success' | 'error' | 'canceled'
  originalSizeInBytes: number
  uploadSizeInBytes: number

  compressedSizeInBytes?: number
  remoteUrl?: string
}

type UploadState = {
  uploads: Map<string, Upload>

  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
  retryUpload: (uploadId: string) => void
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

      const abortController = new AbortController()

      updateUpload(uploadId, {
        uploadSizeInBytes: 0,
        remoteUrl: undefined,
        compressedSizeInBytes: undefined,
        status: 'progress',
        abortController,
      })

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxHeight: 1000,
          maxWidth: 1000,
          quality: 0.8,
        })

        updateUpload(uploadId, { compressedSizeInBytes: compressedFile.size })

        const { url } = await uploadFileToStorage(
          {
            file: compressedFile,
            onProgress: sizeInBytes => {
              updateUpload(uploadId, { uploadSizeInBytes: sizeInBytes })
            },
          },
          { signal: abortController.signal }
        )

        updateUpload(uploadId, { status: 'success', remoteUrl: url })
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

      upload.abortController?.abort()
    }

    function retryUpload(uploadId: string) {
      processUpload(uploadId)
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID()

        const upload: Upload = {
          name: file.name,
          file,
          status: 'progress',
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
      retryUpload,
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
          if (upload.compressedSizeInBytes) {
            accumulator.uploaded += upload.uploadSizeInBytes
          }

          accumulator.total +=
            upload.compressedSizeInBytes || upload.originalSizeInBytes

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
