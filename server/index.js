import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config()
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.use('/posts',postRoutes)
app.use('/users',userRoutes)


const PORT = process.env.PORT || 5009;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server runnig on Port ${PORT}`)))
    .catch((err) => console.log(err.message));




