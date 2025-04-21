export interface ThealthUnit {
  number: string
  name: string

  street: string
  district: string
  city: string
  state: string
  zipCode: string
  isVerified: boolean
  userId: string
  companyId?: string | null
}
