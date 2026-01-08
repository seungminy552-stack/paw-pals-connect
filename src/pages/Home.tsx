import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ShelterCard } from "@/components/cards/ShelterCard";
import { AnimalCard } from "@/components/cards/AnimalCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dummyShelters, dummyAnimals, regions } from "@/data/dummyData";
import { ChevronRight, MapPin, Sparkles, TrendingUp, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("서울 강남구");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedSido, setSelectedSido] = useState<string>("서울");
  const [shelters, setShelters] = useState(dummyShelters);

  const handleFavoriteToggle = (id: string) => {
    setShelters(shelters.map(s => 
      s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
    ));
  };

  const handleLocationSelect = (sido: string, sigungu: string) => {
    setLocation(`${sido} ${sigungu}`);
    setShowLocationPicker(false);
  };

  const quickFilters = [
    { label: "오늘 봉사 가능", icon: "🗓️", active: false },
    { label: "산책 봉사", icon: "🐕", active: false },
    { label: "목욕 봉사", icon: "🛁", active: false },
    { label: "청소 봉사", icon: "🧹", active: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header 
        location={location} 
        onLocationClick={() => setShowLocationPicker(true)} 
      />

      <main className="container py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-6 md:p-8 text-primary-foreground animate-fade-in">
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 mb-3">
              <Sparkles className="h-3 w-3 mr-1" />
              따뜻한 연결
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              오늘도 작은 발걸음이<br />큰 사랑이 됩니다
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-4">
              가까운 보호소에서 봉사활동에 참여해보세요
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/shelters")}
              className="bg-white text-primary hover:bg-white/90"
            >
              보호소 둘러보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          {/* Decorative paws */}
          <div className="absolute right-4 top-4 text-6xl opacity-20 rotate-12">🐾</div>
          <div className="absolute right-16 bottom-4 text-4xl opacity-15 -rotate-12">🐾</div>
        </section>

        {/* Quick Filters */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">빠른 필터</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickFilters.map((filter) => (
              <Button
                key={filter.label}
                variant={filter.active ? "default" : "outline"}
                size="sm"
                className="shrink-0 rounded-full"
              >
                <span className="mr-1">{filter.icon}</span>
                {filter.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Nearby Shelters */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">내 주변 보호소</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/shelters")}>
              더보기
              <ChevronRight className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shelters.slice(0, 3).map((shelter, idx) => (
              <div key={shelter.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <ShelterCard shelter={shelter} onFavoriteToggle={handleFavoriteToggle} />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Animals */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">관심 받는 친구들</h2>
            </div>
            <Button variant="ghost" size="sm">
              더보기
              <ChevronRight className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {dummyAnimals.slice(0, 6).map((animal, idx) => (
              <div key={animal.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <AnimalCard animal={animal} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />

      {/* Location Picker Dialog */}
      <Dialog open={showLocationPicker} onOpenChange={setShowLocationPicker}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              지역 선택
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Sido (City/Province) */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">시/도</p>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {Object.keys(regions).map((sido) => (
                  <button
                    key={sido}
                    onClick={() => setSelectedSido(sido)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedSido === sido
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    {sido}
                  </button>
                ))}
              </div>
            </div>

            {/* Sigungu (District) */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">시/군/구</p>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {regions[selectedSido as keyof typeof regions]?.map((sigungu) => (
                  <button
                    key={sigungu}
                    onClick={() => handleLocationSelect(selectedSido, sigungu)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors"
                  >
                    {sigungu}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
