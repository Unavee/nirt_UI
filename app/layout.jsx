import "./globals.css";
import AppShell from "@/components/AppShell";
import { RoleProvider } from "@/context/RoleContext";
import { SidebarProvider } from "@/context/SidebarContext";
import PWARegistration from "@/components/PWARegistration";

export const metadata = {
  title: "NIRT Solar CRM | Rooftop Solar Project Management",
  description: "End-to-End Rooftop Solar Project Management CRM for NIRT Renewable Energy Pvt Ltd",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NIRT Solar"
  }
};

export const viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NIRT Solar" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white font-sans">
        <RoleProvider>
          <SidebarProvider>
            <AppShell>
              {children}
            </AppShell>
            <PWARegistration />
          </SidebarProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
