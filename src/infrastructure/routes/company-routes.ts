import { makeComapanyController } from '../../domain/use-case/company/factory'
import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'

const companyRoutes = Router()

const companyController = makeComapanyController()

companyRoutes.post(
  '/register-company',
  companyController.create.bind(companyController),
)

companyRoutes.get(
  '/company/:id',
  verifyJwt({ requiredRole: 'COMPANY_ADMIN' }),
  companyController.findCompanyById.bind(companyController),
)

export default companyRoutes
