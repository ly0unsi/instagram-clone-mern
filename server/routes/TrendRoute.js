import express from 'express'
import { getTrendPosts, getTrends } from '../controllers/TrendControllers.js'
const trendRoute = express.Router()
trendRoute.get('/', getTrends)
trendRoute.get('/trendPosts/:trendId', getTrendPosts)
export default trendRoute