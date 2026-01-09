import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SidebarNav } from "./SidebarNav";
import { Footer } from "./Footer";
import { ScrollToTop } from "@/docs/components/ScrollToTop";
import { TokenMapModal } from "@/docs/components/TokenMapModal";
import { ThemeBuilderProvider } from "@/docs/context/ThemeBuilderContext";

/**
 * Fade-in wrapper for content
 */
function FadeInContent({ 
  children, 
  onContentRendered 
}: { 
  children: React.ReactNode;
  onContentRendered?: () => void;
}) {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const hasRenderedRef = React.useRef(false);

  React.useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false);
    
    // Use requestAnimationFrame for smoother timing - ensures DOM is ready
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        setIsVisible(true);
        
        // Notify parent that content has rendered (for initial load detection)
        if (!hasRenderedRef.current && onContentRendered) {
          hasRenderedRef.current = true;
          onContentRendered();
        }
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
    };
  }, [location.pathname, onContentRendered]);

  return (
    <div
      className="transition-opacity duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Main layout shell for docs site
 * - Header at top with theme toggle
 * - Fixed sidebar on left
 * - Scrollable main content area
 * - Theme Builder mode: replaces sidebar with ThemeBuilderNav
 */
interface DocsLayoutProps {
  onContentRendered?: () => void;
}

export function DocsLayout({ onContentRendered }: DocsLayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isThemeBuilder = location.pathname === "/theme-builder";
  
  // Track previous location to save before entering theme builder
  const prevLocationRef = React.useRef<string | null>(null);
  
  // Save previous page when entering theme builder
  React.useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;
    
    // If we just navigated TO theme builder, save the previous page
    if (isThemeBuilder && prevPath !== null && prevPath !== "/theme-builder") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("wex-theme-builder-last-page", prevPath);
      }
    }
    
    // Update the ref AFTER checking (only track non-theme-builder pages)
    if (!isThemeBuilder) {
      prevLocationRef.current = currentPath;
    }
  }, [location.pathname, isThemeBuilder]);
  
  // Token Map modal state (can be opened from Theme Builder)
  const [tokenMapOpen, setTokenMapOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ScrollToTop />
      
      {/* 
        Global Mesh Background - Only on Home Page
        Placed at the root to ensure it stays at the very bottom of the stack.
      */}
      {isHome && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Primary Blob - Subtle Blue */}
          <div className="animate-mesh absolute -left-[10%] -top-[10%] h-[1200px] w-[1200px] rounded-full bg-[#0052CC] opacity-[0.05] blur-[140px]" />
          {/* Accent Blob - Subtle Cyan */}
          <div className="animate-mesh-slow absolute -right-[15%] top-[5%] h-[1100px] w-[1100px] rounded-full bg-[#00B8D9] opacity-[0.04] blur-[160px]" />
          {/* Soft Middle Blob - Subtle Blue */}
          <div className="animate-mesh-delayed absolute left-[10%] top-[40%] h-[900px] w-[900px] rounded-full bg-[#0052CC] opacity-[0.03] blur-[140px]" />
        </div>
      )}

      <Header />
      
      {/* Sidebar - hidden on home page and theme builder */}
      {/* Theme Builder has its own full-page layout with integrated nav */}
      {isThemeBuilder ? (
        <ThemeBuilderProvider>
          {/* Token Map Modal - can be opened from Theme Builder */}
          <TokenMapModal open={tokenMapOpen} onOpenChange={setTokenMapOpen} />
          
          {/* Theme Builder manages its own layout - fixed height, no page scroll */}
          <main className="relative z-10 h-[calc(100vh-3.5rem)] overflow-hidden">
            <Outlet />
          </main>
        </ThemeBuilderProvider>
      ) : (
        <>
          {/* Regular pages */}
          {!isHome && (
            <Sidebar>
              <SidebarNav />
            </Sidebar>
          )}
          
          <div
            className="relative z-10 min-h-[calc(100vh-3.5rem)] overflow-x-hidden"
            style={{
              maxWidth: '1700px',
              margin: '0 auto'
            }}
          >
            <main className="p-8">
              <div 
                className={isHome ? "" : ""}
                style={!isHome ? { 
                  marginLeft: '17rem'
                } : {}}
              >
                {isHome ? (
                  <FadeInContent onContentRendered={onContentRendered}>
                    <Outlet />
                  </FadeInContent>
                ) : (
                  <FadeInContent>
                    <Outlet />
                  </FadeInContent>
                )}
              </div>
            </main>
          </div>
          
          {/* Footer - positioned below everything, spans full width */}
          <div
            className="relative z-40 w-full"
            style={{
              maxWidth: '1700px',
              margin: '0 auto'
            }}
          >
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

