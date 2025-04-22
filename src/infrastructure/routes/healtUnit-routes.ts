import { makeHealthUnitController } from '../../domain/use-case/healthUnit/factory'
import { Router } from 'express'

const healthUnitRoutes = Router()
const healthUnitController = makeHealthUnitController()

healthUnitRoutes.post(
  '/register',
  healthUnitController.create.bind(healthUnitController),
)

export default healthUnitRoutes
