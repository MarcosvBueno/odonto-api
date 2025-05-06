import AppError from '../../error/appError'
import { CompanyRepositoryInterface } from '../../../domain/repositories/company/companyRepository.interface'

export class GetHealthUnitsByCompanyUseCase {
  constructor(private companyRepository: CompanyRepositoryInterface) {}

  async execute(data: {
    companyId: string
    pagination?: { page: number; limit: number }
    filters?: { isVerified?: boolean }
  }) {
    const healtUnitsByCompany =
      await this.companyRepository.findHealthUnitsByCompanyId(
        data.companyId,
        data.pagination,
        data.filters,
      )
    if (!healtUnitsByCompany) {
      throw new AppError('This company does not yet have health Units', 404)
    }

    return { healtUnitsByCompany }
  }
}
