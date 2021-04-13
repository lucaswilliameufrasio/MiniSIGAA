import { UsecaseError } from './usecase-error'

export class UserNotFoundError extends Error implements UsecaseError {
  constructor () {
    super('This user could not be found.')
    this.name = 'UserNotFoundError'
  }
}
