import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimalCard } from "@/components/cards/AnimalCard";
import { dummyShelters, dummyAnimals, dummyVolunteerSlots, dummyPosts } from "@/data/dummyData";
import { 
  ArrowLeft, Heart, MapPin, Phone, Clock, Calendar, 
  MessageCircle, ChevronRight, Users, Info, FileText,
  PawPrint
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ShelterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedSlot, setSelectedSlot] = useState<typeof dummyVolunteerSlots[0] | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  const shelter = dummyShelters.find(s => s.id === id) || dummyShelters[0];
  const animals = dummyAnimals.filter(a => a.shelterName === shelter.name).slice(0, 4);
  const slots = dummyVolunteerSlots.filter(s => s.shelterId === shelter.id);

  const handleApply = () => {
    toast.success("봉사 신청이 완료되었습니다!", {
      description: "승인 결과는 마이페이지에서 확인하세요."
    });
    setShowApplyDialog(false);
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  
  // Group slots by date for weekly view
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, typeof slots>);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      {/* Custom Header with Back Button */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center gap-4">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-foreground flex-1 truncate">{shelter.name}</h1>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(isFavorite && "text-red-500")}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Image */}
        <div className="relative aspect-video max-h-64 overflow-hidden">
          <img
            src={shelter.imageUrl}
            alt={shelter.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white text-xl font-bold mb-1">{shelter.name}</h2>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <MapPin className="h-4 w-4" />
              {shelter.address}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="container py-4 grid grid-cols-3 gap-4 border-b border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{shelter.animalCount}</div>
            <div className="text-xs text-muted-foreground">보호동물</div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-2xl font-bold text-primary">{slots.length}</div>
            <div className="text-xs text-muted-foreground">봉사 일정</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{shelter.distance}</div>
            <div className="text-xs text-muted-foreground">거리</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="container py-4">
          <TabsList className="w-full grid grid-cols-5 h-auto p-1">
            <TabsTrigger value="info" className="text-xs py-2 px-1">
              <Info className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">소개</span>
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="text-xs py-2 px-1">
              <Calendar className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">봉사</span>
            </TabsTrigger>
            <TabsTrigger value="animals" className="text-xs py-2 px-1">
              <PawPrint className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">동물</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="text-xs py-2 px-1">
              <FileText className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">소식</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs py-2 px-1">
              <MessageCircle className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">문의</span>
            </TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="mt-4 space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-soft flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">주소</p>
                  <p className="text-sm text-muted-foreground">{shelter.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-soft flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">연락처</p>
                  <p className="text-sm text-muted-foreground">02-1234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-soft flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">운영시간</p>
                  <p className="text-sm text-muted-foreground">평일 09:00 - 18:00 / 주말 10:00 - 17:00</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-xl">
              <h3 className="font-medium text-foreground mb-2">보호소 소개</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                저희 보호소는 유기동물들에게 따뜻한 보금자리를 제공하고, 새로운 가족을 찾아주기 위해 
                노력하고 있습니다. 봉사자분들의 소중한 시간이 동물들에게 큰 힘이 됩니다.
              </p>
            </div>
          </TabsContent>

          {/* Volunteer Tab */}
          <TabsContent value="volunteer" className="mt-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">이번 주 봉사 일정</h3>
              <Button variant="ghost" size="sm">
                월간 보기
                <ChevronRight className="h-4 w-4 ml-0.5" />
              </Button>
            </div>

            {/* Weekly Schedule Grid */}
            <div className="space-y-3">
              {Object.entries(slotsByDate).map(([date, dateSlots]) => (
                <div key={date} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      {new Date(date).getMonth() + 1}/{new Date(date).getDate()} ({weekDays[new Date(date).getDay()]})
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {dateSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setShowApplyDialog(true);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium text-foreground">
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {slot.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{slot.currentApplicants}/{slot.capacity}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Animals Tab */}
          <TabsContent value="animals" className="mt-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">보호 중인 동물들</h3>
              <Button variant="ghost" size="sm">
                전체보기
                <ChevronRight className="h-4 w-4 ml-0.5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(animals.length > 0 ? animals : dummyAnimals.slice(0, 4)).map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="mt-4 space-y-4 animate-fade-in">
            {dummyPosts.map((post) => (
              <div key={post.id} className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={post.type === "notice" ? "default" : "secondary"}>
                    {post.type === "notice" ? "공지" : post.type === "adoption" ? "입양" : "후기"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                </div>
                <h4 className="font-medium text-foreground mb-1">{post.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.body}</p>
              </div>
            ))}
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-4 space-y-4 animate-fade-in">
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">보호소에 문의하기</h3>
              <p className="text-sm text-muted-foreground mb-4">
                궁금한 점이 있으시면 문의해주세요
              </p>
              <Button size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                문의하기
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>봉사 신청</DialogTitle>
            <DialogDescription>
              선택하신 봉사 일정에 신청하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-secondary/50 rounded-xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">일시</span>
                  <span className="font-medium text-foreground">
                    {selectedSlot.date} {selectedSlot.startTime} - {selectedSlot.endTime}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">봉사 유형</span>
                  <span className="font-medium text-foreground">{selectedSlot.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">현재 신청</span>
                  <span className="font-medium text-foreground">
                    {selectedSlot.currentApplicants}/{selectedSlot.capacity}명
                  </span>
                </div>
              </div>

              <div className="p-4 bg-primary-soft rounded-xl">
                <h4 className="font-medium text-foreground mb-2">유의사항</h4>
                <p className="text-sm text-muted-foreground">{selectedSlot.description}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
              취소
            </Button>
            <Button onClick={handleApply}>
              신청하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
