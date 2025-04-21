import { Request, Response, NextFunction } from 'express'
import { CreateUserUseCase } from '../use-case/user/createUserUseCase'

export default class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userData } = req.body
      const { name, email, password } = userData

      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      })

      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
}
