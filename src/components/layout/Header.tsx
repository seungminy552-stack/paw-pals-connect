import { Bell, Menu, Search, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  showSearch?: boolean;
  showLocation?: boolean;
  location?: string;
  onLocationClick?: () => void;
}

export function Header({ 
  showSearch = true, 
  showLocation = true,
  location = "서울 강남구",
  onLocationClick 
}: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shelters?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-sm">
            <span className="text-xl">🐾</span>
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:block">PawConnect</span>
        </Link>

        {/* Center - Location & Search */}
        <div className="flex-1 flex items-center justify-center gap-3 max-w-xl">
          {showLocation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLocationClick}
              className="shrink-0 gap-1.5 text-foreground hover:text-primary"
              aria-label="지역 선택"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">{location}</span>
            </Button>
          )}
          
          {showSearch && (
            <form onSubmit={handleSearch} className="flex-1 max-w-sm hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="보호소 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-secondary/50"
                  aria-label="보호소 검색"
                />
              </div>
            </form>
          )}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative"
            aria-label="알림"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate("/my")}
            aria-label="마이페이지"
          >
            <User className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon-sm"
            className="sm:hidden"
            aria-label="메뉴"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
