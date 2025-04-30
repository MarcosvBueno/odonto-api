import { Report } from '@prisma/client'
import { GlobalRepository } from '../repositoy.intreface'
import { TReport } from '@/domain/types/report'

export interface ReportRepositoryInterface extends GlobalRepository<Report> {
  create(data: TReport): Promise<Report>
  findById(id: string): Promise<Report | null>
  findAll(): Promise<Report[]>
  update(id: string, data: Report): Promise<Report | null>
  delete(id: string): Promise<void>
}
