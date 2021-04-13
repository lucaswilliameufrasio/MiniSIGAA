import { DomainError } from './domain-error'

export class InvalidPasswordError extends Error implements DomainError {
  constructor () {
    super('The password provided is invalid.')
    this.name = 'InvalidPasswordError'
  }
}
