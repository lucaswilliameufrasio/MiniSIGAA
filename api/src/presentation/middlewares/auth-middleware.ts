import { Middleware, HttpResponse } from '@/presentation/contracts'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { LoadPersonByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadPersonByToken: LoadPersonByToken,
    private readonly roles: string[]
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const person: LoadPersonByToken.Result = await this.loadPersonByToken.load(accessToken, this.roles)
        if (person.isLeft()) {
          return forbidden(person.value)
        }
        return ok({ personId: person.value })
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
