import { HashComparer } from '@/data/contracts'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer {
  async compare (plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}
