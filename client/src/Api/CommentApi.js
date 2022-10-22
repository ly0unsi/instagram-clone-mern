import axios from 'axios'

const Api = axios.create({ baseURL: "https://rs-mern.herokuapp.com/" })
export const addComment = (formData) => Api.post('comment/add', formData)
export const getPostComments = () => Api.get(`comment/postComments`)
export const deleteComment = (userId, commentId) => Api.delete(`comment/delete/${commentId}`, { data: { currentUserId: userId } })
export const editComment = (formdata, commentId) => Api.put(`comment/edit/${commentId}`, formdata)

