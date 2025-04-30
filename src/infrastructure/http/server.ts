import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { env } from '../env'
import { ErrorHandler } from '../middleware/error-handler'
import healthUnitRoutes from '../routes/healtUnit-routes'
import companyRoutes from '../routes/company-routes'
import UserRoutes from '../routes/user-routes'
import reportRoutes from '../routes/report-routes'
const app = express()

app.use(express.json())
app.use(cors())

app.use(healthUnitRoutes)
app.use(companyRoutes)
app.use(UserRoutes)
app.use(reportRoutes)

app.use(ErrorHandler)
app.listen(3000, () => {
  console.log(`Server is running on port ${env.PORT} 🚀`)
  console.log(`${env.API_URL}`)
})
