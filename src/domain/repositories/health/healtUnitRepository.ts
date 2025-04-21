import { ThealthUnit } from '../../types/healthUnit'
import { HealthUnitRepositoryInterface } from './healthUnitRepository.interface'
import { HealthUnit } from '@prisma/client'
import prisma from '../../../infrastructure/prisma/prisma'

export class HealthUnitRepository implements HealthUnitRepositoryInterface {
  async create(data: ThealthUnit): Promise<HealthUnit> {
    return await prisma.healthUnit.create({
      data,
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

  async delete(id: string): Promise<void> {
    await prisma.healthUnit.delete({
      where: { id },
    })
  }
}
