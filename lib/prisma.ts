import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // Make sure this is installed

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, // your DB URL
});

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter, // pass the adapter here
  });
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
