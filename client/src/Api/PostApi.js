import axios from 'axios'
const API = axios.create({ baseURL: "https://rs-mern.herokuapp.com" })
export const getTimelinePosts = (id) => API.get(`post/timelineposts/${id}`);
export const likePost = (id, userId) => API.put(`post/like/${id}`, { userId: userId });
export const deletePost = (postId, userId) => API.delete(`post/delete/${postId}`, { data: { userId: userId } })
export const updatePost = (postId, updatedPost) => API.put(`post/update/${postId}`, updatedPost)
export const getNots = (userId) => API.get(`notifs/get/${userId}`)
export const readNot = (id) => API.put(`notifs/readNot/${id}`)
export const unreadedNots = (userId) => API.get(`notifs/unreaded/${userId}`)
export const getPost = (id) => API.get(`post/${id}`)
