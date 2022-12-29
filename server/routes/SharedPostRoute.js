import express from 'express'
import { create } from '../controllers/SharedPostController.js'

const sharedPostRoute = express.Router()
sharedPostRoute.post('/create', create)
export default sharedPostRoute