import axios from 'axios'

const Api = axios.create({ baseURL: "http://localhost:5000" })
export const login = (data) => Api.post('/auth/login', data)
export const signup = (data) => Api.post('/auth/register', data)

