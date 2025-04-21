import { Response, Request, NextFunction } from 'express'
import { CreateHealthUnitUseCase } from '../use-case/healthUnit/createHealthUnitUseCase'
import { Tuser } from '../types/user'

export default class HealthUnitController {
  constructor(private createHealthUnitUseCase: CreateHealthUnitUseCase) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const { userData, healthUnitData, companyCode } = req.body
    const { name: userName, email, password } = userData as Tuser
    const {
      name: healthUnitName,
      street,
      number,
      district,
      city,
      state,
      zipCode,
    } = healthUnitData

    try {
      const healtUnit = await this.createHealthUnitUseCase.execute({
        userdata: {
          name: userName,
          email,
          password,
        },
        healthUnitData: {
          name: healthUnitName,
          street,
          number,
          district,
          city,
          state,
          zipCode,
          isVerified: false,
          userId: '',
        },
        companyCode,
      })
      res.status(201).json(healtUnit)
    } catch (error) {
      next(error)
    }
  }
}
