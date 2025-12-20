import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SidebarNav } from "./SidebarNav";
import { ScrollToTop } from "@/docs/components/ScrollToTop";

/**
 * Main layout shell for docs site
 * - Header at top with theme toggle
 * - Fixed sidebar on left
 * - Scrollable main content area
 */
export function DocsLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Header />
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <main className="ml-64 min-h-[calc(100vh-3.5rem)] p-8">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

