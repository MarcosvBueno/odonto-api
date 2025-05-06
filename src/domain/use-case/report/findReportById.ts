import AppError from '../../error/appError'
import { ReportRepository } from '../../../domain/repositories/report/reportRepository'
import { Report } from '@prisma/client'

export class FindReportByIdUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(id: string): Promise<Report | null> {
    const report = await this.reportRepository.findById(id)
    if (!report) {
      throw new AppError('Report not found', 404)
    }
    return report
  }
}
