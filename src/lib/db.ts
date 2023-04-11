import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(/* {
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  } */);

// prisma.$connect(); // this line disables the lazy loading

// prisma.$on('query', async (e) => {
//   console.log(`${e.query} ${e.params}`);
// });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
