import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CONTENT,
  DEFAULT_PRODUCTS,
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  SHIPPING_METHODS,
  priceOf,
  type Product,
  type SiteContent,
} from "./catalog";

/**
 * Client-side data layer for the storefront.
 *
 * Everything the business can edit (products, site content) and everything the
 * customer creates (cart, wishlist, orders) flows through this single store and
 * is persisted to localStorage. Swapping localStorage for a hosted database
 * later only requires changing the read/write helpers below.
 */

export type CartLine = { productId: string; qty: number };

export type Order = {
  id: string;
  number: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    billing: string;
    shipping: string;
  };
  items: { productId: string; name: string; size: string; qty: number; unitPrice: number }[];
  shippingMethod: string;
  shippingEta: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promo?: string;
  paymentStatus: "pending" | "paid" | "refunded";
  fulfillmentStatus: "unfulfilled" | "processing" | "shipped" | "delivered";
};

type StoreValue = {
  ready: boolean;
  products: Product[];
  content: SiteContent;
  orders: Order[];
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveContent: (content: SiteContent) => void;
  placeOrder: (order: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  getProduct: (idOrSlug: string) => Product | undefined;
};

const StoreContext = createContext<StoreValue | null>(null);

const KEYS = {
  products: "caspri.products.v1",
  content: "caspri.content.v1",
  cart: "caspri.cart.v1",
  wishlist: "caspri.wishlist.v1",
  orders: "caspri.orders.v1",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Hydrate after mount so server and client render the same first paint.
  useEffect(() => {
    setProducts(read(KEYS.products, DEFAULT_PRODUCTS));
    setContent({ ...DEFAULT_CONTENT, ...read(KEYS.content, DEFAULT_CONTENT) });
    setCart(read<CartLine[]>(KEYS.cart, []));
    setWishlist(read<string[]>(KEYS.wishlist, []));
    setOrders(read<Order[]>(KEYS.orders, []));
    setReady(true);
  }, []);

  const persistCart = useCallback((next: CartLine[]) => {
    setCart(next);
    write(KEYS.cart, next);
  }, []);

  const addToCart = useCallback(
    (productId: string, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.productId === productId);
        const next = existing
          ? prev.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
          : [...prev, { productId, qty }];
        write(KEYS.cart, next);
        return next;
      });
    },
    [],
  );

  const setQty = useCallback((productId: string, qty: number) => {
    setCart((prev) => {
      const next =
        qty <= 0
          ? prev.filter((l) => l.productId !== productId)
          : prev.map((l) => (l.productId === productId ? { ...l, qty } : l));
      write(KEYS.cart, next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => setQty(productId, 0), [setQty]);
  const clearCart = useCallback(() => persistCart([]), [persistCart]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      write(KEYS.wishlist, next);
      return next;
    });
  }, []);

  const saveProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists ? prev.map((p) => (p.id === product.id ? product : p)) : [product, ...prev];
      write(KEYS.products, next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      write(KEYS.products, next);
      return next;
    });
  }, []);

  const saveContent = useCallback((next: SiteContent) => {
    setContent(next);
    write(KEYS.content, next);
  }, []);

  const placeOrder = useCallback((order: Order) => {
    setOrders((prev) => {
      const next = [order, ...prev];
      write(KEYS.orders, next);
      return next;
    });
  }, []);

  const updateOrder = useCallback((id: string, patch: Partial<Order>) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, ...patch } : o));
      write(KEYS.orders, next);
      return next;
    });
  }, []);

  const getProduct = useCallback(
    (idOrSlug: string) => products.find((p) => p.id === idOrSlug || p.slug === idOrSlug),
    [products],
  );

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const subtotal = useMemo(
    () =>
      cart.reduce((sum, line) => {
        const product = products.find((p) => p.id === line.productId);
        return product ? sum + priceOf(product) * line.qty : sum;
      }, 0),
    [cart, products],
  );

  const value: StoreValue = {
    ready,
    products,
    content,
    orders,
    cart,
    wishlist,
    cartCount,
    subtotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    saveProduct,
    deleteProduct,
    saveContent,
    placeOrder,
    updateOrder,
    getProduct,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function estimateShipping(subtotal: number, methodId = "standard") {
  const method = SHIPPING_METHODS.find((m) => m.id === methodId) ?? SHIPPING_METHODS[0];
  if (method.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) {
    return { ...method, price: 0 };
  }
  return method;
}

export function applyPromo(code: string, subtotal: number) {
  const promo = PROMO_CODES.find((p) => p.code.toLowerCase() === code.trim().toLowerCase());
  if (!promo) return { valid: false as const, discount: 0, promo: null };
  if (promo.code === "FRESH5" && subtotal < 40) return { valid: false as const, discount: 0, promo: null };
  const discount = promo.type === "percent" ? (subtotal * promo.value) / 100 : promo.value;
  return { valid: true as const, discount: Math.min(discount, subtotal), promo };
}

export function makeOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `CSP-${stamp}${rand}`;
}
