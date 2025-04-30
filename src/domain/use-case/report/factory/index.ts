import { ReportRepository } from '../../../repositories/report/reportRepository'
import { ReportController } from '../../../controllers/report.controller'
import { CreateReportUseCase } from '../createReportUseCase'
import { HealthUnitRepository } from '../../../repositories/health/healtUnitRepository'
import { CompanyRepository } from '../../../repositories/company/companyRepository'

export const makeReportController = (): ReportController => {
  const reportRepository = new ReportRepository()
  const healtUnitRepository = new HealthUnitRepository()
  const companyRepository = new CompanyRepository()
  const createReportUseCase = new CreateReportUseCase(
    reportRepository,
    healtUnitRepository,
    companyRepository,
  )
  return new ReportController(createReportUseCase)
}
