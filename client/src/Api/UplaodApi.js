import axios from 'axios'
const Api = axios.create({ baseURL: "https://rs-mern.herokuapp.com" })
export const uploadImage = (data) => Api.post('/upload', data)
export const uploadPost = (data) => Api.post('/post/add', data)