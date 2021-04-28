import { UsecaseError } from './usecase-error'

export class EmailInUseError extends Error implements UsecaseError {
  constructor () {
    super('This email is already in use.')
    this.name = 'EmailInUseError'
  }
}
