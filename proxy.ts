import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the `middleware` convention to `proxy` (nodejs runtime).
const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // Match all pathnames except API routes, Next internals and static files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
