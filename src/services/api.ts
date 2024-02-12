export const api = (path: string, unit?: RequestInit) => {
  const baseUrl = 'http://localhost:3000'
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, unit)
}
