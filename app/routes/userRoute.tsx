import { Outlet } from "react-router";
import type { Route } from "./+types/userRoute";

export async function clientLoader() {
}

export default function userRoute({ loaderData }: Route.ComponentProps) {
  return <Outlet/>
}
