import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/GlobalLayout.tsx", [
    index("routes/home.tsx"),
    route("adder", "components/Adder.tsx"),
    route("login", "routes/login.tsx"),
    route("annoying", "routes/annoying.tsx")
  ])
] satisfies RouteConfig;
