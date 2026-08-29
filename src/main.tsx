import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";
import { getGoogleClientId } from "./lib/google-auth";
import { getConvexUrl, isConvexEnabled } from "./lib/convex-config";
import "./index.css";

const googleClientId = getGoogleClientId();
const convexUrl = getConvexUrl();
const convex = isConvexEnabled ? new ConvexReactClient(convexUrl) : null;

if (!isConvexEnabled && import.meta.env.DEV) {
  console.warn(
    "VITE_CONVEX_URL is not set — running in local-only mode. Add it to .env or .env.local.",
  );
}

function RootProviders({ children }: { children: React.ReactNode }) {
  if (!convex) return <>{children}</>;
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId || "placeholder.apps.googleusercontent.com"}>
      <RootProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RootProviders>
    </GoogleOAuthProvider>
  </StrictMode>,
);
