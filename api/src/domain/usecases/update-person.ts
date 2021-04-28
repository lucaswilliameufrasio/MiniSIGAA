export interface UpdatePerson {
  execute: (params: UpdatePerson.Params) => Promise<void>
}

export namespace UpdatePerson {
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
