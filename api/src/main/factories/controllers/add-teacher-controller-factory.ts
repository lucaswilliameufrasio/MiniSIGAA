import { makeDbAddTeacher } from '@/main/factories/usecases'
import { AddTeacherController } from '@/presentation/controllers'
import { Controller } from '@/presentation/contracts'

export const makeAddTeacherController = (): Controller => {
  const controller = new AddTeacherController(makeDbAddTeacher())
  return controller
}
