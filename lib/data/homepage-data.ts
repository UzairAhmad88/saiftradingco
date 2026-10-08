import type { GemstoneWithDetails } from "@/types/gemstone";

export interface SpecializationItem {
  number: string;
  name: string;
  slug: string;
  mineralGroup: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

export interface EducationPreviewItem {
  category: string;
  title: string;
  slug: string;
  summary: string;
  readingTime: string;
}

export interface TrustItem {
  title: string;
  description: string;
  detail: string;
}

export const HERO_CONTENT = {
  eyebrow: "Rough Gemstone Supplier · Hong Kong",
  headline: "Selected Rough Tourmaline, Kunzite & Morganite",
  subheadline:
    "Supplying natural rough gemstone crystals and mineral specimens with verified physical specifications for lapidaries, collectors, and gemstone professionals worldwide.",
  primaryCta: {
    label: "Explore Collections",
    href: "/collections",
  },
  secondaryCta: {
    label: "Make an Inquiry",
    href: "/contact",
  },
  image: {
    src: "/images/gemstones/hero-tourmaline.jpg",
    alt: "Natural rough green Tourmaline crystal specimen with fine vertical striations and natural terminations",
  },
};

export const INTRO_CONTENT = {
  eyebrow: "About Saif Trading Co",
  headline: "Rough Gemstones, Selected with Mineral Purpose.",
  leadParagraph:
    "Based in Hung Hom, Kowloon, Saif Trading Co operates as a specialized supplier of rough crystalline gemstones. We concentrate our procurement and trade on three distinctive natural varieties: Tourmaline, Kunzite, and Morganite.",
  bodyParagraph:
    "Every rough specimen in our portfolio is catalogued with accurate physical dimensions, carat weight, crystal habit, and available independent gemological testing reports. We prioritize transparent trade communication and direct specimen review for international buyers.",
  locationBadge: "Focal Industrial Centre, Hung Hom, Hong Kong",
};

export const SPECIALIZATIONS_DATA: SpecializationItem[] = [
  {
    number: "01",
    name: "Tourmaline",
    slug: "tourmaline",
    mineralGroup: "Elbaite / Cyclosilicate",
    description:
      "Natural rough Tourmaline crystals exhibiting vertical prism striations, rich green hues, and intact pyramid terminations.",
    imageUrl: "/images/gemstones/tourmaline-specimen.jpg",
    characteristics: ["Distinctive Prism Form", "Vivid Green & Bi-Color", "Vitreous Luster"],
  },
  {
    number: "02",
    name: "Kunzite",
    slug: "kunzite",
    mineralGroup: "Spodumene / Inosilicate",
    description:
      "Select rough Kunzite crystals featuring delicate lilac-pink coloration, strong pleochroism, and natural longitudinal etchings.",
    imageUrl: "/images/gemstones/kunzite-specimen.jpg",
    characteristics: ["Lilac & Soft Rose Tones", "Glassy Transparency", "Natural Cleavage Habit"],
  },
  {
    number: "03",
    name: "Morganite",
    slug: "morganite",
    mineralGroup: "Beryl / Cyclosilicate",
    description:
      "Hexagonal rough Morganite crystals characterized by delicate peach-pink tones, gemmy clarity, and robust crystal terminations.",
    imageUrl: "/images/gemstones/morganite-specimen.jpg",
    characteristics: ["Warm Peach & Rose Hue", "Hexagonal Crystal Structure", "Gem-Grade Clarity"],
  },
];

// Structured demonstration specimens conforming strictly to the Gemstone data model.
// These mock objects can be seamlessly replaced with Supabase queries in Phase 09.
export const FEATURED_GEMSTONES_DATA: GemstoneWithDetails[] = [
  {
    id: "demo-tourmaline-01",
    name: "Rough Green Tourmaline Crystal",
    slug: "rough-green-tourmaline-crystal",
    sku: "STC-TRM-01",
    short_description:
      "High-grade natural green elbaite tourmaline rough crystal showing fine striations and pristine natural termination.",
    description:
      "Selected natural rough green tourmaline crystal specimen from Saif Trading Co in Hong Kong. Features exceptional vitreous luster and vertical striations.",
    carat_weight: 48.6,
    dimensions: "34 x 18 x 14 mm",
    color: "Vibrant Forest Green",
    clarity: "Gemmy / Translucent",
    status: "available",
    featured: true,
    certificate_lab: "Gem Testing Lab",
    origin: "Selected Specimen",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: "cat-tourmaline",
      name: "Tourmaline",
      slug: "tourmaline",
      created_at: new Date().toISOString(),
    },
    images: [
      {
        id: "img-01",
        gemstone_id: "demo-tourmaline-01",
        image_url: "/images/gemstones/tourmaline-specimen.jpg",
        alt_text: "Rough natural green tourmaline crystal specimen with fine striations",
        sort_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "demo-kunzite-01",
    name: "Lilac Kunzite Spodumene Specimen",
    slug: "lilac-kunzite-spodumene-specimen",
    sku: "STC-KNZ-01",
    short_description:
      "Sublime rough lilac-pink spodumene crystal with strong pleochroism and natural striated prism faces.",
    description:
      "Selected rough kunzite crystal specimen showing classic spodumene crystal formation and delicate violet-pink coloration.",
    carat_weight: 124.5,
    dimensions: "52 x 28 x 16 mm",
    color: "Lilac Pink",
    clarity: "Vitreous / Transparent",
    status: "available",
    featured: true,
    origin: "Selected Specimen",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: "cat-kunzite",
      name: "Kunzite",
      slug: "kunzite",
      created_at: new Date().toISOString(),
    },
    images: [
      {
        id: "img-02",
        gemstone_id: "demo-kunzite-01",
        image_url: "/images/gemstones/kunzite-specimen.jpg",
        alt_text: "Rough lilac-pink kunzite crystal specimen on pure dark background",
        sort_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "demo-morganite-01",
    name: "Peach Morganite Beryl Crystal",
    slug: "peach-morganite-beryl-crystal",
    sku: "STC-MRG-01",
    short_description:
      "Naturally formed hexagonal morganite beryl rough specimen with warm peach-pink body color and gemmy transparency.",
    description:
      "High-grade rough morganite crystal exhibiting intact hexagonal prism habit and soft peach hue.",
    carat_weight: 86.2,
    dimensions: "41 x 32 x 22 mm",
    color: "Soft Peach Pink",
    clarity: "Gemmy Translucent",
    status: "available",
    featured: true,
    certificate_lab: "Lab Verified",
    origin: "Selected Specimen",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: "cat-morganite",
      name: "Morganite",
      slug: "morganite",
      created_at: new Date().toISOString(),
    },
    images: [
      {
        id: "img-03",
        gemstone_id: "demo-morganite-01",
        image_url: "/images/gemstones/morganite-specimen.jpg",
        alt_text: "Rough peach morganite beryl crystal specimen",
        sort_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
];

export const EDITORIAL_STORY_CONTENT = {
  eyebrow: "Mineral Philosophy",
  title: "The Raw Geometry of Nature",
  quote:
    "Before a gemstone is cut or faceted, its true geological story lives in its natural crystalline geometry.",
  paragraph1:
    "Natural rough crystals possess an authentic character that can never be replicated. In Tourmaline, vertical striations and trigonal terminations record millions of years of mineral development deep within pegmatitic pockets.",
  paragraph2:
    "At Saif Trading Co, we treat every rough specimen as a singular natural artwork. Whether intended for master lapidary faceting or fine mineral specimen collection, we preserve the integrity of the natural crystal form.",
  ctaText: "Explore Tourmaline Crystals",
  ctaHref: "/collections/tourmaline",
  image: {
    src: "/images/gemstones/hero-tourmaline.jpg",
    alt: "High-contrast natural green tourmaline crystal showing distinct vertical crystalline structure",
  },
};

export const TRUST_POINTS_DATA: TrustItem[] = [
  {
    title: "Accurate Specifications",
    description:
      "Every gemstone listing includes verifiable measurements, carat weights, and detailed crystalline habit notes.",
    detail: "Zero inflated grading or exaggerated descriptions.",
  },
  {
    title: "Independent Documentation",
    description:
      "Where specimens have received independent testing, issuing gemological laboratory reports are catalogued openly.",
    detail: "Transparent report numbers and verification records.",
  },
  {
    title: "Registered Hong Kong Presence",
    description:
      "Operating from the Focal Industrial Centre in Hung Hom, Kowloon, providing a stable, verifiable commercial base.",
    detail: "Direct trade communication with company principals.",
  },
  {
    title: "Dedicated Mineral Focus",
    description:
      "Concentrating our procurement on Tourmaline, Kunzite, and Morganite rather than generalist trading.",
    detail: "Deep product familiarity in our three core mineral families.",
  },
];

export const EDUCATION_ARTICLES_DATA: EducationPreviewItem[] = [
  {
    category: "Tourmaline",
    title: "Tourmaline Crystal Morphology & Optical Properties",
    slug: "tourmaline-guide",
    summary:
      "A technical examination of tourmaline crystal forms, dichroism, and the factors that influence color vibrancy in natural rough crystals.",
    readingTime: "5 min read",
  },
  {
    category: "Kunzite",
    title: "Kunzite Mineral Profile: Structure & Pleochroism",
    slug: "kunzite-guide",
    summary:
      "Understanding spodumene crystalline behavior, two-direction cleavage considerations, and proper light orientation for rough Kunzite.",
    readingTime: "4 min read",
  },
  {
    category: "Morganite",
    title: "Morganite Beryl: Crystalline Habit & Lapidary Selection",
    slug: "morganite-guide",
    summary:
      "An overview of pink beryl crystal formation, manganese chromophores, and assessing rough specimen suitability.",
    readingTime: "4 min read",
  },
];

export const INQUIRY_CTA_CONTENT = {
  eyebrow: "Trade Correspondence",
  title: "Looking for a Specific Rough Gemstone?",
  description:
    "Whether you are seeking specific carat weights, crystal terminations, or color grades in Tourmaline, Kunzite, or Morganite, contact our Hong Kong office to discuss current availability.",
  ctaLabel: "Make an Inquiry",
  ctaHref: "/contact",
  phone: "+852 3525 1640",
  email: "Saiftradingco@yahoo.com",
};
