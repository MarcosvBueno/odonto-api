import 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        role: string
        companyId?: string
        healthUnitId?: string
      }
    }
  }
}
