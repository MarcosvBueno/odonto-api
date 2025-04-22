import { makeUserController } from '../../domain/use-case/user/factory'
import { Router } from 'express'

const UserRoutes = Router()
const userController = makeUserController()

UserRoutes.post('/auth', userController.login.bind(userController))

export default UserRoutes
