import { UserRepository } from '../../../repositories/user/userRepository'
import { CreateUserUseCase } from '../../../use-case/user/createUserUseCase'

import CompanyController from '../../../controllers/company.controller'
import { CompanyRepository } from '../../../repositories/company/companyRepository'
import { CreateCompanyUseCase } from '../createCompanyUseCase'
import { FindCompanyByIdUseCase } from '../findCompanyByIdUseCase'
import { GetHealthUnitsByCompanyUseCase } from '../getHealthUnitsByCompanyUseCase'

export const makeComapanyController = (): CompanyController => {
  const userRepository = new UserRepository()
  const companyRepository = new CompanyRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const createCompanyUseCase = new CreateCompanyUseCase(
    companyRepository,
    createUserUseCase,
    userRepository,
  )
  const findCompanyByIdUseCase = new FindCompanyByIdUseCase(companyRepository)
  const getHealthUnitsByCompanyUseCase = new GetHealthUnitsByCompanyUseCase(
    companyRepository,
  )

  return new CompanyController(
    createCompanyUseCase,
    findCompanyByIdUseCase,
    getHealthUnitsByCompanyUseCase,
  )
}
