import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chepnursingcollege.vercel.app"),
  title: {
    default: "CHEP College of Nursing Sciences | Excellence in Healthcare Education",
    template: "%s | CHEP College of Nursing Sciences",
  },
  description:
    "Official portal of CHEP College of Nursing Sciences, Ota, Ogun State. Fully accredited by the Nursing & Midwifery Council of Nigeria (NMCN). Offering Basic Nursing, Midwifery, CBT examination suites, and 480+ digital medical library resources.",
  keywords: [
    "CHEP College of Nursing Sciences",
    "Nursing School in Ogun State",
    "NMCN Accredited Nursing Colleges Nigeria",
    "Basic Nursing Admission 2026/2027",
    "Midwifery Training College Nigeria",
    "Nursing CBT Practice Exam",
    "Nursing OSCE Stations",
    "Ota Nursing School",
  ],
  authors: [{ name: "CHEP College Academic Affairs Registry" }],
  creator: "CHEP College of Nursing Sciences",
  publisher: "CHEP College of Nursing Sciences",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/images/chep/chep_logo.png",
    shortcut: "/images/chep/chep_logo.png",
    apple: "/images/chep/chep_logo.png",
  },
  openGraph: {
    title: "CHEP College of Nursing Sciences | Excellence in Healthcare Education",
    description:
      "Accredited by NMCN. Premier nursing and midwifery institution in Ogun State, Nigeria. Offering accredited programs, CBT & OSCE simulation, and 480+ digital library textbooks.",
    url: "https://chepnursingcollege.vercel.app",
    siteName: "CHEP College of Nursing Sciences",
    images: [
      {
        url: "/images/chep/chep_logo.png",
        width: 800,
        height: 800,
        alt: "CHEP College of Nursing Sciences Official Emblem",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHEP College of Nursing Sciences | Excellence in Healthcare Education",
    description:
      "Accredited by NMCN. Premier nursing and midwifery education in Nigeria with CBT testing, OSCE clinical suites, and digital health learning.",
    images: ["/images/chep/chep_logo.png"],
    creator: "@chepnursing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import AdmissionsConcierge from "@/components/AdmissionsConcierge";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: "CHEP College of Nursing Sciences",
  alternateName: "CHEP Nursing College",
  url: "https://chepnursingcollege.vercel.app",
  logo: "https://chepnursingcollege.vercel.app/images/chep/chep_logo.png",
  image: "https://chepnursingcollege.vercel.app/images/chep/chep_logo.png",
  description:
    "Accredited by the Nursing & Midwifery Council of Nigeria (NMCN). Educating the next generation of compassionate, competent, and world-class registered nurses and midwives.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ota",
    addressRegion: "Ogun State",
    addressCountry: "NG",
  },
  telephone: "+2348033924427",
  email: "admissions@chepnursingcollege.org",
  sameAs: [
    "https://facebook.com",
    "https://twitter.com",
    "https://instagram.com",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <AdmissionsConcierge />
      </body>
    </html>
  );
}
