import { CompanyRepositoryInterface } from './companyRepository.interface'
import { Company } from '@prisma/client'
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
            equipment: true, // Inclui os reports de cada posto
          },
        },
      },
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
