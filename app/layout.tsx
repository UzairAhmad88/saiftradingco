import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE_URL } from "@/lib/seo/metadata";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Saif Trading Co | Rough Gemstone Supplier Hong Kong",
    template: "%s | Saif Trading Co",
  },
  description:
    "Saif Trading Co is a Hong Kong-based rough gemstone supplier specializing in Tourmaline, Kunzite and Morganite specimens.",
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Saif Trading Co | Rough Gemstone Supplier",
    description: "Specializing in Tourmaline, Kunzite and Morganite rough gemstone specimens.",
    url: SITE_URL,
    siteName: "Saif Trading Co",
    locale: "en_HK",
    type: "website",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#050505] text-[#F5F3EE] font-sans antialiased selection:bg-[#B6D94C] selection:text-[#050505]">
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
