import { Outlet } from "react-router";
import type { Route } from "./+types/userRoute";
import UserGrid from "~/components/user/UserGrid";

export async function clientLoader() {
}

export default function userRoute({ loaderData }: Route.ComponentProps) {
  return <><UserGrid /><Outlet /></>;
}
