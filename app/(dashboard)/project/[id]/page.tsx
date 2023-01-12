import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/auth";
import delay from "@/lib/delay";
import { db } from "@/lib/db";

const getData = async () => {
  await delay(9000);
  const user = await getUserFromCookie(cookies());
  if (!user) {
    return { projects: null };
  }
  const projects = await db.project.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

export default function ProjectPage() {
  return <div>Single Proect Page</div>;
}
