import { NextFunction, Request, Response } from 'express'
import { CreateCompanyUseCase } from '../use-case/company/createCompanyUseCase'
import { FindCompanyByIdUseCase } from '../use-case/company/findCompanyByIdUseCase'

export default class CompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private findCompanyByIdUseCase: FindCompanyByIdUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { adminUserData, companyData } = req.body
    const { name: adminName, password, email } = adminUserData
    const { name: companyName, cnpj } = companyData

    try {
      const company = await this.createCompanyUseCase.execute({
        companyData: {
          name: companyName,
          cnpj,
        },
        adminUserData: {
          name: adminName,
          email,
          password,
        },
      })

      res.status(201).json(company)
    } catch (error) {
      next(error)
    }
  }

  async findCompanyById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params

    try {
      const company = await this.findCompanyByIdUseCase.execute(id)
      res.status(200).json(company)
    } catch (error) {
      next(error)
    }
  }
}
