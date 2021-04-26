import { Either } from '@/shared/either'
import { UserNotFoundError } from '../errors'

export interface LoadPersonByToken {
  load: (
    accessToken: string,
    roles: string[],
  ) => Promise<LoadPersonByToken.Result>
}

export namespace LoadPersonByToken {
  export type Result = Either<
  UserNotFoundError,
  {
    id: number
  }
  >
}
