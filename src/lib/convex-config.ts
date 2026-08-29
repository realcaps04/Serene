/** Convex deployment URL — available at build time via VITE_CONVEX_URL. */
export function getConvexUrl() {
  return import.meta.env.VITE_CONVEX_URL?.trim() ?? "";
}

export const isConvexEnabled = Boolean(getConvexUrl());
