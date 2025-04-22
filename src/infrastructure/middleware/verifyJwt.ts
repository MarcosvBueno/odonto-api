import { NextFunction, Request, Response } from 'express'
import Jwt from 'jsonwebtoken'
import { Unauthorized } from '../../domain/error/unauthrized'
import { env } from '../env'

export const verifyJwt = (options?: {
  requiredRole?: string
  allowExpired?: boolean
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization']

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return next(new Unauthorized('invalid token format'))
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return next(new Unauthorized('token not provided'))
    }

    try {
      const secret = env.JWT_SECRET
      const verifyOptions: Jwt.VerifyOptions = {
        ignoreExpiration: options?.allowExpired || false,
      }

      const decoded = Jwt.verify(token, secret, verifyOptions) as {
        id: string
        role: string
        companyId?: string
        healthUnitId?: string
      }

      req.user = {
        id: decoded.id,
        role: decoded.role,
        companyId: decoded.companyId,
        healthUnitId: decoded.healthUnitId,
      }

      if (options?.requiredRole && decoded.role !== options.requiredRole) {
        return next(new Unauthorized('access denied: only admin can access'))
      }

      next()
    } catch (error) {
      if (error instanceof Jwt.TokenExpiredError) {
        return next(new Unauthorized('expired Token'))
      }
      if (error instanceof Jwt.JsonWebTokenError) {
        return next(new Unauthorized('invalid Token'))
      }
      return next(new Unauthorized('authentication failed'))
    }
  }
}
