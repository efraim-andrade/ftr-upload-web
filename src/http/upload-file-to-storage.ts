import axios from 'axios'

type UploadFileToStorageParams = {
  file: File
}

type UploadFileToStorageOptions = {
  signal?: AbortSignal
}

export async function uploadFileToStorage(
  { file }: UploadFileToStorageParams,
  options?: UploadFileToStorageOptions
) {
  const data = new FormData()

  data.append('file', file)

  const response = await axios.post('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: options?.signal,
  })

  return { url: response }
}
