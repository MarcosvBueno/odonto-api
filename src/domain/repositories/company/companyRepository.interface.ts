import { Company } from '@prisma/client'
import { GlobalRepository } from '../repositoy.intreface'
import { Tcompany } from '@/domain/types/company'
import { PrismaClient } from '@prisma/client/extension'

export interface CompanyRepositoryInterface extends GlobalRepository<Company> {
  create(data: Tcompany, prismaClient?: PrismaClient): Promise<Company>
  findByRegistrationCode(registrationCode: string): Promise<Company | null>
  findByCnpj(cnpj: string): Promise<Company | null>
  findById(id: string): Promise<Company | null>
  findAll(): Promise<Company[]>
  update(id: string, data: Company): Promise<Company | null>
  delete(id: string): Promise<void>
}
