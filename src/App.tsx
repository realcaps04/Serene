import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { PwaPrompts } from "./components/pwa/PwaPrompts";
import { SessionRedirect } from "./components/auth/SessionRedirect";
import { AppShell } from "./components/navigation/AppShell";
import { hasActiveSession } from "./lib/session";
import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { GoalsScreen } from "./screens/GoalsScreen";
import { MoodScreen } from "./screens/MoodScreen";
import { CompanionIntroScreen, SignInScreen } from "./screens/MeetScreens";
import { HomeScreen } from "./screens/HomeScreen";
import { CompanionScreen } from "./screens/CompanionScreen";
import { MindfulnessScreen } from "./screens/MindfulnessScreen";
import { BreathingScreen } from "./screens/BreathingScreen";
import { JournalEditorScreen, JournalListScreen } from "./screens/JournalScreens";
import { InsightsScreen } from "./screens/InsightsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import {
  PrivacyScreen,
  ProfileDetailsScreen,
  SafetyScreen,
} from "./screens/SupportScreens";

export default function App() {
  return (
    <AppProvider>
      <PwaPrompts />
      <SessionRedirect />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route element={<AppShell />}>
          <Route path="/welcome" element={<OnboardingScreen />} />
          <Route path="/goals" element={<GoalsScreen />} />
          <Route path="/mood" element={<MoodScreen />} />
          <Route path="/meet" element={<CompanionIntroScreen />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/app/breathing" element={<BreathingScreen />} />
          <Route path="/app/companion" element={<CompanionScreen />} />
        </Route>
        <Route element={<AppShell withNav />}>
          <Route path="/app/home" element={<HomeScreen />} />
          <Route path="/app/mindfulness" element={<MindfulnessScreen />} />
          <Route path="/app/journal" element={<JournalListScreen />} />
          <Route path="/app/journal/new" element={<JournalEditorScreen />} />
          <Route path="/app/insights" element={<InsightsScreen />} />
          <Route path="/app/profile" element={<ProfileScreen />} />
          <Route path="/app/settings" element={<SettingsScreen />} />
          <Route path="/app/support" element={<SafetyScreen />} />
          <Route path="/app/notifications" element={<NotificationsScreen />} />
          <Route path="/app/privacy" element={<PrivacyScreen />} />
          <Route path="/app/profile/details" element={<ProfileDetailsScreen />} />
        </Route>
        <Route path="*" element={<Navigate to={hasActiveSession() ? "/app/home" : "/"} replace />} />
      </Routes>
    </AppProvider>
  );
}
