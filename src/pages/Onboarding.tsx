import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, User, Heart, Building2, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Role = "volunteer" | "shelter_admin";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "" as Role | "",
    name: "",
    phone: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const handleRoleSelect = (role: Role) => {
    setFormData({ ...formData, role });
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      toast.error("필수 약관에 동의해주세요");
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      toast.error("올바른 전화번호를 입력해주세요");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    toast.success("온보딩 완료! 환영합니다 🎉");
    navigate("/home");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Progress */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
            step >= 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          )}>
            {step > 1 ? <Check className="h-5 w-5" /> : "1"}
          </div>
          <div className={cn("w-16 h-1 rounded-full transition-all", step > 1 ? "bg-primary" : "bg-secondary")} />
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
            step >= 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          )}>
            2
          </div>
        </div>
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="w-full max-w-sm space-y-6 animate-slide-up">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">어떤 목적으로 가입하셨나요?</h1>
            <p className="text-muted-foreground">가입 목적에 맞는 서비스를 제공해 드릴게요</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("volunteer")}
              className="w-full p-6 bg-card rounded-2xl border-2 border-border hover:border-primary transition-all card-hover text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    봉사자로 가입
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    보호소를 탐색하고 봉사활동에 참여할 수 있어요
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("shelter_admin")}
              className="w-full p-6 bg-card rounded-2xl border-2 border-border hover:border-primary transition-all card-hover text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    보호소 운영자로 가입
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    보호소를 등록하고 봉사자를 모집할 수 있어요
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Info & Terms */}
      {step === 2 && (
        <div className="w-full max-w-sm space-y-6 animate-slide-up">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">기본 정보를 입력해주세요</h1>
            <p className="text-muted-foreground">봉사 활동에 필요한 연락 정보예요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                />
                <label htmlFor="agreeTerms" className="text-sm text-foreground cursor-pointer">
                  <span className="text-primary">[필수]</span> 서비스 이용약관에 동의합니다
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                />
                <label htmlFor="agreePrivacy" className="text-sm text-foreground cursor-pointer">
                  <span className="text-primary">[필수]</span> 개인정보 수집 및 이용에 동의합니다
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                이전
              </Button>
              <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
                {isLoading ? "완료 중..." : "시작하기"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
