import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { env } from '../env'
import { ErrorHandler } from '../middleware/error-handler'
const app = express()

app.use(express.json())
app.use(cors())

app.use('/', (req, res) => {
  res.send('Hello World')
})

app.use(ErrorHandler)
app.listen(3000, () => {
  console.log(`Server is running on port ${env.PORT} 🚀`)
  console.log(`${env.API_URL}`)
})
