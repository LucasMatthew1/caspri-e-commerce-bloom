import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Droplets, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/our-water", label: "Our Water" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cartCount } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/shop", search: { q: query || undefined } });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "surface-glass shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Caspri home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-aqua)] text-primary-foreground">
            <Droplets className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-tight">CASPRI</span>
            <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              Natural Spring Water
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/60 hover:text-foreground"
              activeProps={{ className: "text-ocean bg-accent/70" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-4.5 w-4.5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link to="/account">
              <User className="h-4.5 w-4.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label={`Cart, ${cartCount} items`} asChild>
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-navy px-1 text-[0.6rem] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="hero" className="ml-1 hidden md:inline-flex" asChild>
            <Link to="/shop">Shop Water</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col gap-2 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-2xl">Caspri</span>
                  <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-2xl px-4 py-3.5 text-lg transition-colors hover:bg-accent/60"
                    activeProps={{ className: "bg-accent/70 text-ocean" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-auto grid gap-2">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/shop">Shop Water</Link>
                  </Button>
                  <Button variant="outlineSoft" size="xl" asChild>
                    <Link to="/cart">View cart ({cartCount})</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/60 bg-card/95 backdrop-blur">
          <form onSubmit={submitSearch} className="container-page flex items-center gap-3 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bottles, packs and sizes…"
              aria-label="Search products"
              className="h-10 flex-1 bg-transparent text-sm outline-none"
            />
            <Button type="submit" variant="ocean" size="sm">
              Search
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
