import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async getAll (req: Request<{}, {}, {}>, res: Response) {
    try {
      const contracts = await prisma.contract.findMany()
      return res.status(200).json(contracts)
    } catch (error) {
      return res.status(400).json('Error to find contracts')
    }
  },

  async getById (req: Request<{ contractId: string }, {}, {}>, res: Response) {
    const { contractId } = req.params
    try {
      const contract = await prisma.contract.findFirst({
        where: { contractUuid: contractId }
      })

      if (!contract) {
        return res.status(404).json('Any contract Found')
      }
      return res.status(200).json(contract)
    } catch (error) {
      return res.status(400).json('Error to find contract')
    }
  },

  async updateContract (req: Request<{ contractId: string }, {}, {
    code: string, linkUrl: string, contractName: string
  }>, res: Response) {
    const { contractId } = req.params
    const { code, contractName, linkUrl } = req.body
    try {
      const findContract = await prisma.contract.findFirst({
        where: { contractUuid: contractId }
      })

      if (!findContract) {
        return res.status(404).json('Contract Not Found!')
      }
      const contractEdit = await prisma.contract.update({
        where: { contractUuid: contractId },
        data: {
          code: code,
          contractName: contractName,
          linkUrl: linkUrl
        }
      })

      return res.status(200).json(contractEdit)
    } catch (error) {
      return res.status(400).json('Error to update contract')
    }
  },

  async deleteContract (req: Request<{ contractId: string }, {}, {}>, res: Response) {
    const { contractId } = req.params
    try {
      const contract = await prisma.contract.findFirst({
        where: { contractUuid: contractId }
      })

      if (!contract) {
        return res.status(404).json('Any contract Found')
      }
      await prisma.contract.delete({
        where: { contractUuid: contractId }
      })
      return res.status(201).json({
        message: `contract: ${contract.contractName} deleted`
      })
    } catch (error) {
      return res.status(400).json('Error to find contracts')
    }
  },

  async store (req: Request<{ contractId: string }, {}, {
    code: string, linkUrl: string, contractName: string
  }>, res: Response) {
    const { contractId } = req.params
    const { code, contractName, linkUrl } = req.body
    try {
      const findContract = await prisma.contract.findFirst({
        where: { contractUuid: contractId }
      })

      if (findContract != null) {
        return res.status(404).json('Contract alredy Exist')
      }
      const contractEdit = await prisma.contract.create({
        data: {
          code: code,
          contractName: contractName,
          linkUrl: linkUrl
        }
      })
      return res.status(200).json(contractEdit)
    } catch (error) {
      return res.status(400).json('Error to update contract')
    }
  }
}
