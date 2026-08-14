import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/site/QuantityInput";
import { Stars } from "@/components/site/Stars";
import { averageRating, formatPrice, priceOf, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
}) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const saved = wishlist.includes(product.id);
  const onSale = product.salePrice !== undefined;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float">
      <div className="relative overflow-hidden bg-[image:var(--gradient-crystal)]">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <img
            src={product.images[0]}
            alt={`${product.name} — ${product.size}`}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="mx-auto aspect-square w-full max-w-[320px] object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {onSale && (
            <span className="rounded-full bg-navy px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-primary-foreground">
              Sale
            </span>
          )}
          {product.bestSeller && (
            <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent-foreground">
              Best seller
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
          <Button
            variant="glass"
            size="icon"
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            onClick={() => {
              toggleWishlist(product.id);
              toast(saved ? "Removed from wishlist" : "Saved to wishlist");
            }}
          >
            <Heart className={cn("h-4 w-4", saved && "fill-current text-ocean")} />
          </Button>
          <Button
            variant="glass"
            size="icon"
            aria-label={`Quick view ${product.name}`}
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow">{product.size}</span>
          <Stars rating={averageRating(product)} count={product.reviews.length} />
        </div>

        <h3 className="text-xl leading-snug">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="transition-colors hover:text-ocean"
          >
            {product.name}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{formatPrice(priceOf(product))}</span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <QuantityInput value={qty} onChange={setQty} />
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            variant="hero"
            className="flex-1"
            onClick={() => {
              addToCart(product.id, qty);
              toast.success(`${product.name} added to cart`);
            }}
            disabled={product.inventory <= 0}
          >
            <ShoppingBag className="h-4 w-4" />
            {product.inventory > 0 ? "Add to cart" : "Out of stock"}
          </Button>
          <Button variant="outlineSoft" onClick={() => onQuickView(product)}>
            Quick view
          </Button>
        </div>
      </div>
    </article>
  );
}
