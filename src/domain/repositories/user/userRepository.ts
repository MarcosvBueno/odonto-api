import { User } from '@prisma/client'
import { UserRepositoryInterface } from './userRepository.Interface'

import prisma from '../../../infrastructure/prisma/prisma'
import { TuserUpdate } from '@/domain/types/user'
import AppError from '../../../domain/error/appError'

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
      include: {
        healthUnit: true,
        company: true,
      },
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

  async update(id: string, data: TuserUpdate): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        healthUnit: {
          include: {
            equipment: true,
            reports: true,
          },
        },
        company: {
          include: {
            healthUnits: {
              include: {
                equipment: true,
                reports: true,
              },
            },
            equipment: true,
            reports: true,
          },
        },
      },
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await prisma.$transaction(async prisma => {
      if (user.healthUnit) {
        await prisma.equipment.deleteMany({
          where: { healthUnitId: user.healthUnit.id },
        })

        await prisma.report.deleteMany({
          where: { healthUnitId: user.healthUnit.id },
        })

        await prisma.healthUnit.delete({
          where: { id: user.healthUnit.id },
        })
      }

      if (user.company) {
        await prisma.equipment.deleteMany({
          where: { companyId: user.company.id },
        })

        await prisma.report.deleteMany({
          where: { companyId: user.company.id },
        })

        for (const healthUnit of user.company.healthUnits) {
          await prisma.equipment.deleteMany({
            where: { healthUnitId: healthUnit.id },
          })

          await prisma.report.deleteMany({
            where: { healthUnitId: healthUnit.id },
          })

          await prisma.healthUnit.delete({
            where: { id: healthUnit.id },
          })
        }

        await prisma.company.delete({
          where: { id: user.company.id },
        })
      }

      await prisma.user.delete({
        where: { id },
      })
    })
  }
}
