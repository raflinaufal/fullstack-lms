"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to prevent hydration mismatch
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        // Jika user adalah admin, redirect ke /admin
        if (user?.is_admin) {
          router.push("/admin");
        } else {
          setIsChecking(false);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4">
            <Loader2 className="w-full h-full text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to prevent hydration mismatch
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!user?.is_admin) {
        // Jika bukan admin, redirect ke landing page user
        router.push("/");
      } else {
        setIsChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || isChecking || !user?.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4">
            <Loader2 className="w-full h-full text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
