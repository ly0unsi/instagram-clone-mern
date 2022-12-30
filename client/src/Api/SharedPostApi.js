import axios from 'axios'
const API = axios.create({ baseURL: "https://rs-mern.onrender.com/" })
export const sharePost = (data) => API.post(`sharedpost/create`, data); 