import bcrypt from 'bcrypt'
import env from '../../env.ts'

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS)
}
