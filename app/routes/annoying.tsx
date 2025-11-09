import LoginForm from "~/components/loginForm/loginForm";
import type { Route } from "./+types/annoying";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Annoying page" },
    { name: "description", content: "This is the annoying page." },
  ];
}

export async function clientLoader() {
  console.debug("annoying clientLoader");
  return { message: "Hello, annoying!" };
}

export default function Annoying({ loaderData }: Route.ComponentProps) {
  return <LoginForm />;
}
