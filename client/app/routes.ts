import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/today-tasks", "routes/todayTask.tsx"),
  route("/incomplete-tasks", "routes/incompletedTask.tsx"),
  route("/important-tasks", "routes/importantTask.tsx"),
  route("/completed-tasks", "routes/completedTask.tsx"),
  layout("./_auth/layout.tsx", [
    route("/login", "./_auth/login.tsx"),
  ]),
] satisfies RouteConfig;
