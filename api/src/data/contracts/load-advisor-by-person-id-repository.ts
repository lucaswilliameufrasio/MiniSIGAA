export interface LoadAdvisorByPersonIdRepository {
  call: (userId: number) => Promise<LoadAdvisorByPersonIdRepository.Result>
}

export namespace LoadAdvisorByPersonIdRepository {
  export type Result = {
    id: number
    registration: number
  }
}
