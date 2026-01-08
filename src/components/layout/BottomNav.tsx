import { Home, Search, Heart, User, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "홈", path: "/home" },
  { icon: Search, label: "탐색", path: "/shelters" },
  { icon: Heart, label: "관심", path: "/my?tab=favorites" },
  { icon: Building2, label: "관리", path: "/admin" },
  { icon: User, label: "마이", path: "/my" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || 
            (path === "/my" && location.pathname.startsWith("/my"));
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
              <span className="text-2xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
