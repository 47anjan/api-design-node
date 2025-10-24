import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type JWTPayload } from '../utils/jwt.ts'

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader?.split(' ')[1]

    if (!token) {
      return res.json({ error: 'Bad Request' }).status(401)
    }

    const payload = await verifyToken(token)

    req.user = payload

    next()
  } catch (error) {
    console.log({ error })
    return res.json({ error: 'Forbidden' }).status(403)
  }
}
