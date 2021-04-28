import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/contracts'
import { MissingParamError } from '@/presentation/errors'
import { LoadAvailableOffers } from '@/domain/usecases'
import { StudentNotFoundError } from '@/domain/errors'
import { Either } from '@/shared/either'

export class LoadOffersNotChosenController implements Controller {
  constructor (private readonly loadAvailableOffers: LoadAvailableOffers) {}

  async handle (
    request: LoadOffersNotChosenController.Request
  ): Promise<HttpResponse> {
    const requiredField = 'student_id'

    if (
      request[requiredField] === undefined &&
      (request.user_id === undefined || request.user_id === null)
    ) {
      return badRequest(new MissingParamError(requiredField))
    }

    try {
      const id = request.student_id ?? request.user_id
      const offersNotChosenResult: Either<
      StudentNotFoundError,
      LoadAvailableOffers.Offers[]
      > = await this.loadAvailableOffers.execute({
        studentId: id
      })

      if (offersNotChosenResult.isLeft()) {
        return badRequest(offersNotChosenResult.value)
      }

      return ok(offersNotChosenResult.value)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOffersNotChosenController {
  export type Request = {
    student_id: number
    user_id: number
  }
}
