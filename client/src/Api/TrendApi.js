import axios from 'axios'
const Api = axios.create({ baseURL: "http://localhost:5000" })
export const getTrends = () => Api.get('/trends')
export const getTrendPosts = (trendId) => Api.get(`/trends/trendPosts/${trendId}`)