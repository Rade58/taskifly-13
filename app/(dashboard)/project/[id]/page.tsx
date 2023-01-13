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

interface PagePropsI {
  params: any;
  searchParams: any;
}

export default async function ProjectPage(pageProps: PagePropsI) {
  console.log({ pageProps });

  const project = await getData(pageProps.params.id as string);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1 ml-auto mr-16">
      {project && (
        // @ts-ignore
        <TasksCard tasks={project.tasks} title={project.name} getAll={true} />
      )}
    </div>
  );
}
