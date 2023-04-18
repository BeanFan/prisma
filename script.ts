import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // create user
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Alice",
  //       email: "alice@prisma.io",
  //     },
  //   });

  //create user with relation

  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Jerry",
  //       email: "jerry@prisma.io",
  //       posts: {
  //         create: {
  //           title: "Hello World",
  //         },
  //       },
  //     },
  //   });

  //   query user
  const userlist = await prisma.user.findMany({
    include: {
      posts: true,
    },
    where: { id: { in: [1, 2] } },
    orderBy: { id: "desc" },
  });

  console.dir(userlist, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
