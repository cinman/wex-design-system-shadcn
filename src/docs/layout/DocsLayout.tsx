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
 * Fade-in wrapper for full page content (home page, transitions from home)
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
 * Fade-in wrapper for article-level content (sidebar pages)
 * Only fades the article element, not the whole page
 */
function ArticleFadeWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false);
    
    // Use requestAnimationFrame for smoother timing
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
    };
  }, [location.pathname]);

  React.useEffect(() => {
    // Apply fade to article elements - re-query on route change
    const updateArticles = () => {
      if (wrapperRef.current) {
        const articles = wrapperRef.current.querySelectorAll('article');
        articles.forEach((article) => {
          article.style.transition = 'opacity 500ms ease-out';
          article.style.opacity = isVisible ? '1' : '0';
          article.style.willChange = 'opacity';
        });
      }
    };

    // Reset opacity first
    if (wrapperRef.current) {
      const articles = wrapperRef.current.querySelectorAll('article');
      articles.forEach((article) => {
        article.style.opacity = '0';
      });
    }

    // Update after a brief delay to catch dynamically rendered articles
    const timeout1 = setTimeout(updateArticles, 10);
    const timeout2 = setTimeout(updateArticles, 100);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isVisible, location.pathname]);

  return (
    <div ref={wrapperRef}>
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
  // Track if we're coming from home page or initial load (for fade transition logic)
  const [useFullPageFade, setUseFullPageFade] = React.useState(true);
  const isInitialMountRef = React.useRef(true);
  
  // Set flag when on home page (separate effect to ensure it's always set)
  React.useEffect(() => {
    if (isHome && !isThemeBuilder && typeof window !== 'undefined') {
      sessionStorage.setItem('wex-on-home-page', 'true');
    }
  }, [isHome, isThemeBuilder]);
  
  // Save previous page when entering theme builder and determine fade type
  React.useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;
    const isInitialLoad = isInitialMountRef.current;
    
    // Check sessionStorage flag BEFORE we potentially clear it
    // This flag is set when we're on home page
    const wasOnHomePageFlag = typeof window !== 'undefined' 
      ? sessionStorage.getItem('wex-on-home-page') === 'true'
      : false;
    
    // Determine fade type based on navigation source:
    // - Full page fade: home page, transitioning TO/FROM home, initial load, or navigating FROM home
    // - Article fade: transitioning BETWEEN sidebar pages (both have sidebar)
    if (isHome) {
      // Always use full-page fade for home
      setUseFullPageFade(true);
    } else if (!isThemeBuilder) {
      // Sidebar page - use full fade if:
      // 1. Initial load (direct URL or refresh)
      // 2. Coming from home page (prevPath === "/" OR flag was set)
      // Otherwise use article fade (navigating between sidebar pages)
      const comingFromHome = prevPath === "/" || wasOnHomePageFlag;
      setUseFullPageFade(isInitialLoad || comingFromHome);
      
      // Clear the flag after checking (we're no longer on home)
      if (wasOnHomePageFlag && typeof window !== 'undefined') {
        sessionStorage.removeItem('wex-on-home-page');
      }
    }
    
    // Mark that initial mount is complete after first render
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    }
    
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
  }, [location.pathname, isThemeBuilder, isHome]);
  
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
                  <FadeInContent key="home" onContentRendered={onContentRendered}>
                    <Outlet />
                  </FadeInContent>
                ) : useFullPageFade ? (
                  // Full fade when coming from home or initial load
                  <FadeInContent key={`full-${location.pathname}`}>
                    <Outlet />
                  </FadeInContent>
                ) : (
                  // Article-level fade for sidebar page transitions
                  <ArticleFadeWrapper key={`article-${location.pathname}`}>
                    <Outlet />
                  </ArticleFadeWrapper>
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

