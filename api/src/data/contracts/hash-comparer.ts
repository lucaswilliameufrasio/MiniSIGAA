export interface HashComparer {
    compare(plaintext: string, digest: string): boolean
}