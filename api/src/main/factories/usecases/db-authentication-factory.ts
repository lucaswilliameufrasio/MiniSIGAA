import { DbAuthentication } from '@/data/usecases/db-authentication'
import { getEnv } from '@/main/config/env'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { LoadPersonByEmailKnexRepository } from '@/infra/repositories'
import { LoadAdvisorByPersonIdKnexRepository } from '@/infra/repositories/load-advisor-by-person-id-knex-repository'
import { Authentication } from '@/domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const loadPersonByEmailRepository = new LoadPersonByEmailKnexRepository()
  const loadAdvisorByPersonIdRepository = new LoadAdvisorByPersonIdKnexRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(getEnv('jwtSecret'))
  return new DbAuthentication(
    loadAdvisorByPersonIdRepository,
    loadPersonByEmailRepository,
    bcryptAdapter,
    jwtAdapter
  )
}
