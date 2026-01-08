import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyVolunteerSlots, dummyAnimals, dummyPosts } from "@/data/dummyData";
import {
  Building2, Calendar, Users, PawPrint, FileText,
  Plus, Check, X, Clock, Settings, Bell, ChevronRight,
  Menu, LogOut
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");

  // Mock pending applications
  const pendingApplications = [
    { id: "1", userName: "김철수", date: "2026-01-10", time: "10:00-12:00", type: "산책 봉사", appliedAt: "2026-01-08 14:30" },
    { id: "2", userName: "이영희", date: "2026-01-10", time: "14:00-16:00", type: "목욕 봉사", appliedAt: "2026-01-08 16:20" },
    { id: "3", userName: "박민수", date: "2026-01-11", time: "09:00-11:00", type: "청소 봉사", appliedAt: "2026-01-09 09:15" },
  ];

  const handleApprove = (id: string) => {
    toast.success("신청을 승인했습니다");
  };

  const handleReject = (id: string) => {
    toast.success("신청을 거절했습니다");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">관리자 대시보드</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">강남 유기동물 보호센터</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => navigate("/home")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Stats Overview */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-soft flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{pendingApplications.length}</div>
                <div className="text-xs text-muted-foreground">대기 중인 신청</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{dummyVolunteerSlots.length}</div>
                <div className="text-xs text-muted-foreground">봉사 일정</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{dummyAnimals.length}</div>
                <div className="text-xs text-muted-foreground">보호 동물</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{dummyPosts.length}</div>
                <div className="text-xs text-muted-foreground">게시글</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 h-auto">
            <TabsTrigger value="applications" className="py-2.5 text-xs sm:text-sm">
              신청 관리
            </TabsTrigger>
            <TabsTrigger value="schedule" className="py-2.5 text-xs sm:text-sm">
              일정 관리
            </TabsTrigger>
            <TabsTrigger value="animals" className="py-2.5 text-xs sm:text-sm">
              동물 관리
            </TabsTrigger>
            <TabsTrigger value="posts" className="py-2.5 text-xs sm:text-sm">
              소식 관리
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">봉사 신청 목록</h2>
              <Badge variant="destructive">{pendingApplications.length}건 대기</Badge>
            </div>

            <div className="space-y-3">
              {pendingApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-card rounded-xl border border-border space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{app.userName}</h4>
                      <p className="text-sm text-muted-foreground">{app.type}</p>
                    </div>
                    <Badge className="badge-pending border">대기중</Badge>
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

                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => handleReject(app.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      거절
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleApprove(app.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      승인
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">봉사 일정</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                일정 추가
              </Button>
            </div>

            <div className="space-y-3">
              {dummyVolunteerSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 bg-card rounded-xl border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{slot.date}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {slot.currentApplicants}/{slot.capacity}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <p className="text-sm text-muted-foreground">{slot.type}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      수정
                      <ChevronRight className="h-4 w-4 ml-0.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Animals Tab */}
          <TabsContent value="animals" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">보호 동물</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                동물 등록
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {dummyAnimals.slice(0, 4).map((animal) => (
                <div
                  key={animal.id}
                  className="p-3 bg-card rounded-xl border border-border cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-2">
                    <img
                      src={animal.imageUrl}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-foreground">{animal.name}</h4>
                  <p className="text-xs text-muted-foreground">{animal.age}</p>
                  <Badge
                    variant={animal.status === "care" ? "secondary" : "default"}
                    className="mt-2 text-xs"
                  >
                    {animal.status === "care" ? "보호중" : "입양완료"}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">소식 관리</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                글 작성
              </Button>
            </div>

            <div className="space-y-3">
              {dummyPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-card rounded-xl border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={post.type === "notice" ? "default" : "secondary"}>
                      {post.type === "notice" ? "공지" : post.type === "adoption" ? "입양" : "후기"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                  </div>
                  <h4 className="font-medium text-foreground">{post.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{post.body}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
