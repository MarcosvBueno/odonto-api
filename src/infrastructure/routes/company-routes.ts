import { makeComapanyController } from '../../domain/use-case/company/factory'
import { Router } from 'express'

const companyRoutes = Router()

const companyController = makeComapanyController()

companyRoutes.post('/register-company', (req, res, next) => {
  companyController.create(req, res, next)
})

companyRoutes.get('/company/:id', (req, res, next) => {
  companyController.findCompanyById(req, res, next)
})

export default companyRoutes
