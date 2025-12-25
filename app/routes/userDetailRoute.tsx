import type { Route } from "./+types/userDetailRoute";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const userID = Number.parseInt(params.id);
  if (Number.isNaN(userID))
    return new Response("that's not a userID", { status: 400 });
  return userID;
}

export default function userDetailRoute({ params, loaderData }: Route.ComponentProps) {
  return <div>{params.id}</div>
}
