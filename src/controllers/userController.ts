import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async getAll (req: Request<{}, {}, { name: string }>, res: Response) {
    try {
      const user = await prisma.user.findMany()
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json('Error to find users')
    }
  },

  async getById (req: Request<{ userId: string }, {}, {}>, res: Response) {
    const { userId } = req.params
    try {
      const user = await prisma.user.findFirst({
        where: { uuid: userId }
      })

      if (!user) {
        return res.status(404).json('Any User Found')
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json('Error to find users')
    }
  },

  async updateUser (req: Request<{ userId: string }, {}, {
    name: string, email: string, password: string
    cpf: string, rg: string, superUser: boolean, permission: string
  }>, res: Response) {
    const { userId } = req.params
    const { name, email, password, cpf, rg, superUser, permission } = req.body
    try {
      const findUser = await prisma.user.findFirst({
        where: { uuid: userId }
      })

      if (!findUser) {
        return res.status(404).json('User Not Found!')
      }
      const userEdit = await prisma.user.update({
        where: { uuid: userId },
        data: {
          name: name,
          email: email,
          password: password,
          cpf: cpf,
          rg: rg,
          superUser: superUser || false,
          Permission: {
            connect: {
              permissionName: permission || 'USER'
            }
          }
        }
      })

      return res.status(200).json(userEdit)
    } catch (error) {
      return res.status(400).json('Error to add users')
    }
  },

  async deleteUser (req: Request<{ userId: string }, {}, {}>, res: Response) {
    const { userId } = req.params
    try {
      const user = await prisma.user.findFirst({
        where: { uuid: userId }
      })

      if (!user) {
        return res.status(404).json('Any User Found')
      }
      await prisma.user.delete({
        where: { uuid: userId }
      })
      return res.status(201).json({
        message: `User: ${user.name} deleted`
      })
    } catch (error) {
      return res.status(400).json('Error to find users')
    }
  }

  // disabled store user until decided if user can be created alrerady logged

  // async store(req: Request<{},{},{name: string, email: string, password: string
  // cpf: string, rg: string, superUser: boolean, permission: string}>, res: Response) {
  //   const {name, email, password, cpf, rg, superUser, permission} = req.body
  //   try {
  //     let userEmail = await prisma.user.findFirst({
  //       where: {email: email}
  //     })

  //     if (!userEmail) {
  //       return res.status(400).json('Email already existe')
  //     }
  //     let userCreate = await prisma.user.create({
  //       data: {
  //         name: name,
  //         email: email,
  //         password: password,
  //         cpf: cpf,
  //         rg: rg,
  //         superUser: superUser ? superUser : false,
  //         Permission: {
  //           connect: {
  //             permissionName: permission ? permission : 'USER'
  //           }
  //         }
  //       }
  //     });

  //     return res.status(200).json(userCreate)
  //   } catch (error) {
  //     return res.status(400).json('Error to add users')
  //   }
  // },
}
