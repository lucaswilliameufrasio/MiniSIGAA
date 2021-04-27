import {
  badRequest,
  forbidden,
  ok,
  serverError,
  unauthorizedError
} from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/contracts'
import { MissingParamError } from '@/presentation/errors'
import { InvalidPasswordError, UserNotFoundError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { Either } from '@/shared/either'
import { Account } from '@/domain/entities/account'

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
      const authenticationResult: Either<
      InvalidPasswordError | UserNotFoundError,
      Account
      > = await this.authentication.execute(request)

      if (authenticationResult.isLeft()) {
        if (
          authenticationResult.value instanceof InvalidPasswordError ||
          authenticationResult.value instanceof UserNotFoundError
        ) {
          return unauthorizedError()
        }

        return forbidden(authenticationResult.value)
      }

      return ok(authenticationResult.value)
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
