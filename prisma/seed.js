const { PrismaClient } = require('@prisma/client')
// import faker from 'faker'

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
