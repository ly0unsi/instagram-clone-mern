import axios from 'axios'
const Api =axios.create({baseURL:"http://localhost:5000"})
export const addComment =(formData)=> Api.post('comment/add',formData)
export const getPostComments=(postId)=>Api.get(`comment/postComments/${postId}`)
export const deleteComment=(userId,commentId)=>Api.delete(`comment/delete/${commentId}`,{data:{currentUserId:userId}})
export const editComment =(formdata,commentId)=>Api.put(`comment/edit/${commentId}`,formdata)