import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectWithTasks } from "@/components/ProjectCard";
import { getUserFromCookie } from "@/lib/auth";
import delay from "@/lib/delay";
import { db } from "@/lib/db";

const getData = async () => {
  await delay(9000);
  const user = await getUserFromCookie(cookies());
  if (!user) {
    // return [] as ProjectWithTasks[];
    return [];
  }
  const projects = await db.project.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      tasks: true,
    },
  });

  return projects;
};

export default async function HomeDashboardPage() {
  const projects = await getData();
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          {/** greetings here */}
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* ERROR SAYS THAT SERVER VCOMPONENT
            BECAUSE IT RETURNS PROMISE CAN'T BE USED IN SUSPENSE
            BUT EVERYTHING WORKS OK */}
            {/* @ts-ignore */}
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {/** projects map here */}
          {projects.map((project) => {
            return (
              <div className="w-1/3 p-3" key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
            );
          })}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* tasks here */}</div>
        </div>
      </div>
    </div>
  );
}
