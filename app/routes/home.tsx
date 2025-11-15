import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import { redirect } from "react-router";
import { isJWTPayload } from "~/types";

// replaced by <title> & <meta>
// export function meta({ }: Route.MetaArgs) {
//   return [
//     { title: "Home page" },
//     { name: "description", content: "This is the home page." },
//   ];
// }

export async function clientLoader() {
  let NTHUsername = localStorage.getItem("NTHUsername");
  let NTHPassword = localStorage.getItem("NTHPassword");
  let appjwt = localStorage.getItem("appjwt");
  if (NTHUsername === null || NTHPassword === null || appjwt === null) {
    return redirect("login");
  }
  try {
    const payloadText = atob(appjwt.split(".")[1]);
    const payload = JSON.parse(payloadText);
    if (!isJWTPayload(payload)) {
      return redirect("login")
    }
    const { exp, iss, aud } = payload;
    // jwt exp is second, but JavaScript Date is millisecond
    let expireTime = new Date(exp * 1000);
    console.debug(payload);
    console.debug("expire time:", expireTime);
  } catch (error) {
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
