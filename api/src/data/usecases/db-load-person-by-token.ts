import {
  Decrypter,
  LoadAdvisorByPersonIdRepository,
  LoadPersonByIdRepository,
  LoadStudentByPersonIdRepository,
  LoadTeacherByPersonIdRepository
} from '@/data/contracts'
import { AccessPermissionError } from '@/domain/errors'
import { LoadPersonByToken } from '@/domain/usecases'
import { Role } from '@/domain/entities/account'
import { left, right } from '@/shared/either'

export class DbLoadPersonByToken implements LoadPersonByToken {
  constructor (
    private readonly loadAdvisorByPersonId: LoadAdvisorByPersonIdRepository,
    private readonly loadStudentByPersonId: LoadStudentByPersonIdRepository,
    private readonly loadTeacherByPersonId: LoadTeacherByPersonIdRepository,
    private readonly loadPersonById: LoadPersonByIdRepository,
    private readonly decrypter: Decrypter
  ) {}

  async load (
    accessToken: string,
    roles: string[]
  ): Promise<LoadPersonByToken.Result> {
    let tokenPayload: string

    try {
      tokenPayload = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return left(new AccessPermissionError())
    }

    if (tokenPayload) {
      const person = await this.loadPersonById.call(Number(tokenPayload))

      if (person) {
        const existInRoleRequested = new Array(roles.length)
        const roleData = {
          advisor: await this.loadAdvisorByPersonId.call(Number(person.id)),
          student: await this.loadStudentByPersonId.call(Number(person.id)),
          teacher: await this.loadTeacherByPersonId.call(Number(person.id))
        }

        roles.forEach((role, roleIndex) => {
          if (role === Role[role]) {
            existInRoleRequested[roleIndex] = roleData[role]
          }
        })

        const hasOneRolePermission = existInRoleRequested.filter(role => role !== undefined)

        if (!hasOneRolePermission.length) {
          return left(new AccessPermissionError())
        }

        return right({ id: person.id })
      }
    }
    return left(new AccessPermissionError())
  }
}
