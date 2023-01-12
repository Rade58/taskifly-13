import type { FC, ReactNode } from "react";
import clsx from "clsx";
import { Prisma } from "@prisma/client";
import Card from "./Card";

const projectWithTasks = Prisma.validator;

interface Props {
  children?: ReactNode;
}

const ProjectCard: FC<Props> = () => {
  return null;
};

export default ProjectCard;
