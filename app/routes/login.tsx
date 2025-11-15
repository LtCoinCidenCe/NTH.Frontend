import type { Route } from "./+types/login";
import LoginForm from "~/components/loginForm/loginForm";

export async function clientLoader({ }: Route.ClientLoaderArgs) {
  return { message: "Login clientLoader" };
}

export default function Login({ }: Route.ComponentProps) {
  return (
    <>
      <title>登录</title>
      <meta name="description" content="登录到翻译组管理" />
      <LoginForm />
    </>);
}
