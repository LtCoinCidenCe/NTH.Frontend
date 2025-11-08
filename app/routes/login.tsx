import type { Route } from "./+types/login";
import LoginForm from "~/components/loginForm/loginForm";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "登录" },
    { name: "description", content: "登录到翻译组管理" },
  ];
}

export async function clientLoader() {
  return { message: "Login clientLoader" };
}

export default function Login({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return <LoginForm />;
}
