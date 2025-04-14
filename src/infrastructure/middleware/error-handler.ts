import { ZodError } from 'zod'
import AppError from '../../domain/error/appError'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      type: 'validation_error',
      errors: err.errors,
    })
    return
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
    return
  }

  console.error(err)

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
  return
}
