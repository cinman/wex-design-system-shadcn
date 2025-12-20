import * as React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

/**
 * Left sidebar container for docs navigation
 * Provides semantic navigation landmark
 */
export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-background overflow-y-auto">
      <nav
        role="navigation"
        aria-label="Documentation navigation"
        className="p-4"
      >
        {children}
      </nav>
    </aside>
  );
}

