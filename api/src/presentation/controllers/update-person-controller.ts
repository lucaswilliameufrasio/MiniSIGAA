import { Controller, HttpResponse } from '@/presentation/contracts'
import { badRequest, noContent } from '@/presentation/helpers'
import { UpdatePerson } from '@/domain/usecases'

export class UpdatePersonController implements Controller {
  constructor (private readonly updateTeacher: UpdatePerson) {}

  async handle (request: UpdatePersonController.Request): Promise<HttpResponse> {
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
      return badRequest(error)
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
