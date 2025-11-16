import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/globalLayout.tsx", [
    route("login", "routes/loginRoute.tsx"),
    layout("routes/workspaceLayout.tsx", [
      index("routes/homeRoute.tsx"),
      route("user", "routes/userRoute.tsx", [
        route(":id", "routes/userDetailRoute.tsx")
      ]),
      route("author", "routes/authorRoute.tsx", [
        route(":id", "routes/authorDetailRoute.tsx")
      ])
    ]),
    route("adder", "components/Adder.tsx"),
    route("annoying", "routes/annoyingRoute.tsx")
  ])
] satisfies RouteConfig;
