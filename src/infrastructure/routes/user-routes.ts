import { makeUserController } from '../../domain/use-case/user/factory'
import { Router } from 'express'

const UserRoutes = Router()
const userController = makeUserController()

UserRoutes.post('/auth', (req, res, next) => {
  userController.login(req, res, next)
})

export default UserRoutes
