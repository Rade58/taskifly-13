import Link from "next/link";
// import { cookies } from "next/headers";
import { Suspense } from "react";
// import { getUserFromCookie } from "@/lib/auth";
// import { db } from "@/lib/db";
// import delay from "@/lib/delay";

import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";

export default function HomeDashboardPage() {
  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          {/** greetings here */}
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* ERROR SAYS THAT SERVER VCOMPONENT
            BECAUSE IT RETURNS PROMISE CAN'T BE USED IN SUSPENSE
            BUT EVERYTHING WORKS OK */}
            {/* @ts-ignore */}
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {/** projects map here */}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* tasks here */}</div>
        </div>
      </div>
    </div>
  );
}
