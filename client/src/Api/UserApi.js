import axios from 'axios'
const Api =axios.create({baseURL:"http://localhost:5000"})
export const getUser=(userId)=> Api.get(`/user/${userId}`)
export const updateUser=(userId,formData)=>Api.put(`user/update/${userId}`,formData)
export const getFollowers=(id)=>Api.get(`/user/getFollowers/${id}`)
export const followUser=(id,currentUserId)=>Api.put(`user/follow/${id}`,{currentUserId:currentUserId})