import { redirect } from "react-router";
import type { Route } from "./+types/login";
import LoginForm from "~/components/loginForm/loginForm";

export async function clientLoader() {
  return { message: "Login clientLoader" };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formdata = await request.formData();
  const NTHUsername = formdata.get("username")?.toString();
  const NTHPassword = formdata.get("password")?.toString();
  if (!NTHUsername || !NTHPassword) {
    return;
  }
  // const UserLoginDTO = Object.fromEntries(formdata.entries());
  // console.log("entries", UserLoginDTO);
  const UserLoginDTO = { "username": NTHUsername, "password": NTHPassword };
  const fetched = await fetch("http://localhost:5139/api/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UserLoginDTO)
  });
  const token = await fetched.text();
  if (fetched.status !== 200) {
    console.error(token)
    return;
  }
  localStorage.setItem("NTHUsername", NTHUsername);
  localStorage.setItem("NTHPassword", NTHPassword);
  localStorage.setItem("appjwt", token);
  return redirect("/");
}

export default function Login({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>登录</title>
      <meta name="description" content="登录到翻译组管理" />
      <LoginForm />
    </>);
}
