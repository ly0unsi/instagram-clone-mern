import axios from 'axios'

const Api = axios.create({ baseURL: "http://localhost:5000" })
export const getUserById = (userId) => Api.get(`/user/byid/${userId}`)
export const getUser = (username) => Api.get(`/user/${username}`)
export const updateUser = (userId, formData) => Api.put(`user/update/${userId}`, formData)
export const getFollowers = (id) => Api.get(`/user/getFollowers/${id}`)
export const followUser = (id, currentUserId) => Api.put(`user/follow/${id}`, { currentUserId: currentUserId })
export const getAllUsers = () => Api.get(`/user`)

