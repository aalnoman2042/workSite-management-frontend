"use client";

import { logoutUser } from "@/services/auth/logout";
import { Button } from "../ui/button";

// The variant is overridable so the public navbar can use a quieter outline button — a
// destructive red Logout sitting in the marketing header is louder than it needs to be —
// while the dashboard dropdown keeps the default.
const LogoutButton = ({
  variant = "destructive",
  className,
}: {
  variant?: "default" | "destructive" | "outline" | "ghost" | "secondary";
  className?: string;
}) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <Button variant={variant} className={className} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
