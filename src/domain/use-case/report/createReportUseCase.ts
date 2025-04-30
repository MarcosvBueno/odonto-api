import { TReport } from '../../types/report'
import { ReportRepository } from '../../../domain/repositories/report/reportRepository'
import { Report } from '@prisma/client'
import { HealthUnitRepository } from '../../../domain/repositories/health/healtUnitRepository'
import { CompanyRepository } from '../../../domain/repositories/company/companyRepository'
import AppError from '../../error/appError'

export class CreateReportUseCase {
  constructor(
    private reportRepository: ReportRepository,
    private HealthUnitRepository: HealthUnitRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async execute(data: TReport): Promise<Report> {
    const { title, description, healthUnitId, companyId, equipmentId } = data

    const HealthUnitExists =
      await this.HealthUnitRepository.findById(healthUnitId)
    if (!HealthUnitExists) {
      throw new AppError('Health Unit Does Not Exist', 404)
    }

    const companyExists = await this.companyRepository.findById(companyId)
    if (!companyExists) {
      throw new AppError('Company does not exist', 404)
    }

    const report = await this.reportRepository.create({
      title,
      description,
      healthUnitId,
      status: 'OPEN',
      companyId,
      equipmentId,
    })

    return report
  }
}
