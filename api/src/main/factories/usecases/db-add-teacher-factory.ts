import { DbAddTeacher } from '@/data/usecases'
import { AddTeacher } from '@/domain/usecases'
import { Argon2Adapter } from '@/infra/cryptography'
import {
  AddPersonKnexRepository,
  AddTeacherKnexRepository,
  LoadPersonByEmailKnexRepository
} from '@/infra/repositories'

export const makeDbAddTeacher = (): AddTeacher => {
  const loadPersonByEmailKnexRepository = new LoadPersonByEmailKnexRepository()
  const addPersonKnexRepository = new AddPersonKnexRepository()
  const addTeacherKnexRepository = new AddTeacherKnexRepository()
  const argon2Adapter = new Argon2Adapter()
  return new DbAddTeacher(
    loadPersonByEmailKnexRepository,
    addPersonKnexRepository,
    addTeacherKnexRepository,
    argon2Adapter
  )
}
