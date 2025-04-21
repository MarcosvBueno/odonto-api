import { HealthUnit } from '@prisma/client'
import { GlobalRepository } from '../repositoy.intreface'
import { ThealthUnit } from '../../types/healthUnit'

export interface HealthUnitRepositoryInterface
  extends GlobalRepository<HealthUnit> {
  create(data: ThealthUnit): Promise<HealthUnit>
  findById(id: string): Promise<HealthUnit | null>
  findByName(name: string): Promise<HealthUnit | null>
  findAll(): Promise<HealthUnit[]>
  update(id: string, data: ThealthUnit): Promise<HealthUnit | null>
  delete(id: string): Promise<void>
}
