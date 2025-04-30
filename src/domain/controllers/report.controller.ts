import { NextFunction, Response, Request } from 'express'

import { CreateReportUseCase } from '../use-case/report/createReportUseCase'

export class ReportController {
  constructor(private createReportUseCase: CreateReportUseCase) {}

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
}
