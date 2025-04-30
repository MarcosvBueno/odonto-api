import { ThealthUnit } from '../../types/healthUnit'
import { HealthUnitRepositoryInterface } from './healthUnitRepository.interface'
import { HealthUnit } from '@prisma/client'
import prisma from '../../../infrastructure/prisma/prisma'

export class HealthUnitRepository implements HealthUnitRepositoryInterface {
  async create(data: ThealthUnit): Promise<HealthUnit> {
    return await prisma.healthUnit.create({
      data: {
        name: data.name,
        street: data.street,
        number: data.number,
        district: data.district,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        isVerified: data.isVerified,
        user: { connect: { id: data.userId } },
        company: data.companyId
          ? { connect: { id: data.companyId } }
          : undefined,
        equipment: data.equipment
          ? {
              create: data.equipment.map(equip => ({
                name: equip.name,
                model: equip.model,
                serialNumber: equip.serialNumber,
                company: {
                  connect: {
                    id: data.companyId || '',
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        equipment: true,
      },
    })
  }

  async findById(id: string): Promise<HealthUnit | null> {
    return await prisma.healthUnit.findUnique({
      where: { id },
    })
  }

  async findByName(name: string): Promise<HealthUnit | null> {
    return await prisma.healthUnit.findFirst({
      where: { name },
    })
  }

  async findAll(): Promise<any[]> {
    return await prisma.healthUnit.findMany()
  }

  async update(id: string, data: any): Promise<HealthUnit> {
    return await prisma.healthUnit.update({
      where: { id },
      data,
    })
  }
  verifyHealthUnit(
    id: string,
    data: { isVerified: boolean },
  ): Promise<HealthUnit | null> {
    return prisma.healthUnit.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.healthUnit.delete({
      where: { id },
    })
  }
}
