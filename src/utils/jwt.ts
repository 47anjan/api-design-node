import { jwtVerify, SignJWT } from 'jose'
import { createSecretKey } from 'crypto'
import env from '../../env.ts'

export interface JWTPayload extends Record<string, string> {
  id: string
  username: string
  email: string
}

export const generateToken = (payload: JWTPayload) => {
  const secret = env.JWT_SECRET
  const secretKey = createSecretKey(secret, 'utf-8')

  return new SignJWT(payload)
    .setIssuedAt()
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
    .sign(secretKey)
}

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8')

  const { payload } = await jwtVerify(token, secretKey)

  return payload as JWTPayload
}
