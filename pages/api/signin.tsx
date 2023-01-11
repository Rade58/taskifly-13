import type { NextApiHandler } from "next";
import { db } from "@/lib/db";
import { createJWT, comparePassword } from "@/lib/auth";
import { serialize } from "cookie";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: "Invalid login" });
      return;
    }

    const isUser = await comparePassword(req.body.password, user.password);

    if (isUser) {
      const jwt = await createJWT({
        email: user.email,
        id: user.id,
      });

      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        })
      );
      res.status(200);
      res.end();
      return;
    } else {
      res.status(401);
      res.json({ error: "Invalid login" });
    }
  } else {
    res.status(401);
    res.end();
    return;
  }
};

export default handler;
