import { sanitizeUser } from '../../../domain/utils/sanitizeUser'
import AppError from '../../../domain/error/appError'
import { UserRepository } from '../../../domain/repositories/user/userRepository'
import bcrypt from 'bcrypt'

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new AppError('Invalid password', 400)
    }

    return sanitizeUser(user)
  }
}
