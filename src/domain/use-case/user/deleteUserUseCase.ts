import AppError from '../../../domain/error/appError'
import { UserRepository } from '../../../domain/repositories/user/userRepository'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await this.userRepository.delete(id)
  }
}
