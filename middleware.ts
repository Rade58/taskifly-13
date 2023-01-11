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
    // this is esentially a buffer (we transform secret to buffer)
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

  // if user  requests static files (favicons, images, fro mstatic folder)
  // we won't do anything speicial
  // also if user goes to /register or /signin
  // we must let him access those or hw won't be able
  // to sign up/in

  // THERE IS ALSO A MTCHER WAY (CHECK THE DOCS)
  // WITH MATCHER WE CAN RESTRICT MIDDLEWARE FOR EVEN RUNNING
  // FOR CERTAIN PATH

  // IN THIS CASE MIDDLEWARE RUNS ON EVERY REQUEST AND WE ARE
  // DECIDING WHAT TO DO ON EVERY REQUEST

  // WE DECIDE IF WE ARE GOING TO CALL next OR TO DO A REDIRECT

  // THIS MIDDLEWARES ARE INEXPENSSIVE FUNCTION (SO THIS IS ALSO A VALID WAY)
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

  console.log("PASS 1");

  const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

  // IF THERE IS NO COOKIE WITH JWT, WE REDIRECT

  console.log("PASS 2");

  if (!jwt) {
    console.log("PASS 3");

    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    console.log("PASS 4---------------------- ");

    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (err) {
    if (err instanceof Error) {
      console.log("PASS 5");
      console.log(err.message);
    }

    console.error(err);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
};

export default middleware;
