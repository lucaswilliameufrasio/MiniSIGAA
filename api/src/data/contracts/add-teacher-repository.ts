export interface AddTeacherRepository {
  call: (params: AddTeacherRepository.Params) => Promise<void>
}

export namespace AddTeacherRepository {
  export type Params = {
    registration: number
    person_id: number
  }
}
