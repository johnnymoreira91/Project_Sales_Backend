import faker from 'faker'
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
        code: 'SP0001'

      }
    ]
  })

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
