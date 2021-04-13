import { UserNotFoundError } from '@/domain/errors'
import { Account } from '@/domain/entities/account'
import { Either } from '@/shared/either'

export interface Authentication {
  execute: (params: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Result = Either<UserNotFoundError, Account>
}
