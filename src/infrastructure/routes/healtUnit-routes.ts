import { makeHealthUnitController } from '../../domain/use-case/healthUnit/factory'
import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'

const healthUnitRoutes = Router()
const healthUnitController = makeHealthUnitController()

healthUnitRoutes.post(
  '/register',
  healthUnitController.create.bind(healthUnitController),
)

healthUnitRoutes.patch(
  '/health-units/:id/verify',
  verifyJwt({ requiredRole: 'COMPANY_ADMIN' }),
  healthUnitController.verifyHealthUnit.bind(healthUnitController),
)

export default healthUnitRoutes
