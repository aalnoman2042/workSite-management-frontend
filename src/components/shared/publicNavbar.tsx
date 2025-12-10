import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { getCookie } from "@/services/auth/tokenHandler";
import LogoutButton from "./loginButton";
import logo from "../../assets/logo/brandLogo.png";
import Image from "next/image";

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/sites", label: "Sites" },
    { href: "/workers", label: "Workers" },
    { href: "/attendance", label: "Attendance" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="WorkSite Manager Logo" className="h-10 w-10 bg-transparent" />
          {/* <span className="text-xl font-bold text-white">WorkSite Manager</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login/Logout */}
        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-6">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-white text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-4 bg-black text-white">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-white/80 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Login / Logout */}
                <div className="border-t border-white/10 pt-4 flex flex-col space-y-4">
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login">
                      <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-lg">
                        Login
                      </Button>
                    </Link>
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
