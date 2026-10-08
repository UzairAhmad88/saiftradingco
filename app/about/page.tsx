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
        <div className="border-b border-[#2A2A2A] bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Hero Section */}
        <section
          aria-labelledby="about-hero-heading"
          className="border-b border-[#2A2A2A] bg-[#070707] py-16 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#B69B5E]/30 bg-[#0E0E0E] text-[#B69B5E] text-[10px] sm:text-[11px] uppercase tracking-[0.22em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B69B5E]" aria-hidden="true" />
                <span>Company Profile · Hong Kong</span>
              </div>

              <h1
                id="about-hero-heading"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F5F5F5] tracking-tight leading-[1.08]"
              >
                About Saif Trading Co
              </h1>

              <p className="text-base sm:text-lg text-[#A3A3A3] font-light leading-relaxed">
                Operating from Hung Hom, Kowloon, Saif Trading Co is a specialized commercial supplier of natural rough gemstones. We concentrate our procurement, cataloguing, and trade specifically on three crystalline mineral varieties: Tourmaline, Kunzite, and Morganite.
              </p>
            </div>
          </div>
        </section>

        {/* Business Focus & Specialization Trio */}
        <section
          aria-labelledby="specialization-heading"
          className="border-b border-[#2A2A2A] bg-[#050505] py-20 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
              <div className="space-y-3 max-w-2xl">
                <span className="type-eyebrow text-[#B69B5E] block">
                  Core Specialization
                </span>
                <h2
                  id="specialization-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
                >
                  Three Primary Mineral Families
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#A3A3A3] font-light max-w-md">
                Rather than operating as a broad jewellery marketplace, we maintain a focused portfolio in rough crystalline specimens.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {specialties.map((item) => (
                <article
                  key={item.name}
                  className="group bg-[#0A0A0A] border border-[#222] hover:border-[#B69B5E]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070707] border-b border-[#222]">
                      <Image
                        src={item.image}
                        alt={`Rough ${item.name} specimen`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 sm:p-8 space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69B5E] block">
                        {item.group}
                      </span>
                      <h3 className="font-serif text-2xl text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors"
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

        {/* Commercial Trade Approach */}
        <section
          aria-labelledby="approach-heading"
          className="border-b border-[#2A2A2A] bg-[#070707] py-20 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4 mb-16">
              <span className="type-eyebrow text-[#B69B5E] block">
                Trade Principles
              </span>
              <h2
                id="approach-heading"
                className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
              >
                Clear Information &amp; Transparent Standards
              </h2>
              <p className="text-sm text-[#A3A3A3] font-light leading-relaxed">
                We believe in factual presentation without exaggerated marketing narratives or unsupported claims.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-[#222] space-y-4">
                <div className="p-2.5 bg-[#121212] border border-[#B69B5E]/30 text-[#B69B5E] w-fit">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F5F5]">
                  Documented Dimensions
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
                  Every listed specimen includes actual physical dimensions, carat weight, observed color, and natural crystal habit notes measured directly from the stone.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-[#222] space-y-4">
                <div className="p-2.5 bg-[#121212] border border-[#B69B5E]/30 text-[#B69B5E] w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F5F5]">
                  Laboratory Documentation
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
                  Where independent gemological test reports have been issued, report numbers and issuing laboratory details are recorded openly for buyer verification.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-[#222] space-y-4">
                <div className="p-2.5 bg-[#121212] border border-[#B69B5E]/30 text-[#B69B5E] w-fit">
                  <Gem className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F5F5]">
                  Specimen Integrity
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
                  We specialize in natural rough material preserving original crystal faces, prism striations, and terminations as formed in geological environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Trade Contact Details */}
        <section
          aria-labelledby="contact-heading"
          className="border-b border-[#2A2A2A] bg-[#050505] py-20 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <span className="type-eyebrow text-[#B69B5E] block">
                  Hong Kong Commercial Base
                </span>
                <h2
                  id="contact-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
                >
                  Direct Trade Engagement
                </h2>
                <p className="text-sm text-[#A3A3A3] font-light leading-relaxed">
                  Our commercial office in Hung Hom, Kowloon serves as the operational centre for inventory cataloguing, client appointments, specimen inspection, and international trade correspondence.
                </p>
                <div className="pt-2">
                  <LinkButton href="/contact" variant="primary" size="md">
                    Contact Trade Desk
                  </LinkButton>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 bg-[#0A0A0A] border border-[#222] space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69B5E] block">
                    Registered Office Address
                  </span>
                  <div className="flex items-start gap-3 text-sm text-[#E5E5E5] font-light leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#B69B5E] shrink-0 mt-1" />
                    <span>
                      {siteConfig.address.streetAddress},<br />
                      {siteConfig.address.addressLocality}, Hong Kong
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1C1C1C] space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69B5E] block">
                    Direct Contact Channels
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-[#E5E5E5]">
                    <Link
                      href={`tel:${siteConfig.telephone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 hover:text-[#B69B5E] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B69B5E]" />
                      <span>{siteConfig.telephone}</span>
                    </Link>
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 hover:text-[#B69B5E] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B69B5E]" />
                      <span>{siteConfig.email}</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1C1C1C] text-[11px] text-[#737373]">
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
