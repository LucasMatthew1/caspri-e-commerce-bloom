import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  count,
  className,
}: {
  rating: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i <= Math.round(rating)
                ? "fill-aqua text-aqua"
                : "text-muted-foreground/40",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating ? rating.toFixed(1) : "New"}
        {count !== undefined && count > 0 ? ` (${count})` : ""}
      </span>
      <span className="sr-only">
        {rating ? `Rated ${rating.toFixed(1)} out of 5` : "No reviews yet"}
      </span>
    </div>
  );
}
