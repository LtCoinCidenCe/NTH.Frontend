import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/workspaceLayout";
import { isJWTPayload } from "~/types";
import WorkspaceHeader from "~/components/WorkspaceHeader";
import JWTProvider from "~/components/JWTProvider";

export async function clientLoader({ }: Route.ClientLoaderArgs) {
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
  console.debug("workspaceLayout ClientLoader");
  return { appjwt, NTHUsername };
};

export default function workspaceLayout({ loaderData }: Route.ComponentProps) {
  return <JWTProvider appjwt={loaderData.appjwt}>
    <WorkspaceHeader NTHUsername={loaderData.NTHUsername} />
    <Outlet />
  </JWTProvider>
}
