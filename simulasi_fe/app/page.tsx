"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/authSlice";
import { useLogoutMutation } from "@/lib/redux/api/authApi";
import { useGetClassesQuery } from "@/lib/redux/api/examsApi";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/protected-route";

function LandingPageContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const { data: classesData, isLoading } = useGetClassesQuery();

  // Extract classes array and get first class for landing page
  const classes = Array.isArray(classesData) ? classesData : [];
  const firstClass = classes[0];

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
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
      {/* Header User + Logout */}
      <div className="fixed flex items-center gap-3 top-4 right-4">
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
      <div className="w-full max-w-md p-6 bg-blue-100 border border-blue-200 shadow-sm rounded-3xl md:p-8">
        {/* Inner Card */}
        <div className="p-6 border border-blue-400 bg-blue-80 rounded-2xl md:p-8">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-200 rounded-full">
              <FileText className="w-8 h-8 text-primary-orange" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="mb-2 font-bold text-center text-gray-900 md:text-2xl">
            {isLoading ? "Loading..." : firstClass?.title || "Simulasi CBT"}
          </h1>
          <p className="text-[10px] gray-600 text-center md:text-sm">
            {isLoading
              ? "Memuat data..."
              : firstClass?.subtitle || "Computer Based Test"}
          </p>

          {/* Tombol Navigasi */}
          <div className="flex flex-row justify-center gap-4 mt-8 flex-nowrap">
            {navigation.buttons.map((button) => (
              <Link href={button.route} key={button.id}>
                <Button
                  className={`rounded-full md:py-4 md:px-6 text-sm md:text-base font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 ${
                    button.type === "outline"
                      ? "bg-orange-100 text-orange-600 border-2 hover:bg-orange-200"
                      : "bg-primary-orange hover:bg-primary-orange/80 text-white border-0"
                  }`}
                >
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
