import { Link } from "@tanstack/react-router";
import { Droplets, Mail, MapPin, Phone } from "lucide-react";
import { useStore } from "@/lib/store";

export function Footer() {
  const { content } = useStore();

  return (
    <footer className="mt-24 bg-navy text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-aqua)]">
              <Droplets className="h-5 w-5" />
            </span>
            <span className="font-display text-xl">CASPRI</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            {content.tagline}.
          </p>
        </div>

        <nav aria-label="Shop" className="text-sm">
          <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-primary-foreground/60">Shop</h2>
          <ul className="space-y-2.5 text-primary-foreground/80">
            <li><Link to="/shop" className="hover:text-aqua">All products</Link></li>
            <li><Link to="/shop" search={{ category: "Multipacks" }} className="hover:text-aqua">Multipacks</Link></li>
            <li><Link to="/shop" search={{ category: "Bulk" }} className="hover:text-aqua">Bulk orders</Link></li>
            <li><Link to="/cart" className="hover:text-aqua">Cart</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company" className="text-sm">
          <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-primary-foreground/60">Company</h2>
          <ul className="space-y-2.5 text-primary-foreground/80">
            <li><Link to="/our-water" className="hover:text-aqua">Our Water</Link></li>
            <li><Link to="/about" className="hover:text-aqua">About Us</Link></li>
            <li><Link to="/sustainability" className="hover:text-aqua">Sustainability</Link></li>
            <li><Link to="/contact" className="hover:text-aqua">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-aqua">Admin</Link></li>
          </ul>
        </nav>

        <address className="space-y-3 text-sm not-italic text-primary-foreground/80">
          <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-primary-foreground/60">Contact</h2>
          <p className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />{content.email}</p>
          <p className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />{content.phone}</p>
          <p className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />{content.address}</p>
        </address>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {content.brandName}. All rights reserved.</p>
          <p>Business details and claims on this site are editable and pending company verification.</p>
        </div>
      </div>
    </footer>
  );
}
