import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "@/lib/db";
import { cookies as cooks } from "next/headers";

interface PayloadI {
  id: User["id"];
  email: User["email"];
}

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = async (user: PayloadI) => {
  // ISSUED AT
  // Date.now IS MILISECONDS SO I TURN THEM TO SECONDS AND I
  // DON'T WANT TO HAVE DECIMALS
  const secondsBetween1970AndNow = Math.floor(Date.now() / 1000);

  // 7 DAYS FROM NOW
  // I ADDED 7 DAYS IN SECONDS
  const expirationTime = secondsBetween1970AndNow + 7 * 24 * 60 * 60;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationTime)
    .setIssuedAt(secondsBetween1970AndNow)
    .setNotBefore(secondsBetween1970AndNow)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as PayloadI;
};

export const getUserFromCookie = async (cookies: ReturnType<typeof cooks>) => {
  const jwt = cookies.get(process.env.COOKIE_NAME as string);

  if (!jwt) {
    return null;
  }

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
