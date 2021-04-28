import { makeDbUpdatePerson } from '@/main/factories/usecases'
import { UpdatePersonController } from '@/presentation/controllers'
import { Controller } from '@/presentation/contracts'

export const makeUpdatePersonController = (): Controller => {
  return new UpdatePersonController(makeDbUpdatePerson())
}
