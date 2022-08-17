import express from 'express'
import { getNotifs, readNot, unreadedNots } from '../controllers/NotController.js'

const NotsRoute=express.Router()
NotsRoute.get('/get/:id',getNotifs)
NotsRoute.put('/readNot/:id',readNot)
NotsRoute.get('/unreaded/:id',unreadedNots)
export default NotsRoute