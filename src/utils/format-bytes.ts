const units = ['b', 'KB', 'MB', 'GB', 'TB']
const oneKB = 1024

export function formatBytes(bytes: number): string {
  if (typeof bytes !== 'number' || bytes < 0) {
    throw new Error('Input must be a non-negative number')
  }

  let index = 0
  let totalBytes = bytes

  while (totalBytes >= oneKB && index < units.length - 1) {
    totalBytes = totalBytes / oneKB
    index++
  }

  return `${totalBytes.toFixed(2)} ${units[index]}`
}
