import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import postRoute from "./routes/PostRoute.js";

import cors from "cors";
import uploadRoute from "./routes/UploadRoute.js";
import CommentRoute from "./routes/CommentRoute.js";

const app=express();
app.use(express.static('public'))
app.use('/images',express.static('images'))

app.use(cors());
//middleware
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
dotenv.config()



mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(process.env.PORT,()=>console.log("listening at port 5000")))
.catch((e)=>console.log(e))

//routes
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',postRoute)
app.use('/upload',uploadRoute)
app.use('/comment',CommentRoute)
