import { HashComparer, Hasher } from '@/data/contracts'
import argon2 from 'argon2'

export class Argon2Adapter implements Hasher, HashComparer {
  async compare (plaintext: string, digest: string): Promise<boolean> {
    return argon2.verify(digest, plaintext)
  }

  async hash (plaintext: string): Promise<string> {
    return argon2.hash(plaintext, { type: argon2.argon2id })
  }
}
