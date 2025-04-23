import { sanitizeUser } from '../../utils/sanitizeUser'
import { UserRepository } from '../../../domain/repositories/user/userRepository'
import { User } from '@prisma/client'

export class FindAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll()
    const sanitizedUsers = users.map(user => {
      return sanitizeUser(user)
    })
    return sanitizedUsers
  }
}
