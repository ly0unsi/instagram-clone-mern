import axios from 'axios'
const Api = axios.create({ baseURL: "http://localhost:5000" })
export const uploadImage = (data) => Api.post('/upload', data)
export const uploadPost = (data) => Api.post('/post/add', data)