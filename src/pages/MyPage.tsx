import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShelterCard } from "@/components/cards/ShelterCard";
import { dummyApplications, dummyShelters } from "@/data/dummyData";
import { 
  ArrowLeft, Calendar, Heart, Settings, ChevronRight, 
  Clock, MapPin, LogOut, Bell, User
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");

  const favoriteShelters = dummyShelters.filter(s => s.isFavorite);

  const handleCancelApplication = (appId: string) => {
    toast.success("신청이 취소되었습니다");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="badge-pending border">대기중</Badge>;
      case "approved":
        return <Badge className="badge-approved border">승인됨</Badge>;
      case "rejected":
        return <Badge className="badge-rejected border">거절됨</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header showSearch={false} showLocation={false} />

      <main className="container py-6 space-y-6">
        {/* Profile Section */}
        <section className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-2xl">
            🙋
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-foreground">홍길동</h2>
            <p className="text-sm text-muted-foreground">hong@example.com</p>
            <Badge variant="secondary" className="mt-1">봉사자</Badge>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-card rounded-xl border border-border text-center">
            <div className="text-2xl font-bold text-primary">{dummyApplications.length}</div>
            <div className="text-xs text-muted-foreground">신청 내역</div>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border text-center">
            <div className="text-2xl font-bold text-success">1</div>
            <div className="text-xs text-muted-foreground">승인됨</div>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border text-center">
            <div className="text-2xl font-bold text-foreground">{favoriteShelters.length}</div>
            <div className="text-xs text-muted-foreground">관심 보호소</div>
          </div>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-auto">
            <TabsTrigger value="applications" className="py-2.5">
              <Calendar className="h-4 w-4 mr-1.5" />
              신청 내역
            </TabsTrigger>
            <TabsTrigger value="favorites" className="py-2.5">
              <Heart className="h-4 w-4 mr-1.5" />
              관심 보호소
            </TabsTrigger>
            <TabsTrigger value="settings" className="py-2.5">
              <Settings className="h-4 w-4 mr-1.5" />
              설정
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="mt-4 space-y-3">
            {dummyApplications.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">신청 내역이 없습니다</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  보호소에서 봉사 활동에 신청해보세요
                </p>
                <Button onClick={() => navigate("/shelters")}>
                  보호소 둘러보기
                </Button>
              </div>
            ) : (
              dummyApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-card rounded-xl border border-border space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{app.shelterName}</h4>
                      <p className="text-sm text-muted-foreground">{app.type}</p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {app.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {app.time}
                    </div>
                  </div>

                  {app.status === "pending" && (
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCancelApplication(app.id)}
                      >
                        신청 취소
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/shelter/${app.shelterId}`)}
                      >
                        보호소 보기
                      </Button>
                    </div>
                  )}

                  {app.status === "approved" && (
                    <div className="p-3 bg-success/10 rounded-lg text-sm text-success">
                      ✅ 승인되었습니다. 시간에 맞춰 방문해주세요!
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-4 space-y-4">
            {favoriteShelters.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">관심 보호소가 없습니다</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  마음에 드는 보호소를 ❤️ 눌러 저장하세요
                </p>
                <Button onClick={() => navigate("/shelters")}>
                  보호소 둘러보기
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteShelters.map((shelter) => (
                  <ShelterCard key={shelter.id} shelter={shelter} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-4 space-y-2">
            <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">프로필 수정</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">알림 설정</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            <button 
              onClick={() => {
                toast.success("로그아웃 되었습니다");
                navigate("/login");
              }}
              className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:bg-destructive/10 transition-colors text-destructive"
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">로그아웃</span>
              </div>
            </button>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
}
