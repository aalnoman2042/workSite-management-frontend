import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo/brandLogo.png";

// The old footer linked to /features, /pricing, /payroll, /attendance, /workers and /sites.
// None of those routes exist, so every link 404'd. These all go somewhere real.
const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#roles", label: "Roles" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "mailto:support@worksitemanager.com", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/register", label: "Create an account" },
    ],
  },
];

function PublicFooter() {
  return (
    // `dark` flips the tokens for the footer only — it closes the page on the same steel band
    // the hero opens with. The old footer used light tokens and rendered white under a dark
    // page, which was the most obvious sign the site was not one design.
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src={logo} alt="WorkSite Manager" className="h-8 w-8" />
              <span className="text-sm font-semibold tracking-tight">WorkSite Manager</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Workers, sites, attendance and payments in one place — built for the people who
              actually run construction sites.
            </p>
            <p className="text-sm text-muted-foreground">
              Dhaka, Bangladesh
              <br />
              support@worksitemanager.com
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WorkSite Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;