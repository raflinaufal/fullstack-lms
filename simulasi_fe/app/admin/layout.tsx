"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  HelpCircle,
  Users,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/lib/redux/api/authApi";
import { AdminProtectedRoute } from "@/components/protected-route";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: BookOpen, label: "Kelas", href: "/admin/classes" },
    { icon: FileQuestion, label: "Ujian", href: "/admin/exams" },
    { icon: HelpCircle, label: "Soal", href: "/admin/questions" },
    { icon: Users, label: "Pengguna", href: "/admin/users" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-600">{user?.name}</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 transition-colors hover:bg-primary hover:text-white"
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminProtectedRoute>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProtectedRoute>
  );
}
