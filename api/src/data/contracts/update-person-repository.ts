export interface UpdatePersonRepository {
  call: (params: UpdatePersonRepository.Params) => Promise<void>
}

export namespace UpdatePersonRepository {
  export type Params = {
    id: number
    name: string
    email: string
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

}
