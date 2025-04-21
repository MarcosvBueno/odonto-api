import { User } from '@prisma/client'
import { UserRepositoryInterface } from './userRepository.Interface'

import prisma from '../../../infrastructure/prisma/prisma'

export class UserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  async findByname(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { name: username },
    })
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async create(data: User): Promise<User> {
    return prisma.user.create({
      data,
    })
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }

  async update(id: string, data: User): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}
