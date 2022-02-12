/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import store from 'store'
import httpError from 'http-errors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// require('dotenv').config();

export default {

  home (req: Request<{}, {}, {}>, res: Response) {
    res.status(200).render('documentation.ejs')
  },

  async login (req: Request<{}, {}, { email: string, password: string }>, res: Response) {
    const { email, password } = req.body
    try {
      const login = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (login) {
        const hash = bcrypt.hashSync(password, login.password)
        if (hash === login.password) {
          const user = login
          const accessToken = jwt.sign(
            { login: user.uuid },
            'teste',
            { expiresIn: 86400 }
          )

          login.password = 'undefined'

          await store.set('user', user)

          return res.status(200).json(
            {
              message: `${login.email} has been authenticated`,
              accessToken,
              user: user.name,
              permission: user.permission,
              superUser: user.superUser,
              id: user?.uuid

            }
          )
        }
      } else {
        return res.status(400).json({ Error: 'Email or Password Error' })
      }
    } catch (error) {
      return res.status(400).json(
        {
          error: true,
          message: 'Any user found!!!'
        }
      )
    }
  },

  async store (req: Request<{}, {}, { name: string, password: string,
    superUser: boolean, email: string, permission: string }>, res: Response) {
    const { name, email, password, superUser, permission } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
      const emailUser = await prisma.user.findFirst({
        where: { email: email }
      })

      if (emailUser != null) {
        throw new httpError.Conflict(`Error email: ${emailUser.email} already exist`)
      }
      const user = await prisma.user.create({
        data: {
          name,
          superUser: superUser || false,
          email: email,
          password: hash,
          Permission: {
            connect: {
              permissionName: permission || 'USER'
            }
          }
        }
      })

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Error to insert a new user', error })
    }
  }

}
