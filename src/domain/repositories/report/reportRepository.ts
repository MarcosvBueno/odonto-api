import { Report } from '@prisma/client'
import { ReportRepositoryInterface } from './reportRepository.interface'
import prisma from '../../../infrastructure/prisma/prisma'
import { TReport } from '../../../domain/types/report'

export class ReportRepository implements ReportRepositoryInterface {
  async create(data: TReport): Promise<Report> {
    return await prisma.report.create({
      data,
    })
  }

  async findById(id: string): Promise<Report | null> {
    return await prisma.report.findUnique({
      where: { id },
    })
  }

  async findAll(): Promise<Report[]> {
    return await prisma.report.findMany()
  }

  async update(id: string, data: Report): Promise<Report | null> {
    return await prisma.report.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.report.delete({
      where: { id },
    })
  }
}
