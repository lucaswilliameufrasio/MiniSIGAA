export interface LoadTeachersRepository {
  call: () => Promise<LoadTeachersRepository.Result[]>
}

export namespace LoadTeachersRepository {
  export type Result = {
    name: string
    email: string
    registration: number
    person_id: number
  }
}
