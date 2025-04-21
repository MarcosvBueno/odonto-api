import { HealthUnitRepositoryInterface } from '../../repositories/health/healthUnitRepository.interface'
import { ThealthUnit } from '../../../domain/types/healthUnit'
import { HealthUnit, User } from '@prisma/client'
import { CreateUserUseCase } from '../user/createUserUseCase'
import { UserRepositoryInterface } from '../../../domain/repositories/user/userRepository.Interface'
import prisma from '../../../infrastructure/prisma/prisma'
import { Tuser } from '@/domain/types/user'
import { sanitizeUser } from '../../utils/sanitizeUser'

export class CreateHealthUnitUseCase {
  constructor(
    private healthUnitRepository: HealthUnitRepositoryInterface,
    private createUserUseCase: CreateUserUseCase,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute(data: {
    userdata: Tuser
    healthUnitData: ThealthUnit
    companyCode: string
  }): Promise<{ savedUser: Omit<User, 'password'>; healthUnit: HealthUnit }> {
    const user = await this.createUserUseCase.execute({
      ...data.userdata,
    })

    const company = await prisma.company.findUnique({
      where: { registrationCode: data.companyCode },
    })

    if (!company) {
      throw new Error('Company not found with the provided company code.')
    }

    const [savedUser, healthUnit] = await prisma.$transaction(async _prisma => {
      const savedUser = await this.userRepository.create({
        ...user,
      })
      const healthUnit = await this.healthUnitRepository.create({
        ...data.healthUnitData,
        userId: savedUser.id,
        companyId: company.id,
      })
      return [savedUser, healthUnit]
    })

    return {
      savedUser: sanitizeUser(savedUser),
      healthUnit,
    }
  }
}
