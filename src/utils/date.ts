export const formatIsoString = (type: string,isoString: string): string => {
  if (!isoString) return ''

  const d = new Date(isoString)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  if (type === 'date') {
    return `${y}/${m}/${day}`
  }

  return `${y}/${m}/${day} ${hours}:${minutes}`
}
