import { describe, it, expect, vi, beforeEach } from 'vitest'
import fetchApi from '@/utils/fetchApi'

global.fetch = vi.fn()

const mockResponse = (data, ok = true) => {
  return {
    ok,
    json: () => Promise.resolve(data)
  }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchApi', () => {
  it('deve fazer uma requisição GET', async () => {
    fetch.mockResolvedValue(mockResponse({ name: 'João' }))

    const result = await fetchApi.get('/api/user')
    expect(fetch).toHaveBeenCalledWith('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual({ name: 'João' })
  })

  it('deve fazer uma requisição POST', async () => {
    const body = { name: 'Maria' }
    fetch.mockResolvedValue(mockResponse({ success: true }))

    const result = await fetchApi.post('/api/user', body)
    expect(fetch).toHaveBeenCalledWith('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    expect(result).toEqual({ success: true })
  })

  it('deve lançar um erro caso !response.ok', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Erro!' })
    })

    await expect(fetchApi.get('/api/fail')).rejects.toThrow('Erro!')
  })
})
