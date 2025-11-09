import { createContext, Outlet } from "react-router"

export const globalContext = createContext<string | null>("hei");

export async function clientLoader() {
  console.log("GlobalLayout ClientLoader");
};

export default function GlobalLayout() {
  return (<Outlet />);
};
