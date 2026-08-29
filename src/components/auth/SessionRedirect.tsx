import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { hasActiveSession } from "../../lib/session";

const GUEST_PATHS = new Set(["/welcome", "/sign-in"]);

/** Send signed-in users away from welcome / sign-in. */
export function SessionRedirect() {
  const location = useLocation();

  if (hasActiveSession() && GUEST_PATHS.has(location.pathname)) {
    return <Navigate to="/app/home" replace />;
  }

  return null;
}

export function RequireSession({ children }: { children: ReactNode }) {
  if (!hasActiveSession()) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
}
