import { DbAuthentication } from '@/data/usecases/db-authentication'
import { getEnv } from '@/main/config/env'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { LoadPersonByEmailKnexRepository , LoadAdvisorByPersonIdKnexRepository, LoadTeacherByPersonIdKnexRepository, LoadStudentByPersonIdKnexRepository } from '@/infra/repositories'
import { Authentication } from '@/domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const loadPersonByEmailRepository = new LoadPersonByEmailKnexRepository()
  const loadTeacherByPersonIdRepository = new LoadTeacherByPersonIdKnexRepository()
  const loadStudentByPersonIdRepository = new LoadStudentByPersonIdKnexRepository()
  const loadAdvisorByPersonIdRepository = new LoadAdvisorByPersonIdKnexRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(getEnv('jwtSecret'))
  return new DbAuthentication(
    loadAdvisorByPersonIdRepository,
    loadStudentByPersonIdRepository,
    loadTeacherByPersonIdRepository,
    loadPersonByEmailRepository,
    bcryptAdapter,
    jwtAdapter
  )
}
