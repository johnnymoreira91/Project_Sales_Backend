import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

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
      const findProduct = await prisma.product.findFirst({
        where: { productCode: productCode }
      })
      if (findProduct != null) {
        return res.status(404).json('Product already exist!')
      }
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
      console.log(product, 'prod')
      return res.status(200).json(product)
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
      const findProduct = await prisma.product.findFirst({
        where: { productUuid: productId }
      })
      if (findProduct != null) {
        return res.status(404).json('Product already exist!')
      }
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
    } catch (error) {
      return res.status(400).json('Error to add product')
    }
  },

  async deleteProduct (req: Request<{ productId: string }, {}, {}>, res: Response) {
    const { productId } = req.params
    try {
      const product = await prisma.product.findFirst({
        where: { productUuid: productId }
      })

      if (!product) {
        return res.status(404).json('Any Product Found')
      }
      await prisma.product.delete({
        where: { productUuid: productId }
      })
      return res.status(200).json({
        message: `Product with code: ${product.productCode} deleted on ${new Date()}`
      })
    } catch (error) {
      return res.status(400).json('Error to find product')
    }
  }
}
