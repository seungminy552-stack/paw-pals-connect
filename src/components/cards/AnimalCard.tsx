import { Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Animal {
  id: string;
  name: string;
  species: "dog" | "cat" | "other";
  age: string;
  sex: "male" | "female";
  status: "care" | "adopted";
  imageUrl: string;
  shelterName?: string;
  description?: string;
}

interface AnimalCardProps {
  animal: Animal;
  onClick?: () => void;
}

export function AnimalCard({ animal, onClick }: AnimalCardProps) {
  const speciesEmoji = animal.species === "dog" ? "🐕" : animal.species === "cat" ? "🐈" : "🐾";
  const sexLabel = animal.sex === "male" ? "남아" : "여아";
  
  return (
    <article 
      className="relative bg-card rounded-2xl overflow-hidden card-elevated card-hover cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Status badge */}
        {animal.status === "adopted" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-success text-success-foreground border-0 text-sm px-4 py-1">
              입양완료 🎉
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-1.5">
            <span>{speciesEmoji}</span>
            <span>{animal.name}</span>
          </h3>
          <Badge variant="secondary" className="text-xs">
            {sexLabel}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {animal.age}
        </p>

        {animal.shelterName && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
            <MapPin className="h-3 w-3" />
            {animal.shelterName}
          </p>
        )}
      </div>
    </article>
  );
}
