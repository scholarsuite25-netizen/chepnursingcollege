"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentGatewayPage() {
  const [rrrInput, setRrrInput] = useState("");
  const [searchedRecord, setSearchedRecord] = useState<any | null>(null);
  const [paymentStep, setPaymentStep] = useState<"search" | "checkout" | "receipt">("search");
  const [isProcessing, setIsProcessing] = useState(false);

  const demoRecords: Record<string, any> = {
    "RRR-2901-4412-8819": {
      rrr: "RRR-2901-4412-8819",
      payer: "Adebayo Oluwaseun",
      service: "2026/2027 Basic Nursing Application Fee",
      amount: "₦15,000.00",
      status: "Paid",
      date: "March 20, 2026",
    },
    "RRR-4419-8201-9921": {
      rrr: "RRR-4419-8201-9921",
      payer: "Ifeoluwa Ayomide (CHEP/NUR/2025/0842)",
      service: "Year 2 Tuition & Clinical Posting Levy",
      amount: "₦285,000.00",
      status: "Paid",
      date: "October 12, 2025",
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRrr = rrrInput.trim();
    if (demoRecords[cleanRrr]) {
      setSearchedRecord(demoRecords[cleanRrr]);
    } else {
      // Dynamic generated mock record
      setSearchedRecord({
        rrr: cleanRrr || "RRR-" + Math.floor(1000000000 + Math.random() * 9000000000),
        payer: "Prospective Nursing Candidate",
        service: "2026/2027 Professional Nursing Screening & Indexing Fee",
        amount: "₦15,000.00",
        status: "Pending",
        date: new Date().toLocaleDateString("en-GB"),
      });
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (searchedRecord) {
        setSearchedRecord({ ...searchedRecord, status: "Paid" });
      }
      setPaymentStep("receipt");
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Banner */}
        <section className="w-full bg-forest-dark text-white py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-fixed text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              Remita RRR &amp; Electronic Collections Gateway
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Institutional Fee Verification &amp; Online Payment
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
              Verify your Remita Retrieval Reference (RRR), complete application payments, and download certified academic fee receipts for CHEP College of Nursing Sciences.
            </p>
          </div>
        </section>

        {/* Payment Workspace */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
          {paymentStep === "receipt" && searchedRecord ? (
            /* PRINTABLE OFFICIAL RECEIPT */
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-border-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-forest-base/10 flex items-center justify-center text-forest-base">
                    <span className="material-symbols-outlined text-[32px]">local_hospital</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-forest-dark leading-tight">CHEP College of Nursing Sciences</h2>
                    <span className="text-xs text-text-muted">Official Treasury &amp; Bursary Receipt</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-forest-base hover:bg-forest-medium text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    Print Receipt
                  </button>
                  <button
                    onClick={() => {
                      setPaymentStep("search");
                      setSearchedRecord(null);
                      setRrrInput("");
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
                  Transaction Cleared &amp; Approved by Remita
                </div>
                <span className="font-mono">{searchedRecord.date}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-surface-canvas border border-gray-100 space-y-1">
                  <span className="text-text-muted block">Remita Retrieval Reference (RRR)</span>
                  <span className="font-mono text-base font-bold text-gray-900">{searchedRecord.rrr}</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-canvas border border-gray-100 space-y-1">
                  <span className="text-text-muted block">Amount Cleared</span>
                  <span className="text-base font-bold text-forest-dark">{searchedRecord.amount}</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-canvas border border-gray-100 space-y-1">
                  <span className="text-text-muted block">Payer / Candidate</span>
                  <span className="font-bold text-gray-900">{searchedRecord.payer}</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-canvas border border-gray-100 space-y-1">
                  <span className="text-text-muted block">Service Description</span>
                  <span className="font-semibold text-gray-900">{searchedRecord.service}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2">
                <span>Accreditation Node: NMCN-OGUN-OTA-041</span>
                <span>Bursary Desk: +234 916 635 674</span>
              </div>
            </div>
          ) : (
            /* SEARCH & VERIFICATION PANEL */
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-border-subtle space-y-4">
                <h2 className="text-lg font-bold text-forest-dark">Verify or Pay with RRR</h2>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    value={rrrInput}
                    onChange={(e) => setRrrInput(e.target.value)}
                    placeholder="Enter Remita RRR (e.g. RRR-2901-4412-8819)"
                    className="flex-1 h-12 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:border-forest-base font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-forest-base hover:bg-forest-medium text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-xs"
                  >
                    Verify Status
                  </button>
                </form>
                <div className="text-xs text-text-muted flex items-center gap-2">
                  <span>Quick demo RRR numbers:</span>
                  <button
                    type="button"
                    onClick={() => setRrrInput("RRR-2901-4412-8819")}
                    className="text-forest-base font-mono font-bold hover:underline"
                  >
                    RRR-2901-4412-8819
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setRrrInput("RRR-4419-8201-9921")}
                    className="text-forest-base font-mono font-bold hover:underline"
                  >
                    RRR-4419-8201-9921
                  </button>
                </div>
              </div>

              {searchedRecord && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-border-subtle space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-xs font-bold text-forest-medium uppercase block">Invoice Record</span>
                      <h3 className="text-lg font-bold text-forest-dark">{searchedRecord.service}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        searchedRecord.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {searchedRecord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-muted block">RRR Reference:</span>
                      <strong className="font-mono text-gray-900">{searchedRecord.rrr}</strong>
                    </div>
                    <div>
                      <span className="text-text-muted block">Total Payable:</span>
                      <strong className="text-forest-dark text-base">{searchedRecord.amount}</strong>
                    </div>
                    <div>
                      <span className="text-text-muted block">Payer Name:</span>
                      <strong className="text-gray-900">{searchedRecord.payer}</strong>
                    </div>
                    <div>
                      <span className="text-text-muted block">Generation Date:</span>
                      <span className="text-gray-700">{searchedRecord.date}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    {searchedRecord.status === "Paid" ? (
                      <button
                        onClick={() => setPaymentStep("receipt")}
                        className="bg-forest-base hover:bg-forest-medium text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt</span>
                        View Certified Receipt
                      </button>
                    ) : (
                      <button
                        onClick={handlePayNow}
                        disabled={isProcessing}
                        className="w-full bg-orange-action hover:bg-orange-700 text-white text-sm font-bold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-75"
                      >
                        {isProcessing ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                            Connecting to Remita Gateway...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">credit_card</span>
                            Pay {searchedRecord.amount} Online Now
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
