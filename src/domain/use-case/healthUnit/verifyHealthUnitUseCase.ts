// src/domain/use-cases/admin/verifyHealthUnit.ts
import AppError from '../../error/appError'
import { HealthUnitRepositoryInterface } from '../../../domain/repositories/health/healthUnitRepository.interface'

export class VerifyHealthUnitUseCase {
  constructor(private healthUnitRepository: HealthUnitRepositoryInterface) {}

  async execute(healthUnitId: string) {
    const healthUnit = await this.healthUnitRepository.findById(healthUnitId)

    if (!healthUnit) {
      throw new AppError('Health Unit not found', 404)
    }

    return this.healthUnitRepository.verifyHealthUnit(healthUnitId, {
      isVerified: true,
    })
  }
}
