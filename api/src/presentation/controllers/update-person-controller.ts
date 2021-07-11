import { Controller, HttpResponse } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { UpdatePerson } from '@/domain/usecases'

export class UpdatePersonController implements Controller {
  constructor (private readonly updateTeacher: UpdatePerson) {}

  async handle (request: UpdatePersonController.Request): Promise<HttpResponse> {
    const requiredFields = [
      'person_id',
      'name',
      'email',
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
      await this.updateTeacher.execute({
        id: request.person_id,
        name: request.name,
        email: request.email,
        age: request.age,
        cpf: request.cpf,
        sex: request.sex,
        address: {
          city: request.city,
          country_state: request.state,
          house_number: request.house_number,
          street: request.street
        }
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdatePersonController {
  export type Request = {
    person_id: number
    name: string
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
