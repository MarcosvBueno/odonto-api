import { sanitizeUser } from '../../utils/sanitizeUser'
import { UserRepository } from '../../../domain/repositories/user/userRepository'
import { User } from '@prisma/client'

export class FindByIdUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      return null
    }
    return sanitizeUser(user)
  }
}
