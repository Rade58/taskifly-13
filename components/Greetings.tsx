import type { FC, ReactNode } from "react";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/auth";
import delay from "@/lib/delay";
import Card from "./Card";
import Button from "./Button";

const getData = async () => {
  await delay(6000);
  const user = await getUserFromCookie(cookies());
  return user;
};

export default async function Greetings() {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user && user.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today{"'"}s Schedule</Button>
      </div>
    </Card>
  );
}
