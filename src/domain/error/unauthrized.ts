import AppError from '../error/appError'

export class Unauthorized extends AppError {
  constructor(message: string) {
    super(message, 401)
  }
}
