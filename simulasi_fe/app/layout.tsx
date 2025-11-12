import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ReduxProvider } from "@/lib/redux/provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Simulasi CBT - Computer Based Test",
  description: "Platform ujian berbasis komputer untuk siswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
