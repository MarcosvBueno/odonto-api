import { CompanyRepositoryInterface } from './companyRepository.interface'
import { Company, HealthUnit } from '@prisma/client'
import prisma from '../../../infrastructure/prisma/prisma'

export class CompanyRepository implements CompanyRepositoryInterface {
  async create(
    data: {
      adminUserId: string
      name: string
      cnpj: string
    },
    _adminUserId: string,
  ): Promise<Company> {
    return await prisma.company.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        adminUser: {
          connect: { id: data.adminUserId },
        },
      },
    })
  }

  async findByRegistrationCode(
    registrationCode: string,
  ): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: { registrationCode },
    })
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: { cnpj },
    })
  }

  async findById(id: string): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: { id },
      include: {
        healthUnits: {
          include: {
            reports: true,
            equipment: true,
          },
        },
      },
    })
  }

  async findHealthUnitsByCompanyId(
    companyId: string,
    pagination?: { page: number; limit: number },
    filters?: { isVerified?: boolean },
  ): Promise<HealthUnit[]> {
    return await prisma.healthUnit.findMany({
      where: {
        companyId,
        ...(filters?.isVerified !== undefined && {
          isVerified: filters.isVerified,
        }),
      },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
        equipment: true,
        reports: true,
        _count: {
          select: {
            equipment: true,
            reports: true,
          },
        },
      },
      skip: ((pagination?.page ?? 1) - 1) * (pagination?.limit ?? 10),
      take: pagination?.limit,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findAll(): Promise<Company[]> {
    return await prisma.company.findMany()
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    return await prisma.company.update({
      where: { id },
      data: company,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.company.delete({
      where: { id },
    })
  }
}
