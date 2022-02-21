// import faker from 'faker'
const { faker } = require('@faker-js/faker')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main () {
  console.log('Start seeding ...')

  await prisma.permission.createMany({
    data: [
      {
        permissionName: 'USER',
        permissionLevel: 0
      },
      {
        permissionName: 'FUNC1',
        permissionLevel: 1
      },
      {
        permissionName: 'FUNC2',
        permissionLevel: 2
      },
      {
        permissionName: 'MANAGER',
        permissionLevel: 3
      },
      {
        permissionName: 'OWNER',
        permissionLevel: 4
      },
      {
        permissionName: 'PO',
        permissionLevel: 5
      },
      {
        permissionName: 'DEV',
        permissionLevel: 6
      },
      {
        permissionName: 'ADMIN',
        permissionLevel: 7
      }
    ]
  })

  await prisma.contract.createMany({
    data: [
      {
        contractName: 'Variedades do Joao',
        code: 'SP0001',
        linkUrl: 'www.joaovariedades.com.br'
      },
      {
        contractName: 'Variedades da Maria',
        code: 'SP0002',
        linkUrl: 'www.mariavariedades.com.br'
      }
    ]
  })

  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        productCode: `${faker.random.alphaNumeric(123)}`,
        productName: `${faker.commerce.productName()}`,
        productPrice: 20,
        contractCode: 'SP0001',
        urlPhoto: 'www.donotehavephoto.com',
        productStock: 50,
        onSale: true,
        productDescription: `${faker.commerce.productDescription()}`
      }
    })
  }

  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        productCode: `${faker.random.alphaNumeric(123)}`,
        productName: `${faker.commerce.productName()}`,
        productPrice: 20,
        contractCode: 'SP0002',
        urlPhoto: 'www.donotehavephoto.com',
        productStock: 50,
        onSale: true,
        productDescription: `${faker.commerce.productDescription()}`
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
