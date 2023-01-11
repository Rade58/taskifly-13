import type { NextApiHandler } from "next";
import { db } from "@/lib/db";
import { createJWT, comparePassword } from "@/lib/auth";
import { serialize } from "cookie";

const handler: NextApiHandler = async (req, res) => {};

export default handler;
