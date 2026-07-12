import PublicFooter from "@/components/shared/publicFooter";
import PublicNavbar from "@/components/shared/publicNavbar";

// The navbar reads the auth cookie to decide between "Sign in / Get started" and
// "Dashboard / Logout", so these pages cannot be prerendered. They were already dynamic for
// the same reason; saying so explicitly stops Next attempting a static pass and logging a
// DynamicServerError that getUserInfo's try/catch swallows.
export const dynamic = "force-dynamic";

// The public site and the dashboard now share one theme. The shell is light, matching the
// app, and darkness is used deliberately as bands — the hero, the CTA and the footer each
// carry the `dark` class, which flips the tokens for that section only. Nothing hardcodes a
// colour, so the whole site is one system rather than a marketing page bolted onto an app.
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default CommonLayout;
