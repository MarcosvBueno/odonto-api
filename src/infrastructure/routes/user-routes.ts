import { makeUserController } from '../../domain/use-case/user/factory'
import { Router } from 'express'
import { verifyJwt } from '../middleware/verifyJwt'

const UserRoutes = Router()
const userController = makeUserController()

UserRoutes.post('/auth', userController.login.bind(userController))
UserRoutes.get(
  '/users',
  verifyJwt({ requiredRole: 'COMPANY_ADMIN' }),
  userController.findAll.bind(userController),
)
UserRoutes.get('/user/:id', userController.findById.bind(userController))
UserRoutes.put(
  '/user/update/:id',
  verifyJwt(),
  userController.update.bind(userController),
)
UserRoutes.delete(
  '/user/delete/:id',
  verifyJwt(),
  userController.delete.bind(userController),
)

export default UserRoutes
