import axios from 'axios'
const Api = axios.create({ baseURL: "https://rs-mern.onrender.com/" })
export const getTrends = () => Api.get('/trends')
export const getTrendPosts = (trendId) => Api.get(`/trends/trendPosts/${trendId}`)