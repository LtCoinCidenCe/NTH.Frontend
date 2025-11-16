import { Outlet } from "react-router";
import type { Route } from "./+types/authorRoute";

export async function clientLoader() {
}

export default function authorRoute({ loaderData }: Route.ComponentProps) {
  return <Outlet/>
}
