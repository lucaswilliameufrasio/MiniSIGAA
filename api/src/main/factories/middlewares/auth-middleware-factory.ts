import { makeDbLoadPersonByToken } from '@/main/factories/usecases'
import { Middleware } from '@/presentation/contracts'
import { AuthMiddleware } from '@/presentation/middlewares'

export const makeAuthMiddleware = (roles: string[]): Middleware => {
  return new AuthMiddleware(makeDbLoadPersonByToken(), roles)
}
