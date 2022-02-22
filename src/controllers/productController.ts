import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import store from 'store'
import { UserStore } from '@models/interfaces/UserStore'

const prisma = new PrismaClient()

export default {
  async getAll (req: Request<{}, {}, {}>, res: Response) {
    try {
      const product = await prisma.product.findMany()
      if (!product) {
        return res.status(404).json('Products Not Found!')
      }
      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json('Error to find permissions')
    }
  },

  async getById (req: Request<{ productId: string }, {}, {}>, res: Response) {
    const { productId } = req.params
    try {
      const product = await prisma.product.findFirst({
        where: { productUuid: productId }
      })

      if (!product) {
        return res.status(404).json('Any product Found')
      }
      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json('Error to find product')
    }
  },

  async getByContract (req: Request<{ contractCode: string }, {}, {}>, res: Response) {
    const { contractCode } = req.params
    try {
      const product = await prisma.product.findMany({
        where: { contractCode: contractCode }
      })

      if (!product) {
        return res.status(404).json('Any product Found')
      }
      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json('Error to find product')
    }
  },

  async store (req: Request<{}, {}, {
    productCode: string, productPrice: number,
    productDescription: string, productName: string, onSale: boolean,
    productStock: number, contractCode: string, urlPhoto: string
  }>, res: Response) {
    const {
      productCode, productPrice, productDescription, productName, onSale,
      productStock, contractCode, urlPhoto
    } = req.body
    try {
      const storeUser: UserStore = await store.get('user')
      const findProduct = await prisma.product.findFirst({
        where: { productCode: productCode }
      })
      if (findProduct != null) {
        return res.status(404).json('Product already exist!')
      }
      if (storeUser.permissionLevel >= 2 || storeUser.superUser === true) {
        const product = await prisma.product.create({
          data: {
            productName: productName,
            productCode: productCode,
            productPrice: productPrice,
            productDescription: productDescription,
            onSale: onSale || false,
            urlPhoto: urlPhoto || '',
            productStock: productStock || 0,
            Contract: {
              connect: { code: contractCode }
            }
          }
        })
        return res.status(200).json(product)
      } else {
        return res.status(403).json('You dont have permission to create product')
      }
    } catch (error) {
      return res.status(400).json({
        message: 'Error to add product',
        error: error
      })
    }
  },

  async updateProduct (req: Request<{ productId: string }, {}, {
    productCode: string, productPrice: number,
    productDescription: string, productName: string, onSale: boolean,
    productStock: number, contractCode: string, urlPhoto: string
  }>, res: Response) {
    const {
      productCode, productPrice, productDescription, productName, onSale,
      productStock, contractCode, urlPhoto
    } = req.body
    const { productId } = req.params
    try {
      const storeUser: UserStore = await store.get('user')
      const findProduct = await prisma.product.findFirst({
        where: { productUuid: productId }
      })
      console.log(findProduct)
      if (!findProduct) {
        return res.status(404).json('Product already exist!')
      }
      if (storeUser.permissionLevel >= 2 || storeUser.superUser === true) {
        const product = await prisma.product.update({
          where: { productUuid: productId },
          data: {
            productName: productName,
            productCode: productCode,
            productPrice: productPrice,
            productDescription: productDescription,
            onSale: onSale || false,
            urlPhoto: urlPhoto,
            productStock: productStock,
            contractCode: contractCode
          }
        })
        return res.status(200).json(product)
      } else {
        return res.status(403).json('You dont have permission to create product')
      }
    } catch (error) {
      return res.status(400).json('Error to update product')
    }
  },

  async deleteProduct (req: Request<{ productId: string }, {}, {}>, res: Response) {
    const { productId } = req.params
    try {
      const storeUser: UserStore = await store.get('user')
      const product = await prisma.product.findFirst({
        where: { productUuid: productId }
      })

      if (!product) {
        return res.status(404).json('Any Product Found')
      }
      if (storeUser.permissionLevel >= 2 || storeUser.superUser === true) {
        await prisma.product.delete({
          where: { productUuid: productId }
        })
        return res.status(200).json({
          message: `Product with code: ${product.productCode} deleted on ${new Date()}`
        })
      } else {
        return res.status(403).json('You dont have permission to delete this contract')
      }
    } catch (error) {
      return res.status(400).json('Error to find product')
    }
  }
}
