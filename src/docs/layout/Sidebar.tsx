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
    <aside 
      className="fixed top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-background overflow-y-auto"
      style={{
        left: 'max(0px, calc((100vw - 1700px) / 2))'
      }}
    >
      <nav
        role="navigation"
        aria-label="Documentation navigation"
        className="p-4"
        style={{
          marginLeft: 'calc(-3px - clamp(0px, (100vw - 1700px) / 2, 6px))'
        }}
      >
        {children}
      </nav>
    </aside>
  );
}

