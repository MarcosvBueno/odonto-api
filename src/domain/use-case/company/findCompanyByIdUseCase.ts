import AppError from '../../error/appError'
import { CompanyRepository } from '../../../domain/repositories/company/companyRepository'

export class FindCompanyByIdUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new AppError('Company not found', 404)
    }

    return { company }
  }
}
