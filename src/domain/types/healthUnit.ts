export interface ThealthUnit {
  name: string
  street: string
  number: string
  district: string
  city: string
  state: string
  zipCode: string
  isVerified: boolean
  userId: string
  companyId?: string | null
  equipment?: Array<{
    name: string
    model: string
    serialNumber: string
  }>
}

export interface TEquipment {
  name: string
  model: string
  serialNumber: string
  companyId?: string | null
}
