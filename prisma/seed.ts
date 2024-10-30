import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const customersData = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: await bcrypt.hash('password123', 10),
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: await bcrypt.hash('password456', 10),
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      password: await bcrypt.hash('password789', 10),
    },
  ];

  for (const customer of customersData) {
    await prisma.customers.create({
      data: customer,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
