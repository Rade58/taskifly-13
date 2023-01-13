import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import TasksCard from "@/components/TasksCard";

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }: { params: any }) {
  const project = await getData(params.id as string);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      {/* @ts-ignore */}
      {project && <TasksCard tasks={project.tasks} title={project.name} />}
    </div>
  );
}
