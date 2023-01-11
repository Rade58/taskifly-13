import type { NextApiHandler } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

const handler: NextApiHandler = async (req, res) => {
  console.log("Hitting register");

  try {
    if (req.method === "POST") {
      const user = await db.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      });

      const jwt = await createJWT({
        email: user.email,
        id: user.id,
      });

      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          // EXPIRES AFTER 7 DAYS
          maxAge: 7 * 24 * 60 * 60,
        })
      );

      res.status(201);
      res.end();
    } else {
      res.status(401);
      res.end();
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(
        JSON.stringify({ message: err.message, name: err.name }, null, 2)
      );
    }

    res.status(401);
    res.end();
  }
};

export default handler;
