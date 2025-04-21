import { makeHealthUnitController } from '../../domain/use-case/healthUnit/factory'
import { Router } from 'express'

const healthUnitRoutes = Router()
const healthUnitController = makeHealthUnitController()

healthUnitRoutes.post('/register', (req, res, next) => {
  healthUnitController.create(req, res, next)
})

export default healthUnitRoutes
