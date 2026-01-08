import { Heart, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Shelter {
  id: string;
  name: string;
  address: string;
  distance?: string;
  imageUrl: string;
  todaySlots?: number;
  animalCount?: number;
  isFavorite?: boolean;
  tags?: string[];
}

interface ShelterCardProps {
  shelter: Shelter;
  onFavoriteToggle?: (id: string) => void;
}

export function ShelterCard({ shelter, onFavoriteToggle }: ShelterCardProps) {
  return (
    <Link
      to={`/shelter/${shelter.id}`}
      className="group block"
    >
      <article className="relative bg-card rounded-2xl overflow-hidden card-elevated card-hover">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={shelter.imageUrl}
            alt={shelter.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavoriteToggle?.(shelter.id);
            }}
            className={cn(
              "absolute top-3 right-3 bg-white/90 hover:bg-white shadow-sm",
              shelter.isFavorite && "text-red-500"
            )}
            aria-label={shelter.isFavorite ? "관심 해제" : "관심 등록"}
          >
            <Heart className={cn("h-4 w-4", shelter.isFavorite && "fill-current")} />
          </Button>

          {/* Today slots badge */}
          {shelter.todaySlots && shelter.todaySlots > 0 && (
            <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground border-0 shadow-md">
              <Clock className="h-3 w-3 mr-1" />
              오늘 {shelter.todaySlots}건 모집중
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {shelter.name}
          </h3>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{shelter.address}</span>
            {shelter.distance && (
              <span className="shrink-0 ml-1 text-primary font-medium">
                · {shelter.distance}
              </span>
            )}
          </div>

          {/* Tags */}
          {shelter.tags && shelter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {shelter.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          {shelter.animalCount !== undefined && (
            <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground border-t border-border/50 mt-3">
              <div className="flex items-center gap-1">
                <span className="text-lg">🐕</span>
                <span>보호동물 {shelter.animalCount}마리</span>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
