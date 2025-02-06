import axios from 'axios'

type UploadFileToStorageParams = {
  file: File
  onProgress: (sizeInBytes: number) => void
}

type UploadFileToStorageOptions = {
  signal?: AbortSignal
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFileToStorageParams,
  options?: UploadFileToStorageOptions
) {
  const data = new FormData()

  data.append('file', file)

  const response = await axios.post('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: options?.signal,
    onUploadProgress: progressEvent => {
      onProgress(progressEvent.loaded)
    },
  })

  return { url: response }
}
