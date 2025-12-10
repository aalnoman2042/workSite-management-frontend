import Link from "next/link";

function PublicFooter() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h3 className="font-bold mb-2 text-foreground">WorkSite Manager</h3>
            <p className="text-sm text-muted-foreground">
              A modern platform to manage workers, attendance, payroll, and site operations — 
              all in one place.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* MODULES */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Modules</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/attendance" className="text-muted-foreground hover:text-foreground">
                  Attendance Tracking
                </Link>
              </li>
              <li>
                <Link href="/workers" className="text-muted-foreground hover:text-foreground">
                  Worker Management
                </Link>
              </li>
              <li>
                <Link href="/sites" className="text-muted-foreground hover:text-foreground">
                  Site Monitoring
                </Link>
              </li>
              <li>
                <Link href="/payroll" className="text-muted-foreground hover:text-foreground">
                  Payroll & Payments
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              WorkSite Manager HQ <br />
              Dhaka, Bangladesh <br />
              support@worksitemanager.com
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WorkSite Manager. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
