import { Controller, HttpResponse } from '@/presentation/contracts'
import { AddTeacher } from '@/domain/usecases'
import { badRequest, noContent } from '../helpers'
import { Either } from '@/shared/either'
import { EmailInUseError } from '@/domain/errors'

export class AddTeacherController implements Controller {
  constructor (private readonly addTeacher: AddTeacher) {}

  async handle (request: AddTeacherController.Request): Promise<HttpResponse> {
    const requiredFields = [
      'name',
      'registration',
      'email',
      'password',
      'cpf',
      'sex',
      'age',
      'city',
      'state',
      'street',
      'house_number'
    ]

    for (const field of requiredFields) {
      if (
        request[field] === undefined ||
        request[field] === '' ||
        request[field] === null
      ) {
        return badRequest(new MissingParamError(field))
      }
    }

    try {
      const result: Either<
      EmailInUseError,
      void
      > = await this.addTeacher.execute({
        name: request.name,
        email: request.email,
        age: request.age,
        cpf: request.cpf,
        password: request.password,
        registration: request.registration,
        sex: request.sex,
        address: {
          city: request.city,
          country_state: request.state,
          house_number: request.house_number,
          street: request.street
        }
      })

      if (result?.isLeft()) {
        return badRequest(result.value)
      }

      return noContent()
    } catch (error) {
      // I will replace that with serverError after the class ending
      return badRequest(error)
    }
  }
}

export namespace AddTeacherController {
  export type Request = {
    name: string
    registration: string
    email: string
    password: string
    cpf: string
    sex: string
    age: number
    city: string
    state: string
    street: string
    house_number: number
  }
}
