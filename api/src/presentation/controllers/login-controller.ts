import { badRequest, ok, serverError, unauthorizedError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/contracts'
import { MissingParamError } from '@/presentation/errors'
import { InvalidPasswordError, UserNotFoundError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    const requiredFields = ['email', 'password', 'role']

    for (const field of requiredFields) {
      if (request[field] === undefined) {
        return badRequest(new MissingParamError(field))
      }
    }

    try {
      const authenticationResult = await this.authentication.execute(request)

      if (authenticationResult.isLeft()) {
        if (authenticationResult instanceof UserNotFoundError) {
          return badRequest(new UserNotFoundError())
        }

        if (authenticationResult instanceof InvalidPasswordError) {
          return badRequest(new InvalidPasswordError())
        }

        return unauthorizedError()
      }

      return ok(authenticationResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
    role: string
  }
}
