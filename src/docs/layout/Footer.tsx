/**
 * Footer component for all docs pages
 */
export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="flex flex-col items-center justify-between gap-6 px-8 py-10 sm:flex-row">
        <div className="flex items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}WEX_Logo_Red_Vector.svg`} 
            alt="WEX" 
            className="h-5 dark:hidden" 
          />
          <img 
            src={`${import.meta.env.BASE_URL}WEX_Logo_White_Vector.svg`} 
            alt="WEX" 
            className="h-5 hidden dark:block" 
          />
          <span className="text-sm font-medium text-muted-foreground">Design System</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} WEX Inc.</p>
          <a href="https://www.wexinc.com/privacy-notice" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-red">Privacy notice</a>
          <a href="https://www.wexinc.com/cookie-notice" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-red">Cookie notice</a>
          <a href="https://www.wexinc.com/terms-of-use" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-red">Terms of use</a>          
        </div>
      </div>
    </footer>
  );
}

