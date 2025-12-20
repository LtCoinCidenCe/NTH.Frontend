import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/workspaceLayout";
import { isJWTPayload } from "~/types";
import WorkspaceHeader from "~/components/WorkspaceHeader";
import JWTProvider from "~/components/provider/JWTProvider";
import UserContextProvider from "~/components/provider/UserContextProvider";
import AuthorContextProvider from "~/components/provider/AuthorContextProvider";

export async function clientLoader({ }: Route.ClientLoaderArgs) {
  let NTHUsername = localStorage.getItem("NTHUsername");
  let NTHPassword = localStorage.getItem("NTHPassword");
  let loaderJWT = localStorage.getItem("appjwt");
  if (NTHUsername === null || NTHPassword === null || loaderJWT === null) {
    return redirect("login");
  }
  try {
    const payloadText = atob(loaderJWT.split(".")[1]);
    const payload = JSON.parse(payloadText);
    if (!isJWTPayload(payload)) {
      return redirect("login")
    }
    const { exp, iss, aud } = payload;
    // jwt exp is second, but JavaScript Date is millisecond
    let expireTime = new Date(exp * 1000);
    let contemporary = new Date();
    let remaining = expireTime.valueOf() - contemporary.valueOf();
    console.debug(`${payload}, expire time: ${expireTime}`, contemporary, remaining);
    let userID = Number.parseInt(aud.substring(2));
    return { loaderJWT, NTHUsername, userID };
  }
  catch (error) {
    return redirect("login");
  }
};

export default function workspaceLayout({ loaderData }: Route.ComponentProps) {
  return (
    <JWTProvider loaderJWTjwt={loaderData.loaderJWT}>
      <UserContextProvider>
        <AuthorContextProvider>
          <WorkspaceHeader NTHUsername={loaderData.NTHUsername} userID={loaderData.userID} />
          <Outlet />
        </AuthorContextProvider>
      </UserContextProvider>
    </JWTProvider>);
}
