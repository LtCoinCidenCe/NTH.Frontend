import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/workspaceLayout";
import WorkspaceHeader from "~/components/WorkspaceHeader";
import JWTProvider from "~/components/provider/JWTProvider";
import UserContextProvider from "~/components/provider/UserContextProvider";
import AuthorContextProvider from "~/components/provider/AuthorContextProvider";
import { JwtClaimsSchema } from "~/types";

export async function clientLoader({ }: Route.ClientLoaderArgs) {
  let NTHUsername = localStorage.getItem("NTHUsername");
  let NTHPassword = localStorage.getItem("NTHPassword");
  let loaderJWT = localStorage.getItem("appjwt");
  if (NTHUsername === null || NTHPassword === null || loaderJWT === null) {
    return redirect("login");
  }
  try {
    const parts = loaderJWT.split(".");
    if (parts.length !== 3)
      return redirect("login")

    const payloadbase64 = parts[1];
    const jsonStr = atob(payloadbase64) // ignore the legacy thing
    const payload = JSON.parse(jsonStr); // leave it to catch error
    const { exp, iss, aud } = JwtClaimsSchema.parse(payload); // leave it to catch error

    // jwt exp is second, but JavaScript Date is millisecond
    let expireTime = new Date(exp * 1000);
    let remaining = expireTime.valueOf() - new Date().valueOf();
    // this is done on behalf of JWTProvider
    let initialRefreshTimer = Math.max(remaining - 1 * 60 * 1000, 0);
    console.debug(`${payload}, expire time: ${expireTime}`, remaining, initialRefreshTimer);
    return { loaderJWT, NTHUsername, userID: Number.parseInt(aud.substring(2)), initialRefreshTimer };
  }
  catch (error) {
    return redirect("login");
  }
};

export default function workspaceLayout({ loaderData }: Route.ComponentProps) {
  return (
    <JWTProvider loaderJWT={loaderData.loaderJWT} initialRefreshTimer={loaderData.initialRefreshTimer}>
      <UserContextProvider>
        <AuthorContextProvider>
          <WorkspaceHeader NTHUsername={loaderData.NTHUsername} userID={loaderData.userID} />
          <Outlet />
        </AuthorContextProvider>
      </UserContextProvider>
    </JWTProvider>);
}
