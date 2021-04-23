import { makeDbAuthentication } from '@/main/factories/usecases'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/contracts'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication())
  return controller
}
