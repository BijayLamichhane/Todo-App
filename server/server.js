import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

connectDB();


app.use(cors())
app.use(express.json())

app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

