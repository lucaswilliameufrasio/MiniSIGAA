export interface LoadTeacherByPersonIdRepository {
  call: (userId: number) => Promise<LoadTeacherByPersonIdRepository.Result>
}

export namespace LoadTeacherByPersonIdRepository {
  export type Result = {
    id: number
    registration: number
  }
}
