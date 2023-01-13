import { db } from "@/lib/db";
import { validateJWT } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

/* type Data = {
  name: string
} */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse /* <Data> */
) {
  const user = await validateJWT(
    req.cookies[process.env.COOKIE_NAME as string] as string
  );

  if (!user.email || !user.id) {
    res.status(401);
    res.end();
    return;
  }

  await db.project.create({
    data: {
      ownerId: user.id,
      name: req.body.name,
    },
  });

  res.status(200).json({ message: "ok" });
}
