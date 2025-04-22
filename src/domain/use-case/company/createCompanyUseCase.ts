import { CompanyRepositoryInterface } from '../../repositories/company/companyRepository.interface'
import { Tcompany } from '../../../domain/types/company'
import { Company, User } from '@prisma/client'
import { CreateUserUseCase } from '../user/createUserUseCase'
import { UserRepositoryInterface } from '../../../domain/repositories/user/userRepository.Interface'
import prisma from '../../../infrastructure/prisma/prisma'
import { Tuser } from '../../../domain/types/user'
import AppError from '../../error/appError'
import { sanitizeUser } from '../../utils/sanitizeUser'

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepositoryInterface,
    private createUserUseCase: CreateUserUseCase,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute(data: {
    adminUserData: Tuser
    companyData: Tcompany
  }): Promise<{ savedUser: Omit<User, 'password'>; company: Company }> {
    const user = await this.createUserUseCase.execute({
      ...data.adminUserData,
    })

    const companyCnpj = await this.companyRepository.findByCnpj(
      data.companyData.cnpj,
    )

    if (companyCnpj) {
      throw new AppError('Company already exists with the provided CNPJ.', 402)
    }

    const [savedUser, company] = await prisma.$transaction(async _prisma => {
      const savedUser = await this.userRepository.create({
        ...user,
        role: 'COMPANY_ADMIN',
      })

      const company = await this.companyRepository.create({
        ...data.companyData,
        adminUserId: savedUser.id,
      })

      return [savedUser, company]
    })

    return {
      savedUser: sanitizeUser(savedUser),
      company,
    }
  }
}
