import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async getAll (req: Request<{}, {}, {}>, res: Response) {
    try {
      const permissions = await prisma.permission.findMany()
      if (!permissions) {
        return res.status(404).json('ss Not Found!')
      }
      return res.status(200).json(permissions)
    } catch (error) {
      return res.status(400).json('Error to find permissions')
    }
  },

  async getById (req: Request<{ permissionId: string }, {}, {}>, res: Response) {
    const { permissionId } = req.params
    try {
      const permission = await prisma.permission.findFirst({
        where: { permissionUuid: permissionId }
      })

      if (!permission) {
        return res.status(404).json('Any User Found')
      }
      return res.status(200).json(permission)
    } catch (error) {
      return res.status(400).json('Error to find permission')
    }
  },

  async store (req: Request<{}, {}, { permissionName: string, permissionLevel: number }>, res: Response) {
    const { permissionName, permissionLevel } = req.body
    try {
      const findPermission = await prisma.permission.findFirst({
        where: { permissionName: permissionName }
      })
      if (findPermission != null) {
        return res.status(404).json('Permission already exist!')
      }
      const permission = await prisma.permission.create({
        data: {
          permissionName: permissionName,
          permissionLevel: permissionLevel
        }
      })
      return res.status(200).json(permission)
    } catch (error) {
      return res.status(400).json('Error to add permission')
    }
  },

  async updatePermission (req: Request<{ permissionId: string }, {}, { permissionName: string, permissionLevel: number }>, res: Response) {
    const { permissionName, permissionLevel } = req.body
    const { permissionId } = req.params
    try {
      const findPermission = await prisma.permission.findFirst({
        where: { permissionUuid: permissionId }
      })
      if (!findPermission) {
        return res.status(404).json('Permission doenst exist!')
      }
      const editPermission = await prisma.permission.update({
        where: { permissionUuid: permissionId },
        data: {
          permissionName: permissionName,
          permissionLevel: permissionLevel
        }
      })
      return res.status(200).json({
        old: findPermission,
        new: editPermission
      })
    } catch (error) {
      return res.status(400).json('Error to edit permission')
    }
  }
}
