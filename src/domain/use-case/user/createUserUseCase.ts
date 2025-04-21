import AppError from '../../error/appError'
import { UserRepositoryInterface } from '../../../domain/repositories/user/userRepository.Interface'
import { Tuser } from '../../../domain/types/user'
import bcrypt from 'bcrypt'
export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}
  async execute(userData: Tuser): Promise<Tuser> {
    const { name, email, password } = userData

    if (!name || !email || !password) {
      throw new Error('Invalid user dataaaaaaaa')
    }
    const userExist = await this.userRepository.findByEmail(email)
    if (userExist) {
      throw new AppError('User already exists')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = {
      ...userData,
      password: hashedPassword,
    }
    return newUser
  }
}
