import { NextFunction, Response, Request } from 'express'

import { CreateReportUseCase } from '../use-case/report/createReportUseCase'
import { FindReportByIdUseCase } from '../use-case/report/findReportById'

export class ReportController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private findReportByIdUseCase: FindReportByIdUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const { title, description, healthUnitId, equipmentId, companyId } =
      req.body
    try {
      const reportData = {
        title,
        description,
        healthUnitId,
        equipmentId,
        companyId,
      }

      const report = await this.createReportUseCase.execute(reportData)
      res.status(201).json(report)
    } catch (error) {
      next(error)
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: 'ID is required' })
    }
    try {
      const report = await this.findReportByIdUseCase.execute(id)
      res.status(200).json(report)
    } catch (error) {
      next(error)
    }
  }
}
