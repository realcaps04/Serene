import type { GoogleProfile } from "./types";
import { loadGoogleAuth, saveGoogleAuth, clearGoogleAuth } from "./google-auth";

export const ONBOARDING_KEY = "serene-onboarding-complete";
export const NAME_KEY = "serene-user-name";

export function isOnboardingComplete() {
  return localStorage.getItem(ONBOARDING_KEY) === "1";
}

export function markOnboardingComplete() {
  localStorage.setItem(ONBOARDING_KEY, "1");
}

export function clearOnboardingComplete() {
  localStorage.removeItem(ONBOARDING_KEY);
}

export function loadStoredName(fallback = "Partner") {
  const saved = localStorage.getItem(NAME_KEY)?.trim();
  if (saved) return saved;
  return loadGoogleAuth()?.name ?? fallback;
}

export function saveStoredName(name: string) {
  const trimmed = name.trim();
  if (trimmed) localStorage.setItem(NAME_KEY, trimmed);
}

export function clearStoredName() {
  localStorage.removeItem(NAME_KEY);
}

/** User finished onboarding — treat as signed in across refreshes. */
export function hasActiveSession() {
  return isOnboardingComplete();
}

export function persistGoogleSession(profile: GoogleProfile) {
  saveGoogleAuth(profile);
  saveStoredName(profile.name);
}

export function clearSession() {
  clearGoogleAuth();
  clearOnboardingComplete();
  clearStoredName();
}

export { loadGoogleAuth, saveGoogleAuth, clearGoogleAuth };
