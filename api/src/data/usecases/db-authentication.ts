import {
  LoadPersonByEmailRepository,
  HashComparer,
  Encrypter,
  LoadAdvisorByPersonIdRepository
} from '@/data/contracts'
import { AccessPermissionError, InvalidPasswordError, UserNotFoundError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { left, right } from '@/shared/either'

enum Role {
  student = 'student',
  advisor = 'advisor',
  teacher = 'teacher'
}

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAdvisorByPersonId: LoadAdvisorByPersonIdRepository,
    private readonly loadPersonByEmail: LoadPersonByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute (params: Authentication.Params): Promise<Authentication.Result> {
    const personFound = await this.loadPersonByEmail.call(params.email)

    if (!personFound) {
      return left(new UserNotFoundError())
    }

    let existInRoleRequested: any

    if (params.role === Role.advisor) {
      existInRoleRequested = await this.loadAdvisorByPersonId.call(personFound.id)

      if (!existInRoleRequested) {
        return left(new AccessPermissionError())
      }
    } else {
      return left(new AccessPermissionError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      params.password,
      personFound.password
    )

    if (!isPasswordValid) {
      return left(new InvalidPasswordError())
    }

    const token = await this.encrypter.encrypt(personFound.id.toString())

    return right({
      name: personFound.name,
      role: params.role,
      token
    })
  }
}
