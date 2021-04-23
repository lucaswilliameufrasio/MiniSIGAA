export interface LoadStudentByPersonIdRepository {
  call: (userId: number) => Promise<LoadStudentByPersonIdRepository.Result>
}

export namespace LoadStudentByPersonIdRepository {
  export type Result = {
    id: number
    registration: number
  }
}
