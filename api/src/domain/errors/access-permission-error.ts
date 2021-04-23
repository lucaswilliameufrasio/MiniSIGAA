import { DomainError } from './domain-error'

export class AccessPermissionError extends Error implements DomainError {
  constructor () {
    super('You do not have required permissions')
    this.name = 'AccessPermissionError'
  }
}
