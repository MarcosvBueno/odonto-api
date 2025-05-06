import { makeReportController } from '../../domain/use-case/report/factory'
import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'

const reportRoutes = Router()

const reportController = makeReportController()

reportRoutes.post(
  '/create-report',
  verifyJwt(),
  reportController.create.bind(reportController),
)

reportRoutes.get(
  '/find-report/:id',
  verifyJwt(),
  reportController.findById.bind(reportController),
)

export default reportRoutes
