import express from 'express'
const uploadRoute = express.Router()
import multer from 'multer'



uploadRoute.post("/", async (req, res) => {
  const {name,file} =req.body
    try {
      
    } catch (error) {
      console.error(error);
    }
  });

export default uploadRoute

