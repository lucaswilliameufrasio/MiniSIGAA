import { HashComparer } from '@/data/contracts'
import argon2 from 'argon2'

export class Argon2Adapter implements HashComparer {
  async compare (plaintext: string, digest: string): Promise<boolean> {
    return argon2.verify(digest, plaintext)
  }
}
