import fetchApi from '../utils/fetchApi.js'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const userService = {
  async register(data) {
    return fetchApi.post(`${BASE_URL}/registration`, data)
  }
}
