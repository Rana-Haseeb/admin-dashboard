import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpPage from "./pages/HelpPage";

const PAGES = {
  dashboard:     DashboardPage,
  analytics:     AnalyticsPage,
  users:         UsersPage,
  settings:      SettingsPage,
  notifications: NotificationsPage,
  help:          HelpPage,
};

function AppShell() {
  const [activePage, setActivePage] = useState("dashboard");
  const PageComponent = PAGES[activePage] || DashboardPage;

  return (
    <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
      <PageComponent />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
