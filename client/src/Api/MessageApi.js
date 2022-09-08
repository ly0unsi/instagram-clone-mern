import axios from 'axios'
const API = axios.create({ baseURL: 'https://rs-mern.herokuapp.com' });
export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (data) => API.post('/message/', data);
export const readMessages = (chatId) => API.put(`/message/read/${chatId}`);