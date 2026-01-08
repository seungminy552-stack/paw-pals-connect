import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ShelterCard } from "@/components/cards/ShelterCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyShelters } from "@/data/dummyData";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShelterList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [shelters, setShelters] = useState(dummyShelters);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFavoriteToggle = (id: string) => {
    setShelters(shelters.map(s => 
      s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
    ));
  };

  const filters = [
    { id: "all", label: "전체" },
    { id: "today", label: "오늘 가능" },
    { id: "walk", label: "산책" },
    { id: "bath", label: "목욕" },
    { id: "clean", label: "청소" },
  ];

  const filteredShelters = shelters.filter(shelter => {
    if (searchQuery) {
      return shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             shelter.address.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header location="서울 강남구" />

      <main className="container py-6 space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="보호소명, 지역으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="shrink-0 rounded-full"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            총 <span className="font-medium text-foreground">{filteredShelters.length}</span>개의 보호소
          </p>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Filter className="h-4 w-4 mr-1" />
            거리순
          </Button>
        </div>

        {/* Shelter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShelters.map((shelter, idx) => (
            <div key={shelter.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <ShelterCard shelter={shelter} onFavoriteToggle={handleFavoriteToggle} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredShelters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-foreground mb-2">검색 결과가 없습니다</h3>
            <p className="text-muted-foreground">다른 검색어로 시도해보세요</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
