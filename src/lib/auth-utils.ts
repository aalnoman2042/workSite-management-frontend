export type UserRole = "ADMIN" | "CHIEF_ENGINEER" | "SITE_ENGINEER" | "WORKER";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

// Public routes (no auth needed)
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// Common protected routes
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

// Admin routes
export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

// Chief Engineer routes
export const chiefEngineerProtectedRoutes: RouteConfig = {
  patterns: [/^\/chief-engineer/],
  exact: [],
};

// Site Engineer routes
export const siteEngineerProtectedRoutes: RouteConfig = {
  patterns: [/^\/site-engineer/],
  exact: [],
};

// Worker routes
export const workerProtectedRoutes: RouteConfig = {
  patterns: [/^\/worker/],
  exact: [],
};

// Check if auth route
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

// Match exact or pattern route
export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

// Determine route owner based on pathname
export const getRouteOwner = (
  pathname: string
): UserRole | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, chiefEngineerProtectedRoutes)) return "CHIEF_ENGINEER";
  if (isRouteMatches(pathname, siteEngineerProtectedRoutes)) return "SITE_ENGINEER";
  if (isRouteMatches(pathname, workerProtectedRoutes)) return "WORKER";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";

  return null;
};

// Default dashboard redirect per role
export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "CHIEF_ENGINEER") return "/chief-engineer/dashboard";
  if (role === "SITE_ENGINEER") return "/site-engineer/dashboard";
  if (role === "WORKER") return "/dashboard";

  return "/";
};

// Validate redirect based on user role
export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") return true;
  if (routeOwner === role) return true;

  return false;
};
