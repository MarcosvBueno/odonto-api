import { NextFunction, Request, Response } from 'express'
import { CreateCompanyUseCase } from '../use-case/company/createCompanyUseCase'
import { FindCompanyByIdUseCase } from '../use-case/company/findCompanyByIdUseCase'
import { GetHealthUnitsByCompanyUseCase } from '../use-case/company/getHealthUnitsByCompanyUseCase'

export default class CompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private findCompanyByIdUseCase: FindCompanyByIdUseCase,
    private getHealthUnitsByCompanyUseCase: GetHealthUnitsByCompanyUseCase,
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

  async findHealthUnitsByCompanyId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { companyId } = req.params
    const { page = 1, limit = 10, isVerified } = req.query

    try {
      const healthUnits = await this.getHealthUnitsByCompanyUseCase.execute({
        companyId,
        pagination: { page: Number(page), limit: Number(limit) },
        filters: { isVerified: isVerified === 'true' },
      })

      res.json({
        data: healthUnits,
        pagination: {
          page,
          limit,
          total: healthUnits.healtUnitsByCompany.length,
        },
      })
    } catch (error) {
      next(error)
    }
  }
}
