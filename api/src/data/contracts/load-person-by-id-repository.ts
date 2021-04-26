export interface LoadPersonByIdRepository {
  call: (id: number) => Promise<LoadPersonByIdRepository.Result>
}

export namespace LoadPersonByIdRepository {
  export type Result = {
    id: number
    name: string
    email: string
    password: string
  }
}
