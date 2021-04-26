export interface LoadOffersNotChosenByStudentIdRepository {
  call: (studentId: number) => Promise<LoadOffersNotChosenByStudentIdRepository.Result[]>
}

export namespace LoadOffersNotChosenByStudentIdRepository {
  export type Result = {
    offer_id: number
    discipline_name: string
    discipline_code: string
  }
}
