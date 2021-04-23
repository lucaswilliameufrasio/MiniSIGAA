export interface LoadPersonByEmailRepository {
  call: (email: string) => Promise<LoadPersonByEmailRepository.Result>
}

export namespace LoadPersonByEmailRepository {
  export type Result = {
    id: number
    name: string
    email: string
    password: string
  }
}
