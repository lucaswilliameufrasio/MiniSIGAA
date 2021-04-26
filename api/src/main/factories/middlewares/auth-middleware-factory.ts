import { makeDbLoadPersonByToken } from '@/main/factories/usecases'
import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/contracts'

export const makeAuthMiddleware = (roles: string[]): Middleware => {
  return new AuthMiddleware(makeDbLoadPersonByToken(), roles)
}
