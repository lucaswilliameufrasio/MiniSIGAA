import {
  LoadUserByEmailRepository,
  HashComparer,
  Encrypter,
  LoadAdvisorByUserIdRepository,
} from '@/data/contracts'
import { UserNotFoundError } from '@/data/usecases/errors'
import { AccessPermissionError, InvalidPasswordError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { left, right } from '@/shared/either'

export class DbAdvisorAuthentication implements Authentication {
  constructor(
    private readonly loadAdvisorByUserId:LoadAdvisorByUserIdRepository,
    private readonly loadUserByEmail: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(params: Authentication.Params): Promise<Authentication.Result> {
    const userFound = await this.loadUserByEmail.call(params.email)

    if (!userFound) {
      return left(new UserNotFoundError())
    }

    const isPasswordValid = this.hashComparer.compare(
      params.password,
      userFound.password,
    )

    if (!isPasswordValid) {
      return left(new InvalidPasswordError())
    }

    const isAnAdvisor = await this.loadAdvisorByUserId.call(userFound.id)

    if (!isAnAdvisor) {
      return left(new AccessPermissionError())
    }

    const token = await this.encrypter.encrypt(userFound.id.toString())

    return right({
      name: userFound.name,
      role: 'advisor',
      token,
    })
  }
}
