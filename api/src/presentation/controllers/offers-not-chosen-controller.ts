import {
  badRequest,
  ok,
  serverError
} from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/contracts'
import { MissingParamError } from '@/presentation/errors'
import { LoadAvailableOffers } from '@/domain/usecases'
import { StudentNotFoundError } from '@/domain/errors'
import { Either } from '@/shared/either'

export class OffersNotChosenController implements Controller {
  constructor (private readonly loadAvailableOffers: LoadAvailableOffers) {}

  async handle (
    request: OffersNotChosenController.Request
  ): Promise<HttpResponse> {
    const requiredFields = ['student_id']

    for (const field of requiredFields) {
      if (request[field] === undefined) {
        return badRequest(new MissingParamError(field))
      }
    }

    try {
      const offersNotChosenResult: Either<
      StudentNotFoundError,
      LoadAvailableOffers.Offers[]
      > = await this.loadAvailableOffers.execute({
        studentId: request.student_id
      })

      if (offersNotChosenResult.isLeft()) {
        return badRequest(offersNotChosenResult.value)
      }

      return ok(offersNotChosenResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace OffersNotChosenController {
  export type Request = {
    student_id: number
  }
}
