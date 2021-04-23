import {
  LoadPersonByEmailRepository,
  HashComparer,
  Encrypter,
  LoadAdvisorByPersonIdRepository,
  LoadTeacherByPersonIdRepository,
  LoadStudentByPersonIdRepository
} from '@/data/contracts'
import {
  AccessPermissionError,
  InvalidPasswordError,
  UserNotFoundError
} from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { left, right } from '@/shared/either'

enum Role {
  student = 'student',
  advisor = 'advisor',
  teacher = 'teacher',
}

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAdvisorByPersonId: LoadAdvisorByPersonIdRepository,
    private readonly loadStudentByPersonId: LoadStudentByPersonIdRepository,
    private readonly loadTeacherByPersonId: LoadTeacherByPersonIdRepository,
    private readonly loadPersonByEmail: LoadPersonByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute (params: Authentication.Params): Promise<Authentication.Result> {
    const personFound = await this.loadPersonByEmail.call(params.email)

    if (!personFound) {
      return left(new UserNotFoundError())
    }

    let existInRoleRequested: object | undefined

    if (params.role === Role[params.role]) {
      const roles = {
        advisor: await this.loadAdvisorByPersonId.call(personFound.id),
        student: await this.loadStudentByPersonId.call(personFound.id),
        teacher: await this.loadTeacherByPersonId.call(personFound.id)
      }

      existInRoleRequested = roles[params.role]

      if (!existInRoleRequested || existInRoleRequested === undefined) {
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
