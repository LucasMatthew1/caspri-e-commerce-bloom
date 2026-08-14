import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { QuantityInput } from "@/components/site/QuantityInput";
import { Stars } from "@/components/site/Stars";
import { averageRating, formatPrice, priceOf, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function QuickView({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);

  useEffect(() => setQty(1), [product?.id]);

  return (
    <Dialog open={Boolean(product)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl p-0">
        {product && (
          <div className="grid gap-0 md:grid-cols-2">
            <div className="bg-[image:var(--gradient-crystal)] p-6">
              <img
                src={product.images[0]}
                alt={`${product.name} — ${product.size}`}
                width={1200}
                height={1200}
                loading="lazy"
                className="mx-auto aspect-square w-full max-w-[320px] object-contain"
              />
            </div>
            <div className="flex flex-col gap-4 p-7">
              <span className="eyebrow">{product.size}</span>
              <DialogTitle className="text-2xl leading-snug">{product.name}</DialogTitle>
              <Stars rating={averageRating(product)} count={product.reviews.length} />
              <DialogDescription className="text-sm leading-relaxed">
                {product.description}
              </DialogDescription>
              <p className="text-2xl font-semibold">{formatPrice(priceOf(product))}</p>
              <div className="flex items-center gap-3">
                <QuantityInput value={qty} onChange={setQty} />
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => {
                    addToCart(product.id, qty);
                    toast.success(`${product.name} added to cart`);
                    onOpenChange(false);
                  }}
                >
                  Add to cart
                </Button>
              </div>
              <Button variant="outlineSoft" asChild>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  onClick={() => onOpenChange(false)}
                >
                  View full details
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
