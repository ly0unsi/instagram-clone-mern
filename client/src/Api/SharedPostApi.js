import axios from 'axios'
const API = axios.create({ baseURL: "http://localhost:5000" })
export const sharePost = (data) => API.post(`sharedpost/create`, data); 