export interface LoadStudentByIdRepository {
  call: (id: number) => Promise<LoadStudentByIdRepository.Result>
}

export namespace LoadStudentByIdRepository {
  export type Result = {
    id: number
    registration: number
    ingress_year: number
    status: string
    course_id: number
    person_id: number
  }
}
