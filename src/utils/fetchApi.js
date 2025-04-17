const baseOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const handleResponse = async (response) => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição')
  }
  return data
}

const fetchApi = {
  get: async (url, options = {}) => {
    const response = await fetch(url, { ...baseOptions, ...options, method: 'GET' })
    return handleResponse(response)
  },
  post: async (url, body, options = {}) => {
    const response = await fetch(url, {
      ...baseOptions,
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    })
    return handleResponse(response)
  }
}

export default fetchApi
