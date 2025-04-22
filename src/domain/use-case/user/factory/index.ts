import UserController from '../../../../domain/controllers/user.controller'
import { UserRepository } from '../../../../domain/repositories/user/userRepository'
import { CreateUserUseCase } from '../createUserUseCase'
import { LoginUserUseCase } from '../loginUserUseCase'

export const makeUserController = (): UserController => {
  const userRepository = new UserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const loginUserUseCase = new LoginUserUseCase(userRepository)

  return new UserController(createUserUseCase, loginUserUseCase)
}
