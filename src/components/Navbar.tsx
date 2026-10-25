"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavSubItem {
  label: string;
  href: string;
  desc?: string;
  badge?: string;
  subdomain?: string;
  icon?: string;
}

interface NavCategory {
  label: string;
  href: string;
  dropdown?: NavSubItem[];
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navCategories: NavCategory[] = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        {
          label: "College Heritage & Vision",
          href: "/about",
          desc: "NMCN approval, institutional trajectory & founding mandate",
          icon: "history_edu",
        },
        {
          label: "Office of the Provost",
          href: "/about#provost",
          desc: "Prof. Stella O. Ayowole — Executive leadership & vision",
          icon: "military_tech",
        },
        {
          label: "Academic Faculty & Lecturers",
          href: "/about#faculty",
          desc: "Registered Nurse educators, clinicians & coordinators",
          icon: "groups",
        },
        {
          label: "Board of Trustees & Senate",
          href: "/about#trustees",
          desc: "Chief (Dr.) Olusegun Agbebi & Governing Council",
          icon: "account_balance",
        },
        {
          label: "Affiliated Hospital Networks",
          href: "/about#affiliations",
          desc: "OOUTH Sagamu, State Hospital Ota & clinical partners",
          icon: "local_hospital",
        },
      ],
    },
    {
      label: "Academics",
      href: "/admission",
      dropdown: [
        {
          label: "Admission & Requirements",
          href: "/admission",
          desc: "Entry criteria, ND/HND Nursing & Midwifery pathways",
          icon: "school",
        },
        {
          label: "Tuition, Fees & Scholarships",
          href: "/admission#tuition",
          desc: "Transparent schedule of fees & installment plans",
          icon: "payments",
        },
        {
          label: "Academic Programs & Curriculum",
          href: "/admission#programs",
          desc: "General Nursing, Basic Midwifery & Public Health Nursing",
          icon: "menu_book",
        },
      ],
    },
    {
      label: "Clinical",
      href: "/exams",
      dropdown: [
        {
          label: "CBT & OSCE Examination Studio",
          href: "/exams",
          desc: "160+ MCQs, 52 Clinical Cases & 102 OSCE Stations",
          subdomain: "exams.chep",
          badge: "NMCN Timed",
          icon: "timer",
        },
        {
          label: "Reflective Clinical Forum",
          href: "/clinical-reflections",
          desc: "Protected student case reviews with Gibbs cycle & auto PHI scrubber",
          subdomain: "reflections.chep",
          badge: "HIPAA/NDPR",
          icon: "forum",
        },
        {
          label: "Hospital Practicum & Preceptors",
          href: "/exams#osce",
          desc: "Teaching hospital clinical posting logs & signoffs",
          icon: "local_hospital",
        },
      ],
    },
    {
      label: "Library",
      href: "/library",
      dropdown: [
        {
          label: "CHEP e-Library Main Hall",
          href: "/library",
          desc: "Over 480+ clinical eBooks & peer-reviewed journals",
          subdomain: "library.chep",
          badge: "Open Access",
          icon: "local_library",
        },
        {
          label: "Clinical eBooks (240+ Texts)",
          href: "/library#ebooks",
          desc: "Anatomy, Pharmacology, Midwifery & NCLEX-RN textbooks",
          icon: "menu_book",
        },
        {
          label: "Peer-Reviewed Journals (240+)",
          href: "/library#ejournals",
          desc: "The Lancet, AJN, WHO & Cochrane review repositories",
          icon: "newspaper",
        },
        {
          label: "AI Care-Plan Generation Studio",
          href: "/library#ai-tools",
          desc: "Automated NANDA-I nursing diagnoses & interventions",
          badge: "AI Powered",
          icon: "psychology",
        },
        {
          label: "Global Medical Databases",
          href: "/library#databases",
          desc: "PubMed, CINAHL, Medline & HINARI direct gateways",
          icon: "database",
        },
      ],
    },
    {
      label: "Campus",
      href: "/gallery",
      dropdown: [
        {
          label: "Simulation Labs & Gallery",
          href: "/gallery",
          desc: "Photographic tour of skills labs, wards & hostel life",
          icon: "photo_library",
        },
        {
          label: "News & Senate Bulletins",
          href: "/news",
          desc: "Official dispatches, matriculation & NMCN announcements",
          icon: "campaign",
        },
        {
          label: "Location & Campus Contacts",
          href: "/contact",
          desc: "Visiting hours, map directions & administrative lines",
          icon: "pin_drop",
        },
      ],
    },
    {
      label: "Portals",
      href: "/portal",
      dropdown: [
        {
          label: "Student e-Logbook & LMS",
          href: "/portal/student",
          desc: "Course registration, fee clearance & clinical logbook",
          subdomain: "portal.chep",
          icon: "badge",
        },
        {
          label: "Faculty & Preceptor Desk",
          href: "/portal/faculty",
          desc: "Clinical procedure verification & academic grading",
          subdomain: "faculty.chep",
          icon: "clinical_notes",
        },
        {
          label: "Candidate Screening Portal",
          href: "/admission/slip",
          desc: "Screening slip reprint & admission status tracker",
          icon: "assignment_ind",
        },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* Top Emergency & Accreditation Bar */}
      <div className="bg-forest-dark text-on-primary py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="tel:+234916635674"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium"
              title="Click to Call Admissions Hotline"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">call</span>
              <span className="hidden xs:inline">+234 916 635 674</span>
              <span className="xs:hidden">Call</span>
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
              className="hidden lg:flex items-center gap-1.5 hover:text-emerald-300 transition-colors text-xs text-gray-300"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">mail</span>
              enquiries@chepnursingcollege.org
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[11px] font-semibold uppercase tracking-wider text-emerald-light">
              Nursing &amp; Midwifery Council of Nigeria (NMCN) Accredited
            </span>
            <Link
              className="inline-flex items-center gap-1 text-xs font-bold text-primary-fixed hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
              href="/portal"
            >
              <span className="material-symbols-outlined text-[15px]">lock</span>
              Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name - Strictly shrink-0 to prevent squashing or overlap */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/images/chep/chep_logo.png"
            alt="CHEP College of Nursing Sciences"
            className="w-11 h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col shrink-0">
            <span className="font-extrabold text-base sm:text-lg text-forest-dark leading-tight tracking-tight whitespace-nowrap">
              CHEP College
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-forest-medium whitespace-nowrap">
              of Nursing Sciences
            </span>
          </div>
        </Link>

        {/* Desktop Horizontal Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navCategories.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.dropdown && item.dropdown.some((sub) => pathname === sub.href));

            if (item.dropdown) {
              return (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className={`text-xs xl:text-sm font-semibold transition-colors py-2 px-2.5 xl:px-3 rounded-lg flex items-center gap-1 ${
                      isActive
                        ? "text-forest-base font-bold bg-emerald-50/70"
                        : "text-gray-700 hover:text-forest-base hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-500 group-hover:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </button>

                  {/* Mega-style Rich Dropdown Menu */}
                  <div className="dropdown-menu absolute left-0 top-full pt-2 hidden group-hover:block w-80 xl:w-96 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 ring-1 ring-black/5">
                      <div className="space-y-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors group/item"
                          >
                            <span className="material-symbols-outlined text-[20px] text-forest-medium group-hover/item:text-forest-base shrink-0 mt-0.5">
                              {sub.icon || "arrow_forward"}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="text-xs xl:text-sm font-bold text-gray-900 group-hover/item:text-forest-dark truncate">
                                  {sub.label}
                                </span>
                                {sub.subdomain && (
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                                    {sub.subdomain}
                                  </span>
                                )}
                                {sub.badge && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 shrink-0">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.desc && (
                                <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mt-0.5">
                                  {sub.desc}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs xl:text-sm font-semibold transition-colors py-2 px-2.5 xl:px-3 rounded-lg whitespace-nowrap ${
                  isActive
                    ? "text-forest-base font-bold bg-emerald-50/70"
                    : "text-gray-700 hover:text-forest-base hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/admission"
            className="hidden lg:flex bg-orange-action hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-sm transition-all hover:shadow-md items-center gap-1.5 shrink-0"
          >
            <span>Enrol</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-forest-dark hover:bg-gray-100 transition-colors"
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
        <div className="lg:hidden border-t border-border-subtle bg-white px-5 py-4 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
          {navCategories.map((item) => (
            <div key={item.label} className="border-b border-gray-100 pb-2">
              {item.dropdown ? (
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between py-2 text-sm font-bold text-gray-800"
                  >
                    <span>{item.label}</span>
                    <span className="material-symbols-outlined text-[18px] text-gray-500">
                      {activeDropdown === item.label ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {activeDropdown === item.label && (
                    <div className="pl-3 pr-1 py-1 space-y-2 bg-gray-50/80 rounded-xl my-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2 text-xs font-semibold text-gray-700 hover:text-forest-base"
                        >
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-forest-medium">
                              {sub.icon || "arrow_right"}
                            </span>
                            {sub.label}
                          </span>
                          {sub.subdomain && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                              {sub.subdomain}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-bold text-gray-800 hover:text-forest-base"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-forest-base rounded-xl"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Student &amp; Faculty Portal [portal.chep]
            </Link>
            <Link
              href="/admission/slip"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl"
            >
              <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
              Candidate Screening Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
