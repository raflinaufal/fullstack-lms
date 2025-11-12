"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/authSlice";
import { useLogoutMutation } from "@/lib/redux/api/authApi";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/protected-route";
import landingData from "@/data/landing-data.json";

function LandingPageContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const { landingPage } = landingData;

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      // Even if API call fails, clear local state
      dispatch(logout());
      router.push("/login");
    }
  };

  const navigation = {
    buttons: [
      {
        id: "history",
        label: "Riwayat Nilai Tes",
        route: "/history",
        type: "outline",
        description: "Lihat riwayat hasil tes yang sudah dikerjakan",
        icon: <FileText className="w-5 h-5" />,
      },
      {
        id: "exam",
        label: "Mulai CBT",
        route: "/exam",
        type: "primary",
        description: "Mulai mengerjakan soal Computer Based Test",
        icon: null,
      },
    ],
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      {/* Logout Button - Fixed Position */}
      <div className="fixed top-4 right-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
          <User className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {user?.name}
          </span>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="gap-2 rounded-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Card Utama */}
      <div className="w-full max-w-2xl p-6 bg-blue-100 border border-blue-200 shadow-sm rounded-3xl md:p-8">
        {/* Inner Card */}
        <div className="p-6 border border-blue-400 bg-blue-80 rounded-2xl md:p-8 ">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-200 rounded-full">
              <FileText className="w-8 h-8 text-primary-orange" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="mb-2 text-2xl font-bold text-center text-gray-900">
            {landingPage.title}
          </h1>
          <p className="text-sm text-center text-gray-600">
            {landingPage.subtitle}
          </p>

          {/* Tombol Navigasi */}
          <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
            {navigation.buttons.map((button) => (
              <Link href={button.route} className="flex-1" key={button.id}>
                <Button
                  className={`w-full rounded-full py-4 px-6 text-base font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 ${
                    button.type === "outline"
                      ? "bg-orange-100 text-orange-600 border-2  hover:bg-orange-200"
                      : "bg-primary-orange hover:bg-primary-orange/80 text-white border-0"
                  }`}
                >
                  {/* Jika button.id === 'history', icon di kanan */}
                  {button.id === "history" ? (
                    <>
                      <span>{button.label}</span>
                      {button.icon}
                    </>
                  ) : (
                    <>
                      {button.icon}
                      <span>{button.label}</span>
                    </>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ProtectedRoute>
      <LandingPageContent />
    </ProtectedRoute>
  );
}
