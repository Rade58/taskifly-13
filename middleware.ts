import { NextMiddleware, NextResponse } from "next/server";
// APARENTLY, SMALL SUBSET OF npm PACKAGES IS ALLOWED
// INCLUDING THIS ONE
import { jwtVerify } from "jose";
//

const PUBLIC_FILE = /\.(.*)$/;

// YOU NEED TO BUILD THIS ONE (WE HAVE ANOTHER THAT USES bcrypt
// AND bcrypt IS NOT ALLOWED ON EDGE)
//
const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  // const pld = payload.payload as { email: User["email"]; id: User["id"] };
  return payload;
};
//
//

const middleware: NextMiddleware = async function (req, res) {
  //
  const { pathname } = req.nextUrl;

  // IF PAGE IS NOT PROTECTED PAGE
  // WE WON'T BE DOING ANYTHING
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

  // IF THERE IS NO COOKIE WITH JWT, WE REDIRECT
  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (err) {
    console.error(err);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
};

export default middleware;
