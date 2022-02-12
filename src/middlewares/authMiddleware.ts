import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface tokenPayLod {
    id: string,
    iat: number,
    exp: number
}

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, 'teste')
    // console.log(data)
    const { id } = data as tokenPayLod

    req.userId = id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token error' })
  }
}
