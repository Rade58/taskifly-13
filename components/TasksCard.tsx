import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { TASK_STATUS } from "@prisma/client";
import type { Task } from "@prisma/client";
import { db } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";
import Button from "./Button";
import Card from "./Card";

interface PropsI {
  children?: ReactNode;
  tasks?: Task[];
  title?: string;
  getAll: boolean;
}

async function getData(options: { getAll: boolean }) {
  const user = await getUserFromCookie(cookies());

  if (!options.getAll) {
    const tasks = await db.task.findMany({
      where: {
        ownerId: user?.id,
        NOT: {
          status: TASK_STATUS.COMPLETED,
          deleted: false,
        },
      },
      take: 5,
      orderBy: {
        due: "asc",
      },
    });

    return tasks;
  } else {
    const tasks = await db.task.findMany({
      where: {
        ownerId: user?.id,
        NOT: {
          status: TASK_STATUS.COMPLETED,
          deleted: false,
        },
      },
      // take: 5,
      orderBy: {
        due: "asc",
      },
    });

    return tasks;
  }
}

const TaskCard = async ({ title, tasks, getAll }: PropsI) => {
  const data = tasks || (await getData({ getAll }));

  //
  return (
    <Card>
      <div className="flex justify-between items-center">
        {title && (
          <div>
            <span className="text-3xl text-gray-600">{title}</span>
          </div>
        )}
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => {
              return (
                <div className="py-2 " key={task.id}>
                  <div>
                    <span className="text-gray-800">{task.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">
                      {task.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
