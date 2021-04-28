import { AddPersonRepository, AddTeacherRepository, Hasher, LoadPersonByEmailRepository } from '@/data/contracts'
import { EmailInUseError } from '@/domain/errors'
import { AddTeacher } from '@/domain/usecases'
import { left } from '@/shared/either'

export class DbAddTeacher implements AddTeacher {
  constructor (
    private readonly loadPersonByEmail: LoadPersonByEmailRepository,
    private readonly addPerson: AddPersonRepository,
    private readonly addTeacher: AddTeacherRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (params: AddTeacher.Params): Promise<AddTeacher.Result> {
    const foundPerson = await this.loadPersonByEmail.call(params.email)

    if (foundPerson) {
      return left(new EmailInUseError())
    }

    params.password = await this.hasher.hash(params.password)
    const person = await this.addPerson.call(params)
    await this.addTeacher.call({
      registration: Number(params.registration),
      person_id: person.id
    })
  }
}
