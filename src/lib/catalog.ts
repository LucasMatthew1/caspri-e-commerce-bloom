import pSingle from "@/assets/p-single.jpg.asset.json";
import p6 from "@/assets/p-6.jpg.asset.json";
import p12 from "@/assets/p-12.jpg.asset.json";
import p24 from "@/assets/p-24.jpg.asset.json";
import pGlass from "@/assets/p-glass.jpg.asset.json";
import bottleA from "@/assets/bottle-a.png.asset.json";
import bottleB from "@/assets/bottle-b.png.asset.json";

export const IMAGES = {
  single: pSingle.url,
  six: p6.url,
  twelve: p12.url,
  twentyFour: p24.url,
  glass: pGlass.url,
  designSport: bottleA.url,
  designSlim: bottleB.url,
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string;
  size: string;
  sizeMl: number;
  price: number;
  salePrice?: number;
  inventory: number;
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
  shortDescription: string;
  description: string;
  images: string[];
  specs: { label: string; value: string }[];
  reviews: Review[];
};

export const CATEGORIES = ["Single Bottles", "Multipacks", "Bulk", "Glass Collection"] as const;

const EDITABLE = "Editable in the admin area — replace with verified company information.";

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "casp-500-1",
    slug: "caspri-natural-spring-water-single-bottle",
    name: "Caspri Natural Spring Water – Single Bottle",
    sku: "CSP-500-01",
    category: "Single Bottles",
    size: "500 ml",
    sizeMl: 500,
    price: 1.5,
    inventory: 480,
    featured: true,
    bestSeller: true,
    createdAt: "2026-01-12",
    shortDescription: "One 500 ml bottle of Caspri natural spring water — light, clean and refreshing.",
    description:
      "A single 500 ml bottle of Caspri natural spring water, bottled with care for everyday refreshment. The slim ribbed bottle fits cup holders, gym bags and desks, and the sport cap makes it easy to drink on the move.",
    images: [IMAGES.single, IMAGES.designSport, IMAGES.six],
    specs: [
      { label: "Volume", value: "500 ml" },
      { label: "Bottle", value: "Recyclable PET, sport cap" },
      { label: "Water type", value: "Natural spring water" },
      { label: "Serve", value: "Chilled or room temperature" },
    ],
    reviews: [
      {
        id: "r1",
        name: "Amara O.",
        rating: 5,
        title: "Crisp and clean",
        body: "Light taste and the bottle feels sturdy. My default desk water now.",
        date: "2026-05-02",
      },
      {
        id: "r2",
        name: "Daniel K.",
        rating: 4,
        title: "Great size",
        body: "Perfect for the gym. Would love a larger option too.",
        date: "2026-06-18",
      },
    ],
  },
  {
    id: "casp-500-6",
    slug: "caspri-natural-spring-water-6-pack",
    name: "Caspri Natural Spring Water – 6 Pack",
    sku: "CSP-500-06",
    category: "Multipacks",
    size: "6 × 500 ml",
    sizeMl: 500,
    price: 8.4,
    salePrice: 7.5,
    inventory: 220,
    featured: true,
    bestSeller: true,
    createdAt: "2026-02-04",
    shortDescription: "Six 500 ml bottles — the easy weekly pack for home, office or the car.",
    description:
      "Six bottles of Caspri natural spring water in a compact wrapped pack. Sized to keep the fridge stocked through the week without taking over the shelf.",
    images: [IMAGES.six, IMAGES.single, IMAGES.twelve],
    specs: [
      { label: "Contents", value: "6 × 500 ml bottles" },
      { label: "Pack", value: "Recyclable wrap" },
      { label: "Water type", value: "Natural spring water" },
      { label: "Storage", value: "Cool, dry place away from direct sunlight" },
    ],
    reviews: [
      {
        id: "r1",
        name: "Ife A.",
        rating: 5,
        title: "Good value",
        body: "Arrived well packed and every bottle was sealed properly.",
        date: "2026-06-01",
      },
    ],
  },
  {
    id: "casp-500-12",
    slug: "caspri-natural-spring-water-12-pack",
    name: "Caspri Natural Spring Water – 12 Pack",
    sku: "CSP-500-12",
    category: "Multipacks",
    size: "12 × 500 ml",
    sizeMl: 500,
    price: 15.9,
    inventory: 140,
    featured: true,
    bestSeller: false,
    createdAt: "2026-03-09",
    shortDescription: "A twelve bottle case for households, meetings and small events.",
    description:
      "Twelve 500 ml bottles in a printed carton that stacks neatly in a pantry or store room. A practical middle step between the weekly pack and full bulk ordering.",
    images: [IMAGES.twelve, IMAGES.six, IMAGES.single],
    specs: [
      { label: "Contents", value: "12 × 500 ml bottles" },
      { label: "Pack", value: "Printed carton" },
      { label: "Water type", value: "Natural spring water" },
      { label: "Best for", value: "Households and small offices" },
    ],
    reviews: [
      {
        id: "r1",
        name: "Grace N.",
        rating: 5,
        title: "Neat carton",
        body: "Easy to store and easy to carry. Reordering.",
        date: "2026-07-11",
      },
    ],
  },
  {
    id: "casp-500-24",
    slug: "caspri-natural-spring-water-24-pack",
    name: "Caspri Natural Spring Water – 24 Pack",
    sku: "CSP-500-24",
    category: "Bulk",
    size: "24 × 500 ml",
    sizeMl: 500,
    price: 29.5,
    salePrice: 26.9,
    inventory: 96,
    featured: true,
    bestSeller: true,
    createdAt: "2026-04-21",
    shortDescription: "Full tray of twenty four bottles — our best price per bottle.",
    description:
      "A wrapped tray of twenty four 500 ml bottles for offices, events, gyms and larger households. Ideal for standing orders and bulk requests.",
    images: [IMAGES.twentyFour, IMAGES.twelve, IMAGES.six],
    specs: [
      { label: "Contents", value: "24 × 500 ml bottles" },
      { label: "Pack", value: "Tray with transparent wrap" },
      { label: "Water type", value: "Natural spring water" },
      { label: "Best for", value: "Offices, events and bulk orders" },
    ],
    reviews: [
      {
        id: "r1",
        name: "Tunde B.",
        rating: 5,
        title: "Office favourite",
        body: "We order this monthly for the team. Delivery has been reliable.",
        date: "2026-07-29",
      },
      {
        id: "r2",
        name: "Sarah M.",
        rating: 4,
        title: "Heavy but worth it",
        body: "Best price per bottle. Bring a trolley.",
        date: "2026-08-02",
      },
    ],
  },
  {
    id: "casp-750-glass",
    slug: "caspri-still-spring-water-glass-750ml",
    name: "Caspri Still Spring Water – Glass 750 ml",
    sku: "CSP-750-GL",
    category: "Glass Collection",
    size: "750 ml",
    sizeMl: 750,
    price: 4.2,
    inventory: 60,
    featured: false,
    bestSeller: false,
    createdAt: "2026-05-30",
    shortDescription: "A table bottle in glass, designed for restaurants and hosting.",
    description:
      "Our glass table bottle presents Caspri natural spring water at dinner tables, in hotels and at events. Reusable, returnable and quietly elegant.",
    images: [IMAGES.glass, IMAGES.designSlim, IMAGES.single],
    specs: [
      { label: "Volume", value: "750 ml" },
      { label: "Bottle", value: "Glass with metal cap" },
      { label: "Water type", value: "Natural spring water, still" },
      { label: "Best for", value: "Hospitality and table service" },
    ],
    reviews: [],
  },
  {
    id: "casp-500-slim",
    slug: "caspri-signature-slim-bottle-500ml",
    name: "Caspri Signature Slim Bottle – 500 ml",
    sku: "CSP-500-SL",
    category: "Single Bottles",
    size: "500 ml",
    sizeMl: 500,
    price: 1.9,
    inventory: 300,
    featured: false,
    bestSeller: false,
    createdAt: "2026-06-07",
    shortDescription: "Our contoured signature bottle, shaped for a comfortable grip.",
    description:
      "The Caspri signature silhouette: a slim, curved 500 ml bottle developed from our own bottle engineering drawings. Same water, a more distinctive shape on the shelf.",
    images: [IMAGES.designSlim, IMAGES.single, IMAGES.designSport],
    specs: [
      { label: "Volume", value: "500 ml" },
      { label: "Bottle", value: "Contoured PET, screw cap" },
      { label: "Water type", value: "Natural spring water" },
      { label: "Design", value: "In-house Caspri bottle design" },
    ],
    reviews: [],
  },
];

