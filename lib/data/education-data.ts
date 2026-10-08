export interface TableOfContentsItem {
  id: string;
  label: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  subSections?: {
    heading: string;
    paragraphs: string[];
  }[];
}

export interface EducationArticle {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: "Mineral Guides" | "Verification & Standards" | "Buying & Evaluation" | "Specimen Handling";
  mineralFamily?: "Tourmaline" | "Kunzite" | "Morganite";
  relatedCollectionSlug?: string;
  readingTime: string;
  heroImage: string;
  tableOfContents: TableOfContentsItem[];
  sections: ArticleSection[];
  seoTitle: string;
  seoDescription: string;
  relatedArticleSlugs: string[];
}

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: "art-tourmaline-guide",
    slug: "tourmaline-guide",
    title: "Tourmaline Crystal Morphology & Optical Properties",
    shortDescription:
      "A technical examination of tourmaline crystal forms, prism striations, dichroism, and assessing natural rough elbaite specimens.",
    category: "Mineral Guides",
    mineralFamily: "Tourmaline",
    relatedCollectionSlug: "tourmaline",
    readingTime: "6 min read",
    heroImage: "/images/gemstones/tourmaline-specimen.jpg",
    seoTitle: "Tourmaline Crystal Guide: Morphology & Optical Properties | Saif Trading Co",
    seoDescription:
      "Technical mineral guide on rough Tourmaline crystals. Explore trigonal prism geometry, vertical striations, color zoning, and evaluation criteria for natural elbaite specimens.",
    relatedArticleSlugs: ["gemstone-treatments", "certification-guide", "specimen-care-guide"],
    tableOfContents: [
      { id: "geological-formation", label: "Pegmatitic Formation & Crystallography" },
      { id: "prism-morphology", label: "Prism Striations & Natural Terminations" },
      { id: "optical-properties", label: "Optical Behavior & Pleochroism" },
      { id: "color-zoning", label: "Color Distribution & Bi-Color Elbaite" },
      { id: "selection-criteria", label: "Rough Specimen Evaluation Criteria" },
    ],
    sections: [
      {
        id: "geological-formation",
        heading: "Pegmatitic Formation & Crystallography",
        paragraphs: [
          "Tourmaline represents a complex group of borosilicate minerals that crystallize primarily within granitic pegmatites. During the late stages of magmatic crystallization, volatile-rich residual fluids containing boron, silica, and incompatible elements pool in hydrothermal pockets, providing the geochemical conditions necessary for large, well-formed tourmaline crystals to develop.",
          "Crystallographically, tourmaline belongs to the trigonal crystal system. Crystals typically form elongated prismatic columns with a rounded, three-sided triangular cross-section described by crystallographers as a spherical triangle. This distinctive cross-sectional profile is one of the primary diagnostic field characteristics separating rough tourmaline from other hexagonal or orthorhombic minerals.",
        ],
      },
      {
        id: "prism-morphology",
        heading: "Prism Striations & Natural Terminations",
        paragraphs: [
          "A signature morphological characteristic of natural rough tourmaline is the presence of pronounced vertical striations running parallel to the c-axis along the prism faces. These striations result from oscillatory growth between prism and pyramidal crystal faces during crystallization in changing geochemical environments.",
          "Natural terminations can vary significantly depending on growth pocket stability. Crystals may exhibit sharp three-sided pyramidal terminations, flat pedion caps, or complex multi-faceted terminations. In natural specimen trading, fully terminated crystals that have remained intact without mechanical damage from mining extraction command significant aesthetic and mineralogical value.",
        ],
      },
      {
        id: "optical-properties",
        heading: "Optical Behavior & Pleochroism",
        paragraphs: [
          "Tourmaline is an optically uniaxial negative mineral with high birefringence (0.018 to 0.040). One of its most pronounced optical phenomena is dichroism—the ability of the crystal to absorb light differently along the ordinary and extraordinary vibrational directions.",
          "When viewing a rough tourmaline crystal down the optical c-axis (the length of the prism), light transmission is typically noticeably darker and more saturated than when viewed perpendicular to the prism faces (along the a- and b-axes). Lapidary cutters and collectors must evaluate this directional color density to determine how rough crystals will reflect light when viewed from various angles.",
        ],
      },
      {
        id: "color-zoning",
        heading: "Color Distribution & Bi-Color Elbaite",
        paragraphs: [
          "Elbaite, the lithium-rich member of the tourmaline supergroup, exhibits the widest color spectrum in the mineral kingdom. Slight variations in transition metal trace elements—such as iron (producing dark greens and blues), manganese (yielding pinks, reds, and yellows), or titanium—create distinct body colors.",
          "Because pegmatite fluid chemistry often shifts dramatically during continuous crystal growth, tourmaline crystals frequently display dramatic color zoning. In bi-color and multi-color specimens, sharp compositional boundaries separate rose-pink and forest-green zones within a single continuous crystalline matrix.",
        ],
      },
      {
        id: "selection-criteria",
        heading: "Rough Specimen Evaluation Criteria",
        paragraphs: [
          "When inspecting rough tourmaline specimens, trade buyers assess several interrelated physical characteristics:",
          "1. Crystal Termination Integrity: Complete, naturally formed terminations without impact fractures.",
          "2. Transparency & Light Transmission: Clarity evaluated with backlighting to observe internal fractures and fluid inclusions.",
          "3. Striation Definition: Crisp, well-defined prism fluting indicating undisturbed pocket crystallization.",
          "4. Optical Direction: Color saturation along both the c-axis and perpendicular prism axes.",
        ],
      },
    ],
  },
  {
    id: "art-kunzite-guide",
    slug: "kunzite-guide",
    title: "Kunzite Mineral Profile: Structure & Pleochroism",
    shortDescription:
      "Understanding spodumene crystalline behavior, two-direction prismatic cleavage, intense pleochroism, and preservation for rough Kunzite.",
    category: "Mineral Guides",
    mineralFamily: "Kunzite",
    relatedCollectionSlug: "kunzite",
    readingTime: "5 min read",
    heroImage: "/images/gemstones/kunzite-specimen.jpg",
    seoTitle: "Rough Kunzite Guide: Spodumene Structure & Pleochroism | Saif Trading Co",
    seoDescription:
      "Authoritative mineral guide on rough Kunzite. Learn about monoclinic spodumene structure, two-direction cleavage, manganese coloration, and preservation requirements.",
    relatedArticleSlugs: ["tourmaline-guide", "specimen-care-guide", "certification-guide"],
    tableOfContents: [
      { id: "mineral-identity", label: "Spodumene Mineral Group & Chemistry" },
      { id: "crystal-structure", label: "Monoclinic Habit & Cleavage Mechanics" },
      { id: "pleochroism", label: "Extreme Pleochroism & Color Orientation" },
      { id: "preservation-notes", label: "Light Sensitivity & Handling Caution" },
    ],
    sections: [
      {
        id: "mineral-identity",
        heading: "Spodumene Mineral Group & Chemistry",
        paragraphs: [
          "Kunzite is the delicate pink-to-violet variety of spodumene, a lithium aluminum inosilicate mineral with the chemical formula LiAl(SiO₃)₂. First identified in the early 20th century in California pegmatites, kunzite derives its distinctive violet-pink pastel body color from trace amounts of divalent and trivalent manganese substituted into the crystal lattice.",
          "Spodumene forms as an important lithium ore in lithium-cesium-tantalum (LCT) pegmatites. In gem-grade rough crystals, exceptional transparency and glassy vitreous luster distinguish kunzite from opaque industrial spodumene masses.",
        ],
      },
      {
        id: "crystal-structure",
        heading: "Monoclinic Habit & Cleavage Mechanics",
        paragraphs: [
          "Kunzite crystallizes in the monoclinic crystal system, typically forming flattened, tabular crystal blades or elongated prisms. The prism faces frequently display deep longitudinal etchings and striations created by late-stage hydrothermal dissolution within the pegmatite pocket.",
          "A crucial mechanical consideration in evaluating rough kunzite is its perfect prismatic cleavage in two directions, intersecting at approximately 87 degrees and 93 degrees. This pronounced cleavage structure makes the mineral susceptible to splitting along parallel planes when subjected to thermal shock or mechanical impact.",
        ],
      },
      {
        id: "pleochroism",
        heading: "Extreme Pleochroism & Color Orientation",
        paragraphs: [
          "Kunzite is renowned for exhibiting some of the strongest pleochroism among natural gemstones. As light passes through the crystal along different crystallographic directions, the mineral exhibits distinct color variations:",
          "• Along the c-axis: Deepest violet-pink or intense lilac saturation.",
          "• Perpendicular to the c-axis: Substantially paler pink, soft lavender, or virtually colorless.",
          "Due to this extreme optical variance, lapidary cutters orient the table facet perpendicular to the c-axis to concentrate color intensity, while specimen collectors display the crystal so that light transmits through the terminated top to highlight its deepest hue.",
        ],
      },
      {
        id: "preservation-notes",
        heading: "Light Sensitivity & Handling Caution",
        paragraphs: [
          "Some natural kunzite specimens exhibit color instability when exposed to continuous, intense ultraviolet radiation or direct sunlight over prolonged periods. This photo-sensitivity occurs because ultraviolet energy can alter the oxidation state of the manganese chromophore.",
          "For long-term specimen preservation, collectors and handlers should avoid displaying rough kunzite under direct, unfiltered sun exposure or high-heat halogen spotlights. Ultrasonic cleaners must never be used due to the risk of triggering fracture propagation along natural cleavage planes.",
        ],
      },
    ],
  },
  {
    id: "art-morganite-guide",
    slug: "morganite-guide",
    title: "Morganite Beryl: Crystalline Habit & Lapidary Selection",
    shortDescription:
      "An overview of pink beryl crystal formation, hexagonal prism habits, manganese chromophores, and assessing rough specimen suitability.",
    category: "Mineral Guides",
    mineralFamily: "Morganite",
    relatedCollectionSlug: "morganite",
    readingTime: "5 min read",
    heroImage: "/images/gemstones/morganite-specimen.jpg",
    seoTitle: "Rough Morganite Guide: Beryl Crystal Habit & Lapidary Assessment | Saif Trading Co",
    seoDescription:
      "Comprehensive mineral guide on rough Morganite beryl. Explore hexagonal crystal habit, pinacoid terminations, pastel color chemistry, and evaluation criteria.",
    relatedArticleSlugs: ["tourmaline-guide", "certification-guide", "gemstone-treatments"],
    tableOfContents: [
      { id: "beryl-family", label: "Beryl Mineral Family & Chemistry" },
      { id: "crystal-geometry", label: "Hexagonal Crystal Geometry & Terminations" },
      { id: "coloration-factors", label: "Manganese Chromophores & Color Spectrum" },
      { id: "rough-evaluation", label: "Evaluating Rough Morganite Specimens" },
    ],
    sections: [
      {
        id: "beryl-family",
        heading: "Beryl Mineral Family & Chemistry",
        paragraphs: [
          "Morganite is the pink, rose, and peach-colored variety of beryl, a cyclosilicate mineral with the chemical composition Be₃Al₂(SiO₃)₆. As a member of the beryl group, morganite shares its foundational crystal structure and high hardness (Mohs 7.5 to 8.0) with emerald (green beryl), aquamarine (blue beryl), and heliodor (yellow beryl).",
          "Like other beryl varieties, morganite crystallizes in complex granitic pegmatites where high concentrations of beryllium accumulate in cooling pegmatitic chambers alongside late-stage volatile elements.",
        ],
      },
      {
        id: "crystal-geometry",
        heading: "Hexagonal Crystal Geometry & Terminations",
        paragraphs: [
          "Morganite crystallizes in the hexagonal crystal system. While emerald and aquamarine commonly form elongated, slender prismatic columns, rough morganite crystals frequently develop as short, tabular prisms or robust hexagonal blocks.",
          "The terminations of rough morganite crystals are predominantly flat basal pinacoids, often accompanied by small pyramidal bevels. Well-formed hexagonal faces with vitreous luster and intact basal terminations are highly prized as natural display specimens.",
        ],
      },
      {
        id: "coloration-factors",
        heading: "Manganese Chromophores & Color Spectrum",
        paragraphs: [
          "The delicate pink to peach body color of morganite is caused by trace amounts of manganese (Mn²⁺) occupying structural sites within the beryl crystal lattice. The exact ratio between pink and yellow color components determines whether a crystal appears pure baby-pink, soft rose, or warm apricot-peach.",
          "Morganite exhibits distinct dichroism: when viewed from different directions, one axis reveals a pale pink hue while the other displays a slightly warmer peach or yellowish-pink tone. This natural pleochroism gives unheated rough specimens an organic warmth that distinguishes natural crystalline material.",
        ],
      },
      {
        id: "rough-evaluation",
        heading: "Evaluating Rough Morganite Specimens",
        paragraphs: [
          "When assessing rough morganite, professionals evaluate clarity, color saturation, and crystal face condition. Natural rough morganite often exhibits excellent transparency with fewer internal fractures than emerald. Characteristic inclusions include parallel two-phase fluid inclusions, negative crystals, and fine growth tubes oriented parallel to the c-axis.",
        ],
      },
    ],
  },
  {
    id: "art-certification-guide",
    slug: "certification-guide",
    title: "Gemstone Certification & Laboratory Testing Standards",
    shortDescription:
      "How independent gemological laboratories analyze natural rough specimens, verify mineral species, and document physical parameters.",
    category: "Verification & Standards",
    readingTime: "5 min read",
    heroImage: "/images/gemstones/tourmaline-bicolor-specimen.jpg",
    seoTitle: "Gemstone Certification & Testing Standards Guide | Saif Trading Co",
    seoDescription:
      "Understand gemological laboratory testing standards. Learn how testing authorities verify species identification, identify artificial treatments, and document rough gemstone specimens.",
    relatedArticleSlugs: ["gemstone-treatments", "tourmaline-guide", "specimen-care-guide"],
    tableOfContents: [
      { id: "purpose-of-testing", label: "The Role of Independent Laboratory Reports" },
      { id: "report-vs-appraisal", label: "Identification Reports vs. Commercial Appraisals" },
      { id: "testing-methodology", label: "Standard Diagnostic Testing Methods" },
      { id: "report-verification", label: "How to Verify Laboratory Documentation" },
    ],
    sections: [
      {
        id: "purpose-of-testing",
        heading: "The Role of Independent Laboratory Reports",
        paragraphs: [
          "In the international gemstone trade, independent gemological laboratory reports provide an unbiased, scientific evaluation of a specimen's mineral identity and treatment status. Unlike commercial sellers who have an economic interest in transactions, accredited gemological laboratories operate as independent diagnostic authorities.",
          "The primary objective of a gemstone report is to answer fundamental scientific questions: What is the mineral species? Is it of natural geological origin? Has the specimen undergone artificial treatment or enhancement?",
        ],
      },
      {
        id: "report-vs-appraisal",
        heading: "Identification Reports vs. Commercial Appraisals",
        paragraphs: [
          "It is critical to distinguish between a gemological identification report and a commercial appraisal. An identification report is a purely scientific document confirming physical measurements, optical properties, species identification, and treatment conclusions. It does not provide monetary valuations or commercial quality grades.",
          "A commercial appraisal, by contrast, estimates market financial value, which fluctuates according to current retail and wholesale market conditions. Saif Trading Co references independent gemological testing solely for scientific species identification and treatment disclosure.",
        ],
      },
      {
        id: "testing-methodology",
        heading: "Standard Diagnostic Testing Methods",
        paragraphs: [
          "Accredited gemological laboratories utilize advanced analytical instrumentation to analyze gemstones non-destructively:",
          "• Refractometry & Specific Gravity: Measuring optical refractive index and hydrostatic density to confirm mineral family.",
          "• Spectroscopy (UV-Vis-NIR): Detecting characteristic absorption spectra associated with specific chromophore ions.",
          "• Fourier Transform Infrared Spectroscopy (FTIR): Analyzing molecular bonding to identify polymer filling, oiling, or synthetic growth markers.",
          "• Raman Spectroscopy: Rapid, highly precise molecular fingerprinting of mineral species and microscopic inclusions.",
        ],
      },
      {
        id: "report-verification",
        heading: "How to Verify Laboratory Documentation",
        paragraphs: [
          "Reputable testing laboratories maintain online verification databases where clients and prospective buyers can enter the report number and carat weight to view the archived digital record. At Saif Trading Co, where certified specimens are catalogued, report numbers and issuing laboratory details are documented openly to facilitate independent buyer verification.",
        ],
      },
    ],
  },
  {
    id: "art-gemstone-treatments",
    slug: "gemstone-treatments",
    title: "Gemstone Treatment & Enhancement Disclosure Guide",
    shortDescription:
      "A factual overview of common gemstone treatment methodologies, natural state definitions, and transparency standards in rough mineral trading.",
    category: "Verification & Standards",
    readingTime: "5 min read",
    heroImage: "/images/gemstones/kunzite-rough-crystal.jpg",
    seoTitle: "Gemstone Treatments & Enhancement Disclosure | Saif Trading Co",
    seoDescription:
      "Learn about common gemstone enhancement methods, thermal treatments, irradiation, and why complete disclosure is essential in rough mineral trading.",
    relatedArticleSlugs: ["certification-guide", "tourmaline-guide", "specimen-care-guide"],
    tableOfContents: [
      { id: "treatment-definition", label: "What Constitutes a Gemstone Treatment?" },
      { id: "common-methods", label: "Common Enhancement Methods" },
      { id: "disclosure-ethics", label: "Disclosure Standards & Trade Ethics" },
      { id: "rough-specimens", label: "Treatment Considerations in Rough Crystals" },
    ],
    sections: [
      {
        id: "treatment-definition",
        heading: "What Constitutes a Gemstone Treatment?",
        paragraphs: [
          "A gemstone treatment or enhancement is any human-applied process—other than traditional cutting, shaping, and polishing—that alters the color, clarity, optical appearance, or physical stability of a natural mineral. Treatments range from ancient thermal heating techniques to modern laboratory irradiation and polymer impregnation.",
          "In the gemstone trade, treatments themselves are not inherently improper; however, non-disclosure of treatments is completely unacceptable. The commercial value of an untreated natural crystal is fundamentally different from that of a treated counterpart.",
        ],
      },
      {
        id: "common-methods",
        heading: "Common Enhancement Methods",
        paragraphs: [
          "• Thermal Heating: Controlled heat application designed to lighten dark tones (e.g. lightening dark green tourmaline) or dissolve internal silk inclusions.",
          "• Irradiation: Exposing crystals to ionizing radiation (gamma rays, neutrons, or electrons) to induce artificial color centers, sometimes followed by heat stabilization.",
          "• Clarity Enhancement & Infusion: Introducing colorless oils, resins, or polymers into surface-reaching fractures to minimize the visual impact of fissures.",
          "• Dyeing: Introducing colored substances into porous or heavily fractured minerals to alter surface hue.",
        ],
      },
      {
        id: "disclosure-ethics",
        heading: "Disclosure Standards & Trade Ethics",
        paragraphs: [
          "Leading international gemological organizations, including CIBJO (The World Jewellery Confederation) and the ICA (International Colored Gemstone Association), enforce clear disclosure rules: any treatment must be fully, clearly, and unambiguously disclosed to prospective buyers at all points of trade.",
          "At Saif Trading Co, we uphold strict disclosure principles. Where laboratory testing or visual diagnostic evaluation confirms treatment status, that information is recorded directly within the specimen listing.",
        ],
      },
      {
        id: "rough-specimens",
        heading: "Treatment Considerations in Rough Crystals",
        paragraphs: [
          "Natural rough mineral specimens collected for scientific reference or mineral display are prized specifically for their unadulterated geological condition. Introducing artificial treatments to rough crystal specimens diminishes their scientific and historical collector value. We therefore emphasize the preservation of natural, untreated crystalline integrity.",
        ],
      },
    ],
  },
  {
    id: "art-specimen-care-guide",
    slug: "specimen-care-guide",
    title: "Rough Mineral Specimen Handling & Preservation",
    shortDescription:
      "Safe practices for cleaning, handling, light protection, and archival storage of delicate rough crystalline mineral specimens.",
    category: "Specimen Handling",
    readingTime: "4 min read",
    heroImage: "/images/gemstones/morganite-hexagonal-specimen.jpg",
    seoTitle: "Rough Mineral Specimen Care & Preservation Guide | Saif Trading Co",
    seoDescription:
      "Essential guidelines for caring for rough gemstone specimens. Learn safe cleaning techniques, light management, and shock prevention for delicate crystals.",
    relatedArticleSlugs: ["kunzite-guide", "tourmaline-guide", "certification-guide"],
    tableOfContents: [
      { id: "handling-protocols", label: "Fundamental Handling Guidelines" },
      { id: "cleaning-procedures", label: "Safe Cleaning & Decontamination" },
      { id: "environmental-control", label: "Light, Temperature & Humidity Control" },
      { id: "storage-display", label: "Archival Mounting & Display Considerations" },
    ],
    sections: [
      {
        id: "handling-protocols",
        heading: "Fundamental Handling Guidelines",
        paragraphs: [
          "Natural rough gemstone crystals often feature delicate terminations, fine growth striations, and directional cleavage planes that make them significantly more fragile than faceted stones set in protective jewellery mountings.",
          "Always handle mineral specimens over a padded surface, such as a felt inspection tray or clean foam mat. Hold crystals securely by their main prism matrix rather than applying pressure to delicate terminal points or fragile contact zones.",
        ],
      },
      {
        id: "cleaning-procedures",
        heading: "Safe Cleaning & Decontamination",
        paragraphs: [
          "For routine cleaning of rough tourmaline, kunzite, and morganite specimens:",
          "• Dust Removal: Use a soft natural-hair brush or canned compressed air held at a safe distance.",
          "• Washing: Lukewarm water with mild, neutral soap. Gently pat dry with a lint-free microfiber cloth.",
          "• Critical Warning: Never expose rough specimens to ultrasonic cleaners or steam cleaners. Ultrasonic vibrations can trigger spontaneous fracturing along natural cleavage planes, especially in spodumene (kunzite).",
        ],
      },
      {
        id: "environmental-control",
        heading: "Light, Temperature & Humidity Control",
        paragraphs: [
          "Certain minerals, notably kunzite, can exhibit gradual fading under intense ultraviolet illumination. Keep light-sensitive specimens away from direct south-facing window light and avoid high-wattage incandescent display bulbs that emit excessive heat.",
          "Sudden temperature swings can cause thermal shock in minerals with distinct cleavage planes, leading to internal cleaving. Maintain stable room temperatures in collection storage areas.",
        ],
      },
      {
        id: "storage-display",
        heading: "Archival Mounting & Display Considerations",
        paragraphs: [
          "When mounting rough crystals on display pedestals, use archival, non-acidic mineral tack or custom-molded acrylic cradles. Avoid aggressive adhesives, chemical epoxies, or metal clamps that exert localized mechanical pressure on fragile prism corners.",
        ],
      },
    ],
  },
  {
    id: "art-evaluating-rough-gemstones",
    slug: "evaluating-rough-gemstones",
    title: "How to Evaluate Rough Gemstones: Inspection & Quality Guide",
    shortDescription:
      "A technical mineral inspection guide covering crystal terminations, optical pleochroism orientation, transmitted light clarity, and dimensional yield.",
    category: "Buying & Evaluation",
    readingTime: "6 min read",
    heroImage: "/images/gemstones/tourmaline-specimen.jpg",
    seoTitle: "How to Evaluate Rough Gemstones: Inspection & Quality Guide | Saif Trading Co",
    seoDescription:
      "Learn how to evaluate rough gemstones. A practical mineral guide covering crystal terminations, optical orientation, backlighting clarity checks, and carat weight evaluation.",
    relatedArticleSlugs: ["tourmaline-guide", "kunzite-guide", "certification-guide", "gemstone-treatments"],
    tableOfContents: [
      { id: "crystalline-habit", label: "Crystal Habit & Termination Integrity" },
      { id: "optical-orientation", label: "Optical Orientation & Pleochroism" },
      { id: "clarity-illumination", label: "Internal Clarity & Illumination Techniques" },
      { id: "carat-dimensions", label: "Carat Weight vs. Physical Dimensions" },
      { id: "laboratory-documentation", label: "Independent Testing & Documentation" },
    ],
    sections: [
      {
        id: "crystalline-habit",
        heading: "Crystal Habit & Termination Integrity",
        paragraphs: [
          "Evaluating natural rough gemstones begins with identifying the mineral's crystalline habit. Unlike tumbled pebbles or water-worn alluvial gravels whose exterior features have been eroded by river transport, pegmatite crystals retain their original growth geometry.",
          "Examine the crystal faces and termination caps under low-magnification inspection. In trigonal crystals such as tourmaline, look for well-defined vertical striations along the prism faces. In hexagonal minerals like morganite, verify flat basal pinacoids and hexagonal prism angles. Intact terminations that have not suffered extraction fractures indicate well-preserved geological growth and command superior collector value.",
        ],
      },
      {
        id: "optical-orientation",
        heading: "Optical Orientation & Pleochroism",
        paragraphs: [
          "Many colored rough minerals exhibit strong pleochroism—displaying different hues or saturation depths depending on the direction of transmitted light. In rough kunzite (spodumene) and tourmaline, understanding optical axes is essential.",
          "When viewing tourmaline down the optical c-axis, color saturation is often noticeably darker than through the perpendicular prism faces. In kunzite, the deepest lilac or violet-pink appears looking straight down the crystal length, while side profiles may appear pale pink or nearly colorless. Evaluating rough crystals requires rotating the specimen under balanced 5000K daylight illumination to assess directional color balance.",
        ],
      },
      {
        id: "clarity-illumination",
        heading: "Internal Clarity & Illumination Techniques",
        paragraphs: [
          "Surface appearance in rough minerals can be misleading; surface etchings and natural growth striations often obscure interior transparency. To accurately inspect internal clarity, utilize transmitted fiber-optic backlighting or a high-CRI penlight held against the crystal base.",
          "Distinguish between harmless growth features (such as parallel growth tubes, two-phase fluid inclusions, or veil-like healing planes) and structural fractures that compromise specimen durability. In cleavage-prone minerals such as kunzite, hairline cracks running parallel to cleavage angles require careful documentation.",
        ],
      },
      {
        id: "carat-dimensions",
        heading: "Carat Weight vs. Physical Dimensions",
        paragraphs: [
          "In rough gemstone trading, carat weight alone does not tell the full story. A flattened tabular crystal and a compact columnar prism of identical carat weight offer completely different display profiles and lapidary potentials.",
          "Always measure rough specimens using digital calipers across all three dimensions (length × width × depth in millimeters). Comparing physical millimeters to total carat weight reveals whether a crystal is elongated, blocky, or tabular, providing essential data for display mounting or lapidary planning.",
        ],
      },
      {
        id: "laboratory-documentation",
        heading: "Independent Testing & Documentation",
        paragraphs: [
          "Before acquiring high-value rough specimens, verify whether the material has been independently tested by an accredited gemological laboratory. Reports confirm mineral species, natural vs. synthetic origin, and disclose whether artificial heat or irradiation enhancements have been applied.",
          "At Saif Trading Co, certified specimens in our Hong Kong catalogue include official laboratory report numbers and issuing facility details, enabling direct client verification against laboratory databases.",
        ],
      },
    ],
  },
];

// Data layer helper functions
export function getEducationArticles(): EducationArticle[] {
  return EDUCATION_ARTICLES;
}

export function getEducationArticleBySlug(slug: string): EducationArticle | undefined {
  return EDUCATION_ARTICLES.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllEducationSlugs(): string[] {
  return EDUCATION_ARTICLES.map((a) => a.slug);
}

export function getFeaturedArticles(limit: number = 2): EducationArticle[] {
  return EDUCATION_ARTICLES.slice(0, limit);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): EducationArticle[] {
  const current = getEducationArticleBySlug(currentSlug);
  if (!current) return EDUCATION_ARTICLES.slice(0, limit);

  // Return articles listed in relatedArticleSlugs, fallback to others
  const matched = current.relatedArticleSlugs
    .map((slug) => getEducationArticleBySlug(slug))
    .filter((a): a is EducationArticle => Boolean(a));

  if (matched.length >= limit) {
    return matched.slice(0, limit);
  }

  const remaining = EDUCATION_ARTICLES.filter(
    (a) => a.slug !== currentSlug && !matched.some((m) => m.slug === a.slug)
  );

  return [...matched, ...remaining].slice(0, limit);
}
