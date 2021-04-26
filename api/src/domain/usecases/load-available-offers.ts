import { StudentNotFoundError } from '@/domain/errors'
import { Either } from '@/shared/either'

export interface LoadAvailableOffers {
  execute: (params: LoadAvailableOffers.Params) => Promise<LoadAvailableOffers.Result>
}

export namespace LoadAvailableOffers {
  export type Params = {
    studentId: number
  }

  export type Offers = {
    offer_id: number
    discipline_name: string
    discipline_code: string
  }

  export type Result = Either<StudentNotFoundError, Offers[]>
}
