import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate auth check - in real app would check Firebase auth state
    const timer = setTimeout(() => {
      // For demo, redirect to login
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      {/* Splash Screen */}
      <div className="text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-xl animate-pulse-soft">
          <span className="text-5xl">🐾</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">PawConnect</h1>
        <p className="text-muted-foreground">유기동물과 함께하는 따뜻한 연결</p>
        
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
