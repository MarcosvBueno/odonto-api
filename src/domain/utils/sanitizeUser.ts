/* eslint-disable @typescript-eslint/no-unused-vars */

import { User } from '@prisma/client'

export function sanitizeUser(user: User): Omit<User, 'password'> {
  const { password, ...rest } = user
  return rest
}
