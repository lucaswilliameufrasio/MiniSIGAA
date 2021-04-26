import { Decrypter, Encrypter } from '@/data/contracts'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret)
  }

  async decrypt (ciphertext: string): Promise<string> {
    const { id } = jwt.verify(ciphertext, this.secret) as any
    return id
  }
}
