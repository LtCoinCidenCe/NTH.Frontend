import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/GlobalLayout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("annoying", "routes/annoying.tsx")
  ])
] satisfies RouteConfig;

// export default [
//   layout("routes/home.tsx", [
//     route("annoying", "routes/annoying.tsx")
//   ])
// ] satisfies RouteConfig;
