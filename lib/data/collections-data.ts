import type { Category, GemstoneWithDetails } from "@/types/gemstone";

export interface CategoryDetail extends Category {
  mineralGroup: string;
  formula: string;
  crystalSystem: string;
  mohsHardness: string;
  specificGravity: string;
  heroImage: string;
  longDescription: string;
  specimenCount: number;
}

export interface GemstoneFilterOptions {
  search?: string;
  categorySlug?: string;
  status?: "all" | "available" | "sold";
  color?: string;
  caratRange?: "all" | "under-50" | "50-100" | "over-100";
  sort?: "featured" | "newest" | "carat-asc" | "carat-desc" | "name-asc" | "name-desc";
  page?: number;
  pageSize?: number;
}

export interface PaginatedGemstonesResult {
  gemstones: GemstoneWithDetails[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availableColors: string[];
}

export interface RelatedEducationGuide {
  title: string;
  slug: string;
  summary: string;
  readingTime: string;
}

// Category Definitions with Mineralogical Metadata
export const COLLECTIONS_DATA: CategoryDetail[] = [
  {
    id: "cat-tourmaline",
    name: "Tourmaline",
    slug: "tourmaline",
    description: "Selected natural rough Tourmaline crystals exhibiting vertical prism striations, vivid green hues, and intact pyramid terminations.",
    longDescription:
      "Natural rough Tourmaline crystals record millions of years of pegmatitic mineral crystallization. Characterized by vertical trigonal prism striations, rich color saturation, and glassy luster, our selected Tourmaline rough specimens are curated with exact physical dimensions for lapidaries and mineral collectors.",
    mineralGroup: "Elbaite / Cyclosilicate",
    formula: "Na(Li,Al)₃Al₆(BO₃)₃Si₆O₁₈(OH)₄",
    crystalSystem: "Trigonal",
    mohsHardness: "7.0 – 7.5",
    specificGravity: "3.06 – 3.20",
    image: "/images/gemstones/tourmaline-specimen.jpg",
    heroImage: "/images/gemstones/tourmaline-specimen.jpg",
    specimenCount: 4,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-kunzite",
    name: "Kunzite",
    slug: "kunzite",
    description: "Select rough Kunzite crystals featuring delicate lilac-pink coloration, prominent vertical striations, and strong pleochroism.",
    longDescription:
      "Kunzite is the lilac-to-pink variety of spodumene, recognized for its exceptional glassy transparency and strong two-direction cleavage. Our rough Kunzite specimens feature intact longitudinal prism etchings and natural color orientation suitable for discerning mineral collectors and specialty lapidary cutting.",
    mineralGroup: "Spodumene / Inosilicate",
    formula: "LiAl(SiO₃)₂",
    crystalSystem: "Monoclinic",
    mohsHardness: "6.5 – 7.0",
    specificGravity: "3.17 – 3.20",
    image: "/images/gemstones/kunzite-specimen.jpg",
    heroImage: "/images/gemstones/kunzite-specimen.jpg",
    specimenCount: 4,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-morganite",
    name: "Morganite",
    slug: "morganite",
    description: "Hexagonal rough Morganite crystals characterized by delicate peach-pink tones, gemmy clarity, and robust crystal terminations.",
    longDescription:
      "Morganite is the manganese-bearing pink variety of the beryl mineral family. Developing in granitic pegmatites, natural rough Morganite crystals exhibit distinctive hexagonal prism symmetry, high transparency, and vitreous luster. Every specimen is documented with precise carat weight and natural crystal habits.",
    mineralGroup: "Beryl / Cyclosilicate",
    formula: "Be₃Al₂(SiO₃)₆",
    crystalSystem: "Hexagonal",
    mohsHardness: "7.5 – 8.0",
    specificGravity: "2.71 – 2.90",
    image: "/images/gemstones/morganite-specimen.jpg",
    heroImage: "/images/gemstones/morganite-specimen.jpg",
    specimenCount: 4,
    created_at: "2026-01-01T00:00:00Z",
  },
];

// Structured Demonstrative Inventory
// Conforms strictly to GemstoneWithDetails data model
export const ALL_DEMO_GEMSTONES: GemstoneWithDetails[] = [
  // --- TOURMALINE ---
  {
    id: "trm-01",
    name: "Rough Green Tourmaline Crystal",
    slug: "rough-green-tourmaline-crystal",
    sku: "STC-TRM-01",
    short_description: "High-grade natural green elbaite tourmaline rough crystal showing fine striations and pristine natural termination.",
    description: "Selected natural rough green tourmaline crystal specimen from Saif Trading Co in Hong Kong. Features exceptional vitreous luster and vertical striations.",
    carat_weight: 48.6,
    dimensions: "34 x 18 x 14 mm",
    color: "Green",
    clarity: "Gemmy / Translucent",
    status: "available",
    featured: true,
    certificate_lab: "Gem Testing Lab",
    origin: "Selected Specimen",
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
    category: COLLECTIONS_DATA[0],
    images: [
      {
        id: "img-trm-01a",
        gemstone_id: "trm-01",
        image_url: "/images/gemstones/tourmaline-specimen.jpg",
        alt_text: "Rough natural green tourmaline crystal specimen - primary termination view",
        sort_order: 0,
        created_at: "2026-03-01T10:00:00Z",
      },
      {
        id: "img-trm-01b",
        gemstone_id: "trm-01",
        image_url: "/images/gemstones/hero-tourmaline.jpg",
        alt_text: "Natural green tourmaline crystal - prism striations and crystal habit",
        sort_order: 1,
        created_at: "2026-03-01T10:00:00Z",
      },
      {
        id: "img-trm-01c",
        gemstone_id: "trm-01",
        image_url: "/images/gemstones/tourmaline-bicolor-specimen.jpg",
        alt_text: "Tourmaline specimen - crystalline texture and light transmission",
        sort_order: 2,
        created_at: "2026-03-01T10:00:00Z",
      },
    ],
  },
  {
    id: "trm-02",
    name: "Bi-Color Elbaite Tourmaline Specimen",
    slug: "bi-color-elbaite-tourmaline-specimen",
    sku: "STC-TRM-02",
    short_description: "Stunning rough bi-color tourmaline crystal with vivid rose pink body color grading into vibrant emerald green termination.",
    description: "Exceptional bi-color natural tourmaline specimen displaying sharp prismatic geometry, intact termination cap, and vitreous crystal faces.",
    carat_weight: 72.4,
    dimensions: "44 x 19 x 15 mm",
    color: "Bi-Color (Pink & Green)",
    clarity: "Vitreous / Gemmy",
    status: "available",
    featured: true,
    certificate_lab: "Lab Verified",
    origin: "Selected Specimen",
    created_at: "2026-03-05T11:00:00Z",
    updated_at: "2026-03-05T11:00:00Z",
    category: COLLECTIONS_DATA[0],
    images: [
      {
        id: "img-trm-02a",
        gemstone_id: "trm-02",
        image_url: "/images/gemstones/tourmaline-bicolor-specimen.jpg",
        alt_text: "Rough natural bi-color pink and green tourmaline crystal specimen",
        sort_order: 0,
        created_at: "2026-03-05T11:00:00Z",
      },
      {
        id: "img-trm-02b",
        gemstone_id: "trm-02",
        image_url: "/images/gemstones/tourmaline-specimen.jpg",
        alt_text: "Natural tourmaline crystal prism faces and luster",
        sort_order: 1,
        created_at: "2026-03-05T11:00:00Z",
      },
    ],
  },
  {
    id: "trm-03",
    name: "Deep Forest Green Tourmaline Prism",
    slug: "deep-forest-green-tourmaline-prism",
    sku: "STC-TRM-03",
    short_description: "Elongated rough green tourmaline prism exhibiting strong vertical striations and natural trigonal terminations.",
    description: "Fine crystalline specimen with intense forest green coloration, excellent translucency, and natural geometric faces.",
    carat_weight: 35.8,
    dimensions: "28 x 15 x 12 mm",
    color: "Forest Green",
    clarity: "Translucent",
    status: "available",
    featured: false,
    origin: "Selected Specimen",
    created_at: "2026-02-15T09:00:00Z",
    updated_at: "2026-02-15T09:00:00Z",
    category: COLLECTIONS_DATA[0],
    images: [
      {
        id: "img-trm-03",
        gemstone_id: "trm-03",
        image_url: "/images/gemstones/hero-tourmaline.jpg",
        alt_text: "Deep forest green tourmaline rough crystal prism",
        sort_order: 0,
        created_at: "2026-02-15T09:00:00Z",
      },
    ],
  },
  {
    id: "trm-04",
    name: "Terminated Green Elbaite Rough Crystal",
    slug: "terminated-green-elbaite-rough-crystal",
    sku: "STC-TRM-04",
    short_description: "Classic rough green elbaite tourmaline crystal with natural pyramid termination. Historical catalogue entry.",
    description: "Previously acquired rough green tourmaline specimen maintained in the catalogue archive for lapidary and collector reference.",
    carat_weight: 91.2,
    dimensions: "48 x 22 x 18 mm",
    color: "Green",
    clarity: "Gemmy",
    status: "sold",
    featured: false,
    origin: "Selected Specimen",
    created_at: "2026-01-20T08:00:00Z",
    updated_at: "2026-01-20T08:00:00Z",
    category: COLLECTIONS_DATA[0],
    images: [
      {
        id: "img-trm-04",
        gemstone_id: "trm-04",
        image_url: "/images/gemstones/tourmaline-specimen.jpg",
        alt_text: "Terminated green elbaite tourmaline rough crystal - catalog record",
        sort_order: 0,
        created_at: "2026-01-20T08:00:00Z",
      },
    ],
  },

  // --- KUNZITE ---
  {
    id: "knz-01",
    name: "Lilac Kunzite Spodumene Specimen",
    slug: "lilac-kunzite-spodumene-specimen",
    sku: "STC-KNZ-01",
    short_description: "Sublime rough lilac-pink spodumene crystal with strong pleochroism and natural striated prism faces.",
    description: "Selected rough kunzite crystal specimen showing classic spodumene crystal formation and delicate violet-pink coloration.",
    carat_weight: 124.5,
    dimensions: "52 x 28 x 16 mm",
    color: "Lilac Pink",
    clarity: "Vitreous / Transparent",
    status: "available",
    featured: true,
    certificate_lab: "Gem Testing Lab",
    origin: "Selected Specimen",
    created_at: "2026-03-02T10:00:00Z",
    updated_at: "2026-03-02T10:00:00Z",
    category: COLLECTIONS_DATA[1],
    images: [
      {
        id: "img-knz-01a",
        gemstone_id: "knz-01",
        image_url: "/images/gemstones/kunzite-specimen.jpg",
        alt_text: "Rough lilac-pink kunzite crystal specimen on pure dark background",
        sort_order: 0,
        created_at: "2026-03-02T10:00:00Z",
      },
      {
        id: "img-knz-01b",
        gemstone_id: "knz-01",
        image_url: "/images/gemstones/kunzite-rough-crystal.jpg",
        alt_text: "Kunzite spodumene crystal - vertical striations and crystalline cleavage",
        sort_order: 1,
        created_at: "2026-03-02T10:00:00Z",
      },
    ],
  },
  {
    id: "knz-02",
    name: "Rough Lilac-Pink Spodumene Blade",
    slug: "rough-lilac-pink-spodumene-blade",
    sku: "STC-KNZ-02",
    short_description: "Tabular rough kunzite blade featuring distinct vertical etching lines and vitreous glassy transparency.",
    description: "Naturally formed spodumene crystal blade exhibiting intense pleochroic lilac coloration viewed along the c-axis.",
    carat_weight: 88.0,
    dimensions: "46 x 24 x 14 mm",
    color: "Lilac",
    clarity: "Gemmy / Transparent",
    status: "available",
    featured: true,
    origin: "Selected Specimen",
    created_at: "2026-03-08T12:00:00Z",
    updated_at: "2026-03-08T12:00:00Z",
    category: COLLECTIONS_DATA[1],
    images: [
      {
        id: "img-knz-02a",
        gemstone_id: "knz-02",
        image_url: "/images/gemstones/kunzite-rough-crystal.jpg",
        alt_text: "Rough lilac pink kunzite spodumene blade crystal specimen",
        sort_order: 0,
        created_at: "2026-03-08T12:00:00Z",
      },
      {
        id: "img-knz-02b",
        gemstone_id: "knz-02",
        image_url: "/images/gemstones/kunzite-specimen.jpg",
        alt_text: "Natural kunzite crystal transparency and optical pleochroism",
        sort_order: 1,
        created_at: "2026-03-08T12:00:00Z",
      },
    ],
  },
  {
    id: "knz-03",
    name: "Etched Transparent Kunzite Crystal",
    slug: "etched-transparent-kunzite-crystal",
    sku: "STC-KNZ-03",
    short_description: "Rough spodumene crystal exhibiting naturally etched faces, soft rose-pink hue, and glassy crystal clarity.",
    description: "Fine specimen illustrating natural dissolution features on prism faces with pure light pink body color.",
    carat_weight: 64.2,
    dimensions: "38 x 21 x 15 mm",
    color: "Rose Pink",
    clarity: "Transparent",
    status: "available",
    featured: false,
    origin: "Selected Specimen",
    created_at: "2026-02-18T14:00:00Z",
    updated_at: "2026-02-18T14:00:00Z",
    category: COLLECTIONS_DATA[1],
    images: [
      {
        id: "img-knz-03",
        gemstone_id: "knz-03",
        image_url: "/images/gemstones/kunzite-specimen.jpg",
        alt_text: "Etched transparent kunzite crystal specimen",
        sort_order: 0,
        created_at: "2026-02-18T14:00:00Z",
      },
    ],
  },
  {
    id: "knz-04",
    name: "Selected Lilac Kunzite Rough Specimen",
    slug: "selected-lilac-kunzite-rough-specimen",
    sku: "STC-KNZ-04",
    short_description: "Large tabular rough kunzite crystal with distinct cleavage planes. Preserved in catalogue archive.",
    description: "Archived rough kunzite crystal specimen showing notable crystal dimensions and rich violet-pink pleochroism.",
    carat_weight: 156.0,
    dimensions: "62 x 34 x 18 mm",
    color: "Lilac Pink",
    clarity: "Vitreous",
    status: "sold",
    featured: false,
    origin: "Selected Specimen",
    created_at: "2026-01-15T11:00:00Z",
    updated_at: "2026-01-15T11:00:00Z",
    category: COLLECTIONS_DATA[1],
    images: [
      {
        id: "img-knz-04",
        gemstone_id: "knz-04",
        image_url: "/images/gemstones/kunzite-rough-crystal.jpg",
        alt_text: "Selected lilac kunzite rough specimen - sold record",
        sort_order: 0,
        created_at: "2026-01-15T11:00:00Z",
      },
    ],
  },

  // --- MORGANITE ---
  {
    id: "mrg-01",
    name: "Peach Morganite Beryl Crystal",
    slug: "peach-morganite-beryl-crystal",
    sku: "STC-MRG-01",
    short_description: "Naturally formed hexagonal morganite beryl rough specimen with warm peach-pink body color and gemmy transparency.",
    description: "High-grade rough morganite crystal exhibiting intact hexagonal prism habit and soft peach hue.",
    carat_weight: 86.2,
    dimensions: "41 x 32 x 22 mm",
    color: "Peach Pink",
    clarity: "Gemmy Translucent",
    status: "available",
    featured: true,
    certificate_lab: "Lab Verified",
    origin: "Selected Specimen",
    created_at: "2026-03-04T12:00:00Z",
    updated_at: "2026-03-04T12:00:00Z",
    category: COLLECTIONS_DATA[2],
    images: [
      {
        id: "img-mrg-01a",
        gemstone_id: "mrg-01",
        image_url: "/images/gemstones/morganite-specimen.jpg",
        alt_text: "Rough peach morganite beryl crystal specimen",
        sort_order: 0,
        created_at: "2026-03-04T12:00:00Z",
      },
      {
        id: "img-mrg-01b",
        gemstone_id: "mrg-01",
        image_url: "/images/gemstones/morganite-hexagonal-specimen.jpg",
        alt_text: "Morganite crystal hexagonal geometry and termination profile",
        sort_order: 1,
        created_at: "2026-03-04T12:00:00Z",
      },
    ],
  },
  {
    id: "mrg-02",
    name: "Hexagonal Rough Morganite Specimen",
    slug: "hexagonal-rough-morganite-specimen",
    sku: "STC-MRG-02",
    short_description: "Exceptional hexagonal prism morganite crystal showing classic beryl geometry, pinacoid termination, and soft rose hue.",
    description: "Natural crystalline beryl specimen with sharp prism edges, glassy clarity, and uniform peach-pink color distribution.",
    carat_weight: 112.5,
    dimensions: "48 x 36 x 28 mm",
    color: "Soft Peach",
    clarity: "Gemmy / Transparent",
    status: "available",
    featured: true,
    certificate_lab: "Gemological Lab",
    origin: "Selected Specimen",
    created_at: "2026-03-07T14:00:00Z",
    updated_at: "2026-03-07T14:00:00Z",
    category: COLLECTIONS_DATA[2],
    images: [
      {
        id: "img-mrg-02a",
        gemstone_id: "mrg-02",
        image_url: "/images/gemstones/morganite-hexagonal-specimen.jpg",
        alt_text: "Hexagonal rough morganite beryl crystal with intact terminations",
        sort_order: 0,
        created_at: "2026-03-07T14:00:00Z",
      },
      {
        id: "img-mrg-02b",
        gemstone_id: "mrg-02",
        image_url: "/images/gemstones/morganite-specimen.jpg",
        alt_text: "Morganite beryl crystal clarity and pastel color saturation",
        sort_order: 1,
        created_at: "2026-03-07T14:00:00Z",
      },
    ],
  },
  {
    id: "mrg-03",
    name: "Gemmy Peach Beryl Rough Crystal",
    slug: "gemmy-peach-beryl-rough-crystal",
    sku: "STC-MRG-03",
    short_description: "Transparent rough peach morganite crystal suitable for collector display or high-yield specialty lapidary work.",
    description: "Selected rough pink beryl crystal exhibiting delicate saturation and vitreous luster along natural prism faces.",
    carat_weight: 42.8,
    dimensions: "32 x 22 x 16 mm",
    color: "Peach",
    clarity: "Gemmy",
    status: "available",
    featured: false,
    origin: "Selected Specimen",
    created_at: "2026-02-22T10:00:00Z",
    updated_at: "2026-02-22T10:00:00Z",
    category: COLLECTIONS_DATA[2],
    images: [
      {
        id: "img-mrg-03",
        gemstone_id: "mrg-03",
        image_url: "/images/gemstones/morganite-specimen.jpg",
        alt_text: "Gemmy peach beryl rough crystal specimen",
        sort_order: 0,
        created_at: "2026-02-22T10:00:00Z",
      },
    ],
  },
  {
    id: "mrg-04",
    name: "Naturally Terminated Morganite Beryl",
    slug: "naturally-terminated-morganite-beryl",
    sku: "STC-MRG-04",
    short_description: "Robust rough morganite crystal with complete pinacoidal basal termination. Catalog reference entry.",
    description: "Preserved historical record of an intact hexagonal pink beryl crystal specimen from the Saif Trading Co portfolio.",
    carat_weight: 135.0,
    dimensions: "54 x 38 x 26 mm",
    color: "Peach Pink",
    clarity: "Translucent",
    status: "sold",
    featured: false,
    origin: "Selected Specimen",
    created_at: "2026-01-10T09:00:00Z",
    updated_at: "2026-01-10T09:00:00Z",
    category: COLLECTIONS_DATA[2],
    images: [
      {
        id: "img-mrg-04",
        gemstone_id: "mrg-04",
        image_url: "/images/gemstones/morganite-hexagonal-specimen.jpg",
        alt_text: "Naturally terminated morganite beryl rough crystal - sold record",
        sort_order: 0,
        created_at: "2026-01-10T09:00:00Z",
      },
    ],
  },
];

// Education guides mapping for collections
export const RELATED_EDUCATION_DATA: Record<string, RelatedEducationGuide[]> = {
  tourmaline: [
    {
      title: "Tourmaline Crystal Morphology & Optical Properties",
      slug: "tourmaline-guide",
      summary: "A technical examination of tourmaline crystal forms, dichroism, and the factors that influence color vibrancy in natural rough crystals.",
      readingTime: "5 min read",
    },
    {
      title: "Gemstone Certification & Laboratory Testing",
      slug: "certification-guide",
      summary: "How independent gemological laboratories identify natural mineral species, verify crystal origins, and document physical parameters.",
      readingTime: "4 min read",
    },
  ],
  kunzite: [
    {
      title: "Kunzite Mineral Profile: Structure & Pleochroism",
      slug: "kunzite-guide",
      summary: "Understanding spodumene crystalline behavior, two-direction cleavage considerations, and proper light orientation for rough Kunzite.",
      readingTime: "4 min read",
    },
    {
      title: "Mineral Specimen Care & Preservation",
      slug: "specimen-care-guide",
      summary: "Best practices for handling, cleaning, and storing light-sensitive and cleavage-prone rough crystalline minerals.",
      readingTime: "3 min read",
    },
  ],
  morganite: [
    {
      title: "Morganite Beryl: Crystalline Habit & Lapidary Selection",
      slug: "morganite-guide",
      summary: "An overview of pink beryl crystal formation, manganese chromophores, and assessing rough specimen suitability for lapidary work.",
      readingTime: "4 min read",
    },
    {
      title: "How to Evaluate Rough Gemstones",
      slug: "evaluating-rough-gemstones",
      summary: "A practical mineral inspection guide covering crystal terminations, transmitted light clarity, and dimensional yield.",
      readingTime: "6 min read",
    },
  ],
};

// ============================================================
// DATA ABSTRACTION FUNCTIONS
// ============================================================

export function getCollections(): CategoryDetail[] {
  return COLLECTIONS_DATA;
}

export function getCollectionBySlug(slug: string): CategoryDetail | undefined {
  return COLLECTIONS_DATA.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getGemstones(options: GemstoneFilterOptions = {}): PaginatedGemstonesResult {
  const {
    search = "",
    categorySlug,
    status = "all",
    color = "all",
    caratRange = "all",
    sort = "featured",
    page = 1,
    pageSize = 12,
  } = options;

  let filtered = [...ALL_DEMO_GEMSTONES];

  // 1. Filter by Category
  if (categorySlug && categorySlug !== "all") {
    filtered = filtered.filter(
      (g) => g.category?.slug.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  // 2. Filter by Status (Public rule: 'draft' & 'hidden' are never shown)
  if (status && status !== "all") {
    filtered = filtered.filter((g) => g.status === status);
  } else {
    // By default public shows available & sold
    filtered = filtered.filter((g) => g.status === "available" || g.status === "sold");
  }

  // 3. Filter by Color
  if (color && color !== "all") {
    filtered = filtered.filter((g) =>
      g.color?.toLowerCase().includes(color.toLowerCase())
    );
  }

  // 4. Filter by Carat Range
  if (caratRange && caratRange !== "all") {
    filtered = filtered.filter((g) => {
      const weight = g.carat_weight || 0;
      if (caratRange === "under-50") return weight < 50;
      if (caratRange === "50-100") return weight >= 50 && weight <= 100;
      if (caratRange === "over-100") return weight > 100;
      return true;
    });
  }

  // 5. Search Filter (name, SKU, color, description)
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.sku && g.sku.toLowerCase().includes(q)) ||
        (g.color && g.color.toLowerCase().includes(q)) ||
        (g.short_description && g.short_description.toLowerCase().includes(q))
    );
  }

  // Extract available colors from current category / dataset
  const availableColors = Array.from(
    new Set(
      filtered
        .map((g) => g.color)
        .filter((c): c is string => Boolean(c))
    )
  );

  // 6. Sorting
  filtered.sort((a, b) => {
    switch (sort) {
      case "featured":
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // fallback to newest
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "carat-asc":
        return (a.carat_weight || 0) - (b.carat_weight || 0);
      case "carat-desc":
        return (b.carat_weight || 0) - (a.carat_weight || 0);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (validPage - 1) * pageSize;
  const paginatedGemstones = filtered.slice(startIndex, startIndex + pageSize);

  return {
    gemstones: paginatedGemstones,
    total,
    page: validPage,
    pageSize,
    totalPages,
    availableColors,
  };
}

export function getFeaturedGemstones(limit: number = 3): GemstoneWithDetails[] {
  return ALL_DEMO_GEMSTONES.filter((g) => g.featured && g.status === "available").slice(0, limit);
}

export function getGemstoneBySlug(slug: string): GemstoneWithDetails | undefined {
  return ALL_DEMO_GEMSTONES.find(
    (g) =>
      g.slug.toLowerCase() === slug.toLowerCase() &&
      (g.status === "available" || g.status === "sold")
  );
}

export function getRelatedGemstones(
  currentGemstone: GemstoneWithDetails,
  limit: number = 3
): GemstoneWithDetails[] {
  // Prefer other specimens from same category, excluding the current one
  const sameCategory = ALL_DEMO_GEMSTONES.filter(
    (g) =>
      g.id !== currentGemstone.id &&
      g.category?.slug.toLowerCase() === currentGemstone.category?.slug.toLowerCase()
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fallback to other available gemstones if needed
  const others = ALL_DEMO_GEMSTONES.filter(
    (g) =>
      g.id !== currentGemstone.id &&
      !sameCategory.some((item) => item.id === g.id)
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getAllGemstoneSlugs(): string[] {
  return ALL_DEMO_GEMSTONES.map((g) => g.slug);
}

export function getRelatedCollections(currentSlug: string): CategoryDetail[] {
  return COLLECTIONS_DATA.filter((c) => c.slug.toLowerCase() !== currentSlug.toLowerCase());
}

export function getRelatedEducation(categorySlug: string): RelatedEducationGuide[] {
  return RELATED_EDUCATION_DATA[categorySlug.toLowerCase()] || [];
}
