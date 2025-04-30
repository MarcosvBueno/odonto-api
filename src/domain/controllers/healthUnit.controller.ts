import { Response, Request, NextFunction } from 'express'
import { CreateHealthUnitUseCase } from '../use-case/healthUnit/createHealthUnitUseCase'
import { Tuser } from '../types/user'
import { VerifyHealthUnitUseCase } from '../use-case/healthUnit/verifyHealthUnitUseCase'

export default class HealthUnitController {
  constructor(
    private createHealthUnitUseCase: CreateHealthUnitUseCase,
    private verifyHealthUnitUseCase: VerifyHealthUnitUseCase,
  ) {}

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
      equipment: [{ name: equipmentName, model, serialNumber }],
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
          equipment: [
            {
              name: equipmentName,
              model,
              serialNumber,
            },
          ],
          userId: '',
        },
        companyCode,
      })
      res.status(201).json(healtUnit)
    } catch (error) {
      next(error)
    }
  }

  async verifyHealthUnit(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const updatedHealthUnit = await this.verifyHealthUnitUseCase.execute(id)
      res.json({ isVerified: updatedHealthUnit?.isVerified })
    } catch (error) {
      next(error)
    }
  }
}
