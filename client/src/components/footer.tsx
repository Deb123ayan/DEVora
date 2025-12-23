import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container px-6 mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold font-display tracking-tighter hover:text-primary transition-colors mb-4 block"
            >
              DEVora<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Empowering innovators with cutting-edge digital solutions. We
              build the future, one pixel at a time.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">
                Web Development
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Mobile Apps
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                UI/UX Design
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                AI Solutions
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">
                DEVora
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Freelancing
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Projects and Enterprises
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Contact
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 DEVora Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
