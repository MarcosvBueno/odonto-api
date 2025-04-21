// factories/healthUnitFactory.ts
import { HealthUnitRepository } from '../../../repositories/health/healtUnitRepository'
import { CreateHealthUnitUseCase } from '../../../use-case/healthUnit/createHealthUnitUseCase'
import { UserRepository } from '../../../repositories/user/userRepository'
import { CreateUserUseCase } from '../../../use-case/user/createUserUseCase'
import HealthUnitController from '../../../controllers/healthUnit.controller'

export const makeHealthUnitController = (): HealthUnitController => {
  const userRepository = new UserRepository()
  const healthUnitRepository = new HealthUnitRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const createHealthUnitUseCase = new CreateHealthUnitUseCase(
    healthUnitRepository,
    createUserUseCase,
    userRepository,
  )

  return new HealthUnitController(createHealthUnitUseCase)
}
