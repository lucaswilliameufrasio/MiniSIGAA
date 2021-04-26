import { UsecaseError } from './usecase-error'

export class StudentNotFoundError extends Error implements UsecaseError {
  constructor () {
    super('This student could not be found.')
    this.name = 'StudentNotFoundError'
  }
}
