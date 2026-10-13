"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "About Us & Leadership", href: "/about" },
        { label: "Board of Trustees", href: "/about#board" },
        { label: "Management Team", href: "/about#management" },
      ],
    },
    { label: "Admission", href: "/admission" },
    {
      label: "Virtual Library",
      href: "/library",
      dropdown: [
        { label: "CHEP Library Home", href: "/library" },
        { label: "CBT & OSCE Studio", href: "/exams" },
        { label: "Clinical eBooks (240+)", href: "/library#ebooks" },
        { label: "Peer-Reviewed eJournals (240+)", href: "/library#ejournals" },
        { label: "AI Care-Plan Engine", href: "/library#ai-tools" },
        { label: "OPAC Catalog", href: "/library#catalog" },
        { label: "Research Databases", href: "/library#databases" },
      ],
    },
    { label: "Exams & OSCE", href: "/exams" },
    { label: "Reflective Forum", href: "/clinical-reflections" },
    { label: "CHEP Network", href: "/portal" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Verify", href: "/verify" },
    { label: "Contact", href: "/contact" },
    { label: "Admin CMS", href: "/admin" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Emergency & Accreditation Bar */}
      <div className="bg-forest-dark text-on-primary py-1 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="tel:+234916635674"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium"
              title="Click to Call Admissions Hotline"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">call</span>
              +234 916 635 674
            </a>
            <a
              href="https://wa.me/234916635674?text=Hello%20CHEP%20College%20Admissions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600/30 hover:bg-emerald-600/60 text-emerald-300 hover:text-white transition-all text-xs font-bold border border-emerald-500/30"
              title="Click to Chat on WhatsApp"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              WhatsApp
            </a>
            <a
              href="mailto:enquiries@chepnursingcollege.org"
              className="hidden md:flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">mail</span>
              enquiries@chepnursingcollege.org
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-[11px] font-semibold uppercase tracking-wider text-emerald-light">
              Nursing &amp; Midwifery Council of Nigeria (NMCN) Accredited
            </span>
            <Link
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-fixed hover:text-white transition-colors"
              href="/portal"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/chep/chep_logo.png"
            alt="CHEP College of Nursing Sciences"
            className="w-11 h-11 object-contain drop-shadow-xs"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-forest-dark leading-tight tracking-tight">
              CHEP College
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-medium">
              of Nursing Sciences
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            if (item.dropdown) {
              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors py-2 flex items-center gap-1 ${
                      isActive ? "text-forest-base font-bold" : "text-gray-700 hover:text-forest-base"
                    }`}
                  >
                    {item.label}
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </Link>
                  <div className="dropdown-menu absolute left-0 top-full hidden w-56 bg-white rounded-lg shadow-xl py-2 mt-1 border border-border-subtle z-50">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-surface-tint hover:text-forest-base transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors py-2 ${
                  isActive ? "text-forest-base font-bold" : "text-gray-700 hover:text-forest-base"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/admission"
            className="bg-orange-action hover:bg-tertiary-container text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            Enrol Now
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-forest-dark hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-border-subtle bg-white px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-800 hover:text-forest-base"
              >
                {item.label}
              </Link>
            </div>
          ))}
          <div className="pt-2 border-t border-border-subtle">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-semibold text-forest-base"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Student & Faculty Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
