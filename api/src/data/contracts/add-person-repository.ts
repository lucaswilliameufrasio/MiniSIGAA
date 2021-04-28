export interface AddPersonRepository {
  call: (params: AddPersonRepository.Params) => Promise<AddPersonRepository.Result>
}

export namespace AddPersonRepository {
  export type Params = {
    name: string
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

  export type Result = {
    id: number
  }
}
