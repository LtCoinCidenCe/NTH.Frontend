import type { Route } from "./+types/authorRoute";
import AuthorGrid from "~/components/author/AuthorGrid";

export async function clientLoader() {
}

export default function authorRoute({ loaderData }: Route.ComponentProps) {
  return <AuthorGrid />;
}
