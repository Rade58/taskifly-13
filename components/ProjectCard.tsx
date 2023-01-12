import type { FC, ReactNode } from "react";
import clsx from "clsx";
import { Prisma } from "@prisma/client";
import Card from "./Card";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    tasks: true,
  },
});

export type ProjectWithTasks = Prisma.ProjectGetPayload<
  typeof projectWithTasks
>;

interface Props {
  children?: ReactNode;
  project: ProjectWithTasks;
}

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProjectCard: FC<Props> = ({ project }) => {
  const completedTasksCount = project.tasks.filter(({ status: st }) => {
    return st === "COMPLETED";
  }).length;

  // ceil ROUNDS TO GREATER INTEGER (OR EQUAL IF ARG IS ALREADY AN INTEGER)

  const progress = Math.ceil(
    (completedTasksCount / project.tasks.length) * 100
  );

  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        {completedTasksCount}/{project.tasks.length} completed
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full"
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
