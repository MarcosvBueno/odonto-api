import { ReportStatus } from '@prisma/client'

export interface TReport {
  title: string
  description: string
  healthUnitId: string
  status?: ReportStatus
  companyId: string
  equipmentId: string
}
