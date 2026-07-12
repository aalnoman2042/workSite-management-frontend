import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { LayoutDashboard, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo/brandLogo.png";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./loginButton";

// These used to point at /sites, /workers, /attendance and /contact — none of which exist as
// public routes, so every link in the header 404'd. They now go to real destinations.
const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#roles", label: "Roles" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

const PublicNavbar = async () => {
  // getUserInfo verifies the token rather than just checking that a cookie exists, so an
  // expired or tampered token falls back to the signed-out state instead of showing a
  // Dashboard button that would only bounce the visitor to /login.
  const userInfo = await getUserInfo();
  const dashboardHref = userInfo ? getDefaultDashboardRoute(userInfo.role) : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logo} alt="WorkSite Manager" className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-tight">WorkSite Manager</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {dashboardHref ? (
            <>
              <Button asChild size="sm" className="group">
                <Link href={dashboardHref}>
                  <LayoutDashboard className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Dashboard
                </Link>
              </Button>
              <LogoutButton variant="outline" />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  {dashboardHref ? (
                    <>
                      <p className="px-3 pb-1 text-sm text-muted-foreground">
                        Signed in as{" "}
                        <span className="font-medium text-foreground">{userInfo?.name}</span>
                      </p>
                      <Button asChild className="w-full">
                        <Link href={dashboardHref}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <LogoutButton variant="outline" className="w-full" />
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/register">Get started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;