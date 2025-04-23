import { Request, Response, NextFunction } from 'express'
import { CreateUserUseCase } from '../use-case/user/createUserUseCase'
import AppError from '../error/appError'
import Jwt from 'jsonwebtoken'
import { LoginUserUseCase } from '../use-case/user/loginUserUseCase'
import { FindAllUsersUseCase } from '../use-case/user/findAllUsersUseCase'
import { FindByIdUserUseCase } from '../use-case/user/findByIdUserUseCase'

export default class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

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

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body

    if (!email) {
      throw new AppError('email is required')
    }

    if (!password) {
      throw new AppError('password is required')
    }

    try {
      const user = await this.loginUserUseCase.execute(email, password)

      const token = Jwt.sign(
        { id: user.id, role: user.role },
        process.env?.JWT_SECRET as string,
        {
          expiresIn: '1d',
        },
      )

      res.status(200).json({ user, token })
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.findAllUsersUseCase.execute()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      if (!id) {
        throw new AppError('id is required', 400)
      }

      const user = await this.findByIdUserUseCase.execute(id)
      if (!user) {
        throw new AppError('User not found', 404)
      }
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
