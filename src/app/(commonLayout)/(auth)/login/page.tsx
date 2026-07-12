import LoginForm from "@/components/login-form";
import type { Metadata } from "next";
import Image from "next/image";
import loginPhoto from "../../../../assets/login/loginPhoto.webp";

export const metadata: Metadata = {
  title: "Sign in — WorkSite Manager",
  description: "Sign in to manage your workers, sites, attendance and payments.",
};

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to pick up where you left off.
            </p>
          </div>

          <LoginForm redirect={params?.redirect} />
        </div>
      </div>

      {/* Decorative only — hidden on small screens rather than squeezed above the form.
          `dark` so the caption sits on the same steel band the rest of the site uses. */}
      <div className="dark relative hidden border-l bg-background text-foreground lg:block">
        <Image src={loginPhoto} alt="" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <blockquote className="max-w-md space-y-3">
            <p className="text-2xl font-medium leading-snug text-balance">
              “Mark the day on site, and the wage follows automatically.”
            </p>
            <footer className="text-sm text-muted-foreground">
              Attendance, payroll and payments — one system.
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;