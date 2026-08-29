import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";
import { getGoogleClientId } from "./lib/google-auth";
import "./index.css";

const googleClientId = getGoogleClientId();
const convexUrl = import.meta.env.VITE_CONVEX_URL?.trim();
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function RootProviders({ children }: { children: React.ReactNode }) {
  if (!convex) {
    console.warn("VITE_CONVEX_URL is not set — running without Convex backend sync.");
    return <>{children}</>;
  }
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
