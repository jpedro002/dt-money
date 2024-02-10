export const api = (path: string, unit?: RequestInit) => {
  const baseUrl = 'http://localhost:3333'
  const url = new URL(path, baseUrl)

  return fetch(url, unit)
}
