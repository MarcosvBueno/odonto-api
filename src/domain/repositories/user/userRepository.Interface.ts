import { User } from '@prisma/client'
import { GlobalRepository } from '../repositoy.intreface'
import { Tuser } from '../../../domain/types/user'

export interface UserRepositoryInterface extends GlobalRepository<User> {
  create(data: Tuser): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByname(username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
