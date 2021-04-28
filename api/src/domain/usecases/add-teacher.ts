import { EmailInUseError } from '@/domain/errors'
import { Either } from '@/shared/either'

export interface AddTeacher {
  execute: (params: AddTeacher.Params) => Promise<AddTeacher.Result>
}

export namespace AddTeacher {
  export type Params = {
    name: string
    registration: string
    email: string
    password: string
    cpf: string
    sex: string
    age: number
    address: {
      city: string
      country_state: string
      street: string
      house_number: number
    }
  }

  export type Result = Either<EmailInUseError, void>
}
