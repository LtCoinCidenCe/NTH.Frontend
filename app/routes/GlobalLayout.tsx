import { Outlet } from "react-router"
import ErrorToastProvider from "~/components/ErrorToastProvider";

export async function clientLoader() {
  console.debug("GlobalLayout ClientLoader");
};

export default function GlobalLayout() {
  return (
    <ErrorToastProvider>
      <Outlet />
    </ErrorToastProvider>
  );
};
