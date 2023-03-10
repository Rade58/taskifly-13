const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: "POST" | "GET";
  body: any;
  json?: boolean;
}) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = async (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return fetcher({
    body: user,
    json: false,
    method: "POST",
    url: "/api/register",
  });
};

export const signin = async (user: { email: string; password: string }) => {
  return fetcher({
    body: user,
    json: false,
    method: "POST",
    url: "/api/signin",
  });
};

export const createNewProject = (name: string) => {
  return fetcher({
    body: { name },
    method: "POST",
    url: "/api/project",
  });
};
