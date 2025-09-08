import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/blog", "routes/blog.tsx"),
  route("/blog/:id", "routes/article.tsx"),
  route("/newsletter", "routes/newsletter.tsx"),
] satisfies RouteConfig;
