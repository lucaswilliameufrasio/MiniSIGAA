import { makeDbLoadTeachers } from '@/main/factories/usecases'
import { Controller } from '@/presentation/contracts'
import { LoadTeachersController } from '@/presentation/controllers'

export const makeLoadTeachersController = (): Controller => {
  return new LoadTeachersController(makeDbLoadTeachers())
}
