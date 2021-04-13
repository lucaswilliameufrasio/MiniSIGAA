export interface LoadAdvisorByUserIdRepository {
  call: (userId: number) => Promise<LoadAdvisorByUserIdRepository.Result>
}

export namespace LoadAdvisorByUserIdRepository {
  export type Result = {
    id: number
  }
}
