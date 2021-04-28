import { UpdatePersonRepository } from '@/data/contracts'
import { UpdatePerson } from '@/domain/usecases'

export class DbUpdatePerson implements UpdatePerson {
  constructor (
    private readonly updatePerson: UpdatePersonRepository
  ) {}

  async execute (params: UpdatePerson.Params): Promise<void> {
    await this.updatePerson.call(params)
  }
}
