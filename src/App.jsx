import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "@/context/RoleContext";
import { SidebarProvider } from "@/context/SidebarContext";
import AppShell from "@/components/AppShell";
import PWARegistration from "@/components/PWARegistration";

// Pages
import HomePage from "@/pages/HomePage";
import PipelinesPage from "@/pages/PipelinesPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import SettingsPage from "@/pages/SettingsPage";
import UserRolesPage from "@/pages/UserRolesPage";
import LoginPage from "@/pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <SidebarProvider>
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pipelines" element={<PipelinesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/users" element={<UserRolesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
          <PWARegistration />
        </SidebarProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}
