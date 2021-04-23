import { Controller } from '@/presentation/contracts'
import { LoginController } from '@/presentation/controllers'
import { makeDbAuthentication } from '../usecases/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication())
  return controller
}
