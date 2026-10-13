"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdmissionsConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);

  const faqs = [
    {
      q: "What is the 2026/2027 Application Fee?",
      a: "The standard application fee is ₦15,000 for Basic Nursing and ₦20,000 for Post-Basic Midwifery, payable strictly through official Remita RRR on our portal.",
    },
    {
      q: "Which O'Level subjects are mandatory?",
      a: "Five (5) credits in English Language, Mathematics, Biology, Chemistry, and Physics in WAEC, NECO, or NABTEB at not more than two sittings.",
    },
    {
      q: "Where is the Computer-Based Screening held?",
      a: "At the CHEP ICT & Virtual Examination Center, Main Campus, No. 18 Agbebi Estate Road, Honda Bus-Stop, Ota, Ogun State.",
    },
    {
      q: "Is CHEP College accredited by NMCN?",
      a: "Yes. All academic programs are fully accredited by the Nursing and Midwifery Council of Nigeria (NMCN) and approved by the Federal Ministry of Health.",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden">
      {/* Expanded Modal */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-forest-dark text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-forest-medium flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined text-[22px]">support_agent</span>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-accent border-2 border-forest-dark absolute bottom-0 right-0 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Admissions Concierge</h4>
                <span className="text-[11px] text-emerald-light flex items-center gap-1 font-semibold">
                  CHEP Registry Desk • Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto text-xs">
            <p className="text-gray-600 leading-relaxed bg-surface-canvas p-3 rounded-xl border border-gray-100">
              Welcome to <strong>CHEP College of Nursing Sciences</strong>. How may we assist your 2026/2027 admissions journey today?
            </p>

            {/* Quick Action Buttons */}
            <div className="space-y-2">
              <a
                href="https://wa.me/234916635674?text=Hello%20CHEP%20Admissions%20Office%2C%20I%20would%20like%20to%20inquire%20about%202026%2F2027%20Nursing%20Admissions%20and%20Screening%20requirements."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Chat on Official WhatsApp (+234 916 635 674)
              </a>

              <a
                href="tel:+234916635674"
                className="w-full py-2.5 px-3 bg-forest-base hover:bg-forest-medium text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Registry Desk Directly
              </a>
            </div>

            {/* Instant FAQs */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest-medium block">
                Frequently Asked Questions:
              </span>
              <div className="space-y-1.5">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setSelectedFaq(selectedFaq === faq.q ? null : faq.q)}
                      className="w-full text-left p-2.5 bg-surface-canvas hover:bg-surface-tint font-bold text-gray-800 flex items-center justify-between transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-[16px] text-gray-400">
                        {selectedFaq === faq.q ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                    {selectedFaq === faq.q && (
                      <div className="p-2.5 bg-white text-gray-600 text-[11px] leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Portal Links */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
              <Link
                href="/admission"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-surface-canvas border border-gray-200 text-center font-bold text-forest-dark hover:bg-surface-tint transition-colors block"
              >
                Apply Online
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-surface-canvas border border-gray-200 text-center font-bold text-forest-dark hover:bg-surface-tint transition-colors block"
              >
                Book Campus Tour
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-forest-base hover:bg-forest-medium text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-emerald-400/40 group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent animate-ping"></span>
        <span className="material-symbols-outlined text-[22px]">
          {isOpen ? "close" : "forum"}
        </span>
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
          Admissions Concierge
        </span>
      </button>
    </div>
  );
}
