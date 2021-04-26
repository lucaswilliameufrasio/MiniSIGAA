import { getEnv } from '@/main/config/env'
import {
  LoadPersonByEmailKnexRepository,
  LoadAdvisorByPersonIdKnexRepository,
  LoadTeacherByPersonIdKnexRepository,
  LoadStudentByPersonIdKnexRepository
} from '@/infra/repositories'
import { JwtAdapter, Argon2Adapter } from '@/infra/cryptography'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { Authentication } from '@/domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const loadPersonByEmailRepository = new LoadPersonByEmailKnexRepository()
  const loadTeacherByPersonIdRepository = new LoadTeacherByPersonIdKnexRepository()
  const loadStudentByPersonIdRepository = new LoadStudentByPersonIdKnexRepository()
  const loadAdvisorByPersonIdRepository = new LoadAdvisorByPersonIdKnexRepository()
  const argon2Adapter = new Argon2Adapter()
  const jwtAdapter = new JwtAdapter(getEnv('jwtSecret'))
  return new DbAuthentication(
    loadAdvisorByPersonIdRepository,
    loadStudentByPersonIdRepository,
    loadTeacherByPersonIdRepository,
    loadPersonByEmailRepository,
    argon2Adapter,
    jwtAdapter
  )
}
