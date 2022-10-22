import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:5000' });
export const getMessages = (id) => API.get(`/message/${id}`);
export const getUserMessages = (userId) => API.get(`/message/user/${userId}`);
export const addMessage = (data) => API.post('/message/', data);
export const readMessages = (chatId) => API.put(`/message/read/${chatId}`);