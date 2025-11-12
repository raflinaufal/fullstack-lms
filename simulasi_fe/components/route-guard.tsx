"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Loader2 } from "lucide-react";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register"];

// Routes that require admin access
const ADMIN_ROUTES = ["/admin"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isPublicRoute = PUBLIC_ROUTES.some((route) =>
        pathname?.startsWith(route)
      );
      const isAdminRoute = ADMIN_ROUTES.some((route) =>
        pathname?.startsWith(route)
      );

      // If not authenticated and not on public route, redirect to login
      if (!isAuthenticated && !isPublicRoute) {
        router.push("/login");
        return;
      }

      // If authenticated
      if (isAuthenticated && user) {
        // Admin trying to access non-admin routes (except login/register)
        if (user.is_admin && !isAdminRoute && !isPublicRoute) {
          router.push("/admin");
          return;
        }

        // Non-admin trying to access admin routes
        if (!user.is_admin && isAdminRoute) {
          router.push("/");
          return;
        }

        // Already logged in trying to access login/register
        if (isPublicRoute) {
          if (user.is_admin) {
            router.push("/admin");
          } else {
            router.push("/");
          }
          return;
        }
      }

      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, pathname, router]);

  // Show loading during authentication check
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4">
            <Loader2 className="w-full h-full text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
