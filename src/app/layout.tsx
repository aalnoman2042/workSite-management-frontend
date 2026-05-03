import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LogoutSuccessToast from "@/components/shared/logoutSuccessToast";
import LoginSuccessToast from "@/components/shared/loginSuccessToast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "worksite manager",
  description: "A worksite management application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster  position="top-right" richColors></Toaster>
        <Suspense fallback={null}>
          <LogoutSuccessToast></LogoutSuccessToast>
        </Suspense>
        <Suspense fallback={null}>
          <LoginSuccessToast></LoginSuccessToast>
        </Suspense>
      </body>
    </html>
  );
}
