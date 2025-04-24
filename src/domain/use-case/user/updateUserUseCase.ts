import { TuserUpdate } from '@/domain/types/user'
import AppError from '../../../domain/error/appError'
import { UserRepository } from '../../../domain/repositories/user/userRepository'
import bcrypt from 'bcrypt'
import { sanitizeUser } from '../../utils/sanitizeUser'
import { User } from '@prisma/client'

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    data: TuserUpdate,
  ): Promise<Omit<User, 'password'> | null> {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      new AppError('User not found', 404)
    }

    const genSalt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(data.password, genSalt)

    const user = await this.userRepository.update(id, {
      ...data,
      password: passwordHash,
    })

    if (!user) {
      new AppError('User not found', 404)
    }

    return sanitizeUser(user)
  }
}