export type SiteContent = {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSupporting: string;
  aboutHeadline: string;
  aboutBody: string;
  ourWaterIntro: string;
  sustainabilityIntro: string;
  contactIntro: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  steps: { title: string; body: string }[];
  sustainability: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const DEFAULT_CONTENT: SiteContent = {
  brandName: "Caspri Natural Spring Water Comp. LTD",
  tagline: "Bottled by Nature, Perfected by Innovation",
  heroHeadline: "Bottled by Nature. Perfected by Innovation.",
  heroSupporting:
    "Pure natural spring water, carefully bottled to bring the freshness of nature to every bottle.",
  aboutHeadline: "From Nature to Every Bottle.",
  aboutBody:
    "Caspri Natural Spring Water Comp. LTD is a natural spring water bottling company. We focus on one thing and do it carefully: collecting natural spring water and bottling it so it reaches you fresh, sealed and ready to drink. Our work is built on quality, modern bottling practice and the trust of the people who drink our water every day.",
  ourWaterIntro:
    "From the source to your hand, every stage of the Caspri journey is handled with care. Detailed source and process information will be published here once verified by the company.",
  sustainabilityIntro:
    "We believe a water company has a responsibility to the environment it draws from. Our approach focuses on responsible packaging, responsible sourcing and reducing waste across the business.",
  contactIntro:
    "Questions about products, bulk orders, delivery or partnerships? Send us a message and our team will get back to you.",
  email: "hello@caspriwater.com",
  phone: "+00 000 000 0000",
  address: "Head office address — add your verified business address here.",
  hours: "Monday to Friday, 9:00 – 17:00",
  steps: [
    {
      title: "Natural Source",
      body: `Caspri water begins at a natural spring. Specific source details will be published once confirmed by the company. ${EDITABLE}`,
    },
    {
      title: "Careful Collection",
      body: `Water is collected with care to protect the source and keep the water in good condition from the first moment. ${EDITABLE}`,
    },
    {
      title: "Quality & Processing",
      body: `Our quality approach is documented internally. Verified process and quality details will be added to this section. ${EDITABLE}`,
    },
    {
      title: "Bottling",
      body: `Water is bottled and sealed in our facility using modern bottling equipment and our own bottle designs. ${EDITABLE}`,
    },
    {
      title: "Delivered to Customers",
      body: `Sealed packs are prepared for delivery to homes, offices and retail partners. ${EDITABLE}`,
    },
  ],
  sustainability: [
    {
      title: "Responsible packaging",
      body: "We design bottles and packs with material use in mind and favour recyclable formats such as PET and glass.",
    },
    {
      title: "Responsible sourcing",
      body: "Water is a shared resource. We aim to draw responsibly and protect the environment around our source.",
    },
    {
      title: "Reducing waste",
      body: "We work to reduce packaging waste and production waste across bottling, storage and delivery.",
    },
    {
      title: "Sustainable practice",
      body: "Sustainability targets and measured results will be published here once verified. Editable content block.",
    },
  ],
  faqs: [
    {
      question: "What is Caspri Natural Spring Water?",
      answer:
        "Caspri Natural Spring Water is natural spring water collected and bottled by Caspri Natural Spring Water Comp. LTD for everyday drinking.",
    },
    {
      question: "What bottle sizes are available?",
      answer:
        "Our current range is listed on the Shop page, including 500 ml bottles in single, 6, 12 and 24 packs, plus a 750 ml glass table bottle. Sizes can be updated at any time.",
    },
    {
      question: "Where can I purchase Caspri water?",
      answer:
        "You can order directly from this website. Retail and distribution partners will be listed here as they are confirmed.",
    },
    {
      question: "Do you offer bulk orders?",
      answer:
        "Yes. Our 24 pack is built for bulk buying, and larger or recurring orders can be arranged through the contact form.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Delivery options and coverage areas are shown at checkout. For special delivery arrangements, please contact our team.",
    },
    {
      question: "How should the water be stored?",
      answer:
        "Store sealed bottles in a cool, dry place away from direct sunlight and strong odours. Once opened, keep refrigerated and drink within a few days.",
    },
  ],
};

export type PromoCode = { code: string; type: "percent" | "fixed"; value: number; label: string };

export const PROMO_CODES: PromoCode[] = [
  { code: "CASPRI10", type: "percent", value: 10, label: "10% off your order" },
  { code: "FRESH5", type: "fixed", value: 5, label: "$5 off orders over $40" },
];

export const SHIPPING_METHODS = [
  { id: "standard", name: "Standard delivery", eta: "3–5 business days", price: 4.99 },
  { id: "express", name: "Express delivery", eta: "1–2 business days", price: 9.99 },
  { id: "pickup", name: "Collect from depot", eta: "Ready in 24 hours", price: 0 },
];

export const FREE_SHIPPING_THRESHOLD = 50;

export const priceOf = (p: Product) => p.salePrice ?? p.price;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const averageRating = (p: Product) =>
  p.reviews.length ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length : 0;
