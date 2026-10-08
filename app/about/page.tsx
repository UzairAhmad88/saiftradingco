import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  constructMetadata,
  siteConfig,
  getOrganizationSchema,
  getBreadcrumbListSchema,
} from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Saif Trading Co | Rough Gemstone Supplier Hong Kong",
  description:
    "Learn about Saif Trading Co, a specialized rough gemstone supplier in Hung Hom, Kowloon, Hong Kong focusing on natural Tourmaline, Kunzite, and Morganite crystal specimens.",
  canonical: "/about",
});

export default function AboutPage() {
  const organizationSchema = getOrganizationSchema();
  const breadcrumbs = [{ label: "About" }];
  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  const specialties = [
    {
      name: "Tourmaline",
      group: "Elbaite / Cyclosilicate",
      desc: "Selected natural rough Tourmaline crystals with vertical prism striations and intact terminations.",
      href: "/collections/tourmaline",
      image: "/images/gemstones/tourmaline-specimen.jpg",
    },
    {
      name: "Kunzite",
      group: "Spodumene / Inosilicate",
      desc: "Natural rough Kunzite crystals featuring delicate lilac-pink coloration and strong pleochroism.",
      href: "/collections/kunzite",
      image: "/images/gemstones/kunzite-specimen.jpg",
    },
    {
      name: "Morganite",
      group: "Beryl / Cyclosilicate",
      desc: "Hexagonal rough Morganite crystals characterized by delicate peach tones and gemmy clarity.",
      href: "/collections/morganite",
      image: "/images/gemstones/morganite-specimen.jpg",
    },
  ];

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#050505] focus:outline-none"
      >
        {/* Breadcrumb Header */}
        <div className="border-b border-[#242424] bg-[#050505]">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Editorial Hero Section — Dry Black Foundation */}
        <section
          aria-labelledby="about-hero-heading"
          className="border-b border-[#242424] bg-[#050505] py-16 sm:py-24 lg:py-28"
        >
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Editorial Text */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#242424] bg-[#121212] text-[#B6D94C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[3px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B6D94C]" aria-hidden="true" />
                  <span className="font-medium">Company Profile · Hong Kong</span>
                </div>

                <div className="space-y-4">
                  <h1
                    id="about-hero-heading"
                    className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#F5F3EE] tracking-tight leading-[1.05]"
                  >
                    ABOUT<br />SAIF TRADING CO
                  </h1>
                  <p className="text-xl sm:text-2xl text-[#B6D94C] font-serif italic">
                    Natural rough gemstones curated with scientific integrity.
                  </p>
                </div>

                <p className="text-base sm:text-lg text-[#A5A5A0] font-light leading-relaxed max-w-2xl">
                  Operating from Hung Hom, Kowloon, Saif Trading Co is a specialized commercial supplier of natural rough gemstones. We concentrate our procurement, cataloguing, and trade specifically on three crystalline mineral varieties: Tourmaline, Kunzite, and Morganite.
                </p>

                {/* Small Business Fact Blocks */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#242424]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#A5A5A0] block font-medium">Headquarters</span>
                    <span className="font-serif text-xl sm:text-2xl text-[#F5F3EE] font-normal">Hong Kong</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#A5A5A0] block font-medium">Focus</span>
                    <span className="font-serif text-xl sm:text-2xl text-[#F5F3EE] font-normal">Rough Crystals</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#A5A5A0] block font-medium">Specialties</span>
                    <span className="font-serif text-xl sm:text-2xl text-[#F5F3EE] font-normal">3 Mineral Families</span>
                  </div>
                </div>
              </div>

              {/* Right Gemstone Photograph in Black Visual Frame */}
              <div className="lg:col-span-5">
                <div className="relative p-2.5 sm:p-3 bg-[#0C0C0C] border border-[#242424] rounded-[4px] shadow-2xl">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-[#050505]">
                    <Image
                      src="/images/gemstones/tourmaline-specimen.jpg"
                      alt="Rough Tourmaline crystal specimen from Saif Trading Co"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-[11px] text-[#A5A5A0] flex items-center justify-between border-t border-[#242424] mt-2">
                    <span className="uppercase tracking-[0.2em] text-[#B6D94C] font-mono text-[10px]">Specimen Archive</span>
                    <span>Rough Elbaite Tourmaline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Focus & Specialization Trio — Off-White Editorial Breathing Space */}
        <section
          aria-labelledby="specialization-heading"
          className="border-b border-[#E2DFD7] bg-[#F5F3EE] py-20 sm:py-24"
        >
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
              <div className="space-y-3 max-w-2xl">
                <span className="type-eyebrow text-[#4D6618] block">
                  Core Specialization
                </span>
                <h2
                  id="specialization-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#050505] font-normal"
                >
                  Three Primary Mineral Families
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#555550] font-light max-w-md">
                Rather than operating as a broad jewellery marketplace, we maintain a focused portfolio in rough crystalline specimens.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {specialties.map((item) => (
                <article
                  key={item.name}
                  className="group bg-[#FAF9F5] border border-[#E2DFD7] rounded-[4px] hover:border-[#050505] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050505] border-b border-[#242424]">
                      <Image
                        src={item.image}
                        alt={`Rough ${item.name} specimen`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 sm:p-8 space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#4D6618] block font-medium">
                        {item.group}
                      </span>
                      <h3 className="font-serif text-2xl text-[#050505] group-hover:text-[#4D6618] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#555550] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#050505] font-semibold group-hover:text-[#4D6618] transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial Trade Approach — Dry Black Foundation */}
        <section
          aria-labelledby="approach-heading"
          className="border-b border-[#242424] bg-[#080808] py-20 sm:py-24"
        >
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="max-w-3xl space-y-4 mb-16">
              <span className="type-eyebrow text-[#B6D94C] block">
                Trade Principles
              </span>
              <h2
                id="approach-heading"
                className="font-serif text-3xl sm:text-4xl text-[#F5F3EE] font-normal"
              >
                Clear Information &amp; Transparent Standards
              </h2>
              <p className="text-sm text-[#A5A5A0] font-light leading-relaxed">
                We believe in factual presentation without exaggerated marketing narratives or unsupported claims.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 sm:p-8 bg-[#0C0C0C] border border-[#242424] rounded-[4px] space-y-4 shadow-sm">
                <div className="p-2.5 bg-[#141414] border border-[#242424] text-[#B6D94C] w-fit rounded-[3px]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F3EE]">
                  Documented Dimensions
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A0] font-light leading-relaxed">
                  Every listed specimen includes actual physical dimensions, carat weight, observed color, and natural crystal habit notes measured directly from the stone.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-[#0C0C0C] border border-[#242424] rounded-[4px] space-y-4 shadow-sm">
                <div className="p-2.5 bg-[#141414] border border-[#242424] text-[#B6D94C] w-fit rounded-[3px]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F3EE]">
                  Laboratory Documentation
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A0] font-light leading-relaxed">
                  Where independent gemological test reports have been issued, report numbers and issuing laboratory details are recorded openly for buyer verification.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-[#0C0C0C] border border-[#242424] rounded-[4px] space-y-4 shadow-sm">
                <div className="p-2.5 bg-[#141414] border border-[#242424] text-[#B6D94C] w-fit rounded-[3px]">
                  <Gem className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F3EE]">
                  Specimen Integrity
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A0] font-light leading-relaxed">
                  We specialize in natural rough material preserving original crystal faces, prism striations, and terminations as formed in geological environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Trade Contact Details — Off-White Section + Black Contrast Panel */}
        <section
          aria-labelledby="contact-heading"
          className="border-b border-[#E2DFD7] bg-[#F5F3EE] py-20 sm:py-24"
        >
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <span className="type-eyebrow text-[#4D6618] block">
                  Hong Kong Commercial Base
                </span>
                <h2
                  id="contact-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#050505] font-normal"
                >
                  Direct Trade Engagement
                </h2>
                <p className="text-sm text-[#555550] font-light leading-relaxed">
                  Our commercial office in Hung Hom, Kowloon serves as the operational centre for inventory cataloguing, client appointments, specimen inspection, and international trade correspondence.
                </p>
                <div className="pt-2">
                  <LinkButton href="/contact" variant="primary" size="md">
                    Contact Trade Desk
                  </LinkButton>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 bg-[#050505] border border-[#242424] rounded-[4px] space-y-6 text-[#F5F3EE] shadow-2xl">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B6D94C] block font-mono font-medium">
                    Registered Office Address
                  </span>
                  <div className="flex items-start gap-3 text-sm text-[#A5A5A0] font-light leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#B6D94C] shrink-0 mt-1" />
                    <span>
                      {siteConfig.address.streetAddress},<br />
                      {siteConfig.address.addressLocality}, Hong Kong
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#242424] space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B6D94C] block font-mono font-medium">
                    Direct Contact Channels
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-[#F5F3EE]">
                    <Link
                      href={`tel:${siteConfig.telephone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 hover:text-[#B6D94C] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B6D94C]" />
                      <span>{siteConfig.telephone}</span>
                    </Link>
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 hover:text-[#B6D94C] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B6D94C]" />
                      <span>{siteConfig.email}</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#242424] text-[11px] text-[#A5A5A0]">
                  Physical viewings at our Hung Hom office are arranged by prior commercial appointment.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
