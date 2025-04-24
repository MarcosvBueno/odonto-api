import UserController from '../../../../domain/controllers/user.controller'
import { UserRepository } from '../../../../domain/repositories/user/userRepository'
import { CreateUserUseCase } from '../createUserUseCase'
import { DeleteUserUseCase } from '../deleteUserUseCase'
import { FindAllUsersUseCase } from '../findAllUsersUseCase'
import { FindByIdUserUseCase } from '../findByIdUserUseCase'
import { LoginUserUseCase } from '../loginUserUseCase'
import { UpdateUserUseCase } from '../updateUserUseCase'

export const makeUserController = (): UserController => {
  const userRepository = new UserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const loginUserUseCase = new LoginUserUseCase(userRepository)
  const findAllUsersUseCase = new FindAllUsersUseCase(userRepository)
  const findByIdUserUseCase = new FindByIdUserUseCase(userRepository)
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  return new UserController(
    createUserUseCase,
    loginUserUseCase,
    findAllUsersUseCase,
    findByIdUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
  )
}
