export interface LoadUserByEmailRepository {
  call: (email: string) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
  export type Result = {
    id: number
    name: string
    email: string
    password: string
  }
}
