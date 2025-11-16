import type { Route } from "./+types/userDetailRoute";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  console.log("userDetailRoute:", params.id)
}

export default function userDetailRoute({ params }: Route.ComponentProps) {
  return <div>{params.id}</div>
}
