import { User } from '@prisma/client'
import { GlobalRepository } from '../repositoy.intreface'
import { Tuser, TuserUpdate } from '../../../domain/types/user'

export interface UserRepositoryInterface extends GlobalRepository<User> {
  create(data: Tuser): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByname(username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(id: string, data: TuserUpdate): Promise<User | null>
}
