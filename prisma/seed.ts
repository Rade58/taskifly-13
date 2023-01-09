import { hashPassword } from "@/lib/auth";
// import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";

import { TASK_STATUS } from "@prisma/client";
const db = new PrismaClient();

const getRandomTaskStatus = () => {
  const statuses = Object.values(TASK_STATUS);
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: {
      email: "bonk@foo.com",
    },
    update: {},
    create: {
      email: "bonk@foo.com",
      firstName: "Bonk",
      lastName: "Shibarium",
      password: await hashPassword("satoshiNakamoto"),
      projects: {
        create: new Array(6).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2023, 1, 9),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((project) => {
      return db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Hello world foo bar everything from Task ${i}`,
            status: getRandomTaskStatus(),
          };
        }),
      });
    })
  );

  console.log({ user, tasks });
}

//
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
