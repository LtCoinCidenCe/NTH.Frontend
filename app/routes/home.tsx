import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import { redirect } from "react-router";

// export function meta({ }: Route.MetaArgs) {
//   return [
//     { title: "Home page" },
//     { name: "description", content: "This is the home page." },
//   ];
// }

export async function clientLoader() {
  let NTHUsername = localStorage.getItem("NTHUsername");
  let NTHPassword = localStorage.getItem("NTHPassword");
  if (NTHUsername === null || NTHPassword === null) {
    return redirect("login");
  }
  console.debug("home clientLoader");
  return { message: "Hello, world!" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <title>Home page</title>
      <meta name="description" content="This is the home page." />
      <Welcome />
    </div>);
}
