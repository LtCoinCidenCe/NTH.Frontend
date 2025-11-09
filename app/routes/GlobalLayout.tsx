import { createContext, Outlet } from "react-router"

export const globalContext = createContext<string | null>("hei");

export default function GlobalLayout() {
  return (<Outlet />);
}
