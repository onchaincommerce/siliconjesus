"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    category: "Safety & Legality",
    questions: [
      {
        q: "Is it legal to code while using FSD?",
        a: "This depends on your jurisdiction. While Tesla's FSD is classified as a Level 2 autonomous system requiring driver attention, laws vary by location. Vibe Drive is a satirical concept that highlights the potential of autonomous driving technology. Always follow local laws and Tesla's guidelines for FSD usage. We are not providing legal advice."
      },
      {
        q: "Is it safe to code while the car is driving?",
        a: "Tesla's FSD requires drivers to remain attentive and ready to take control at any moment. The concept of 'vibe driving' is presented humorously. If you choose to use your commute productively, always prioritize safety and maintain awareness of your surroundings. Never code in situations requiring active driving."
      },
      {
        q: "What if FSD makes a mistake?",
        a: "FSD is not perfect and requires human oversight. Always be prepared to take control immediately. The 'vibe driving' concept assumes future improvements in autonomous technology. Currently, your primary responsibility while driving is driving."
      }
    ]
  },
  {
    category: "Technical Setup",
    questions: [
      {
        q: "What equipment do I need?",
        a: "For the theoretical 'vibe driving' setup: A Tesla with FSD capability (v12+ recommended), a laptop with good battery life, mobile hotspot or Starlink connectivity, and ergonomic accessories like a lap desk. In practice, these are best used when parked."
      },
      {
        q: "How do you maintain internet connectivity?",
        a: "Options include: Tesla's built-in LTE, mobile hotspot from your phone, dedicated 5G hotspot device, or Tesla's Starlink integration (where available). Most coding tasks can also be done offline and synced later."
      },
      {
        q: "What about screen glare and visibility?",
        a: "Anti-glare screen protectors, adjustable screen brightness, and positioning your laptop away from direct sunlight all help. Many 'vibe drivers' report early morning or evening commutes work best for visibility."
      }
    ]
  },
  {
    category: "Productivity",
    questions: [
      {
        q: "How much can I actually get done?",
        a: "Hypothetically, a 45-minute commute could yield 30-40 minutes of productive coding time. That's 5-7 hours per week of additional development time. Many developers report this time is especially valuable for deep work without interruptions."
      },
      {
        q: "What types of work are best suited for vibe driving?",
        a: "Tasks that don't require frequent reference to multiple screens work best: code reviews, writing documentation, debugging specific issues, planning and architecture thinking, and pair programming via voice."
      },
      {
        q: "How do you handle meetings?",
        a: "Video calls work surprisingly well with a stable mount and good connectivity. Many 'vibe drivers' report taking calls with cameras on, and colleagues don't notice they're in a moving vehicle. Noise cancellation helps significantly."
      }
    ]
  },
  {
    category: "The Project",
    questions: [
      {
        q: "What is Vibe Drive really about?",
        a: "Vibe Drive is a live AI-coding demonstration. This entire website is built and modified in real-time by an AI agent. It's a showcase of 'vibe coding' - describing what you want and watching AI build it. The Tesla/FSD theme is satirical commentary on productivity culture."
      },
      {
        q: "Is this a real product or service?",
        a: "No. Vibe Drive is an art project and technical demonstration. There's no product to buy, no service to sign up for. It's a commentary on the intersection of autonomous technology, remote work, and AI-assisted development."
      },
      {
        q: "How can I try vibe coding myself?",
        a: "You can experiment with AI coding assistants like Claude, GitHub Copilot, or Cursor. The magic of vibe coding is in learning to describe your intent clearly and letting AI handle the implementation. No Tesla required."
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-black px-6 py-24">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a12] to-[#0d0515]" />

      {/* Interstellar nebula - Tesla red */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-red-600/20 rounded-full blur-[120px] animate-nebula" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-red-700/15 rounded-full blur-[100px] animate-nebula-slow" />

      {/* Interstellar nebula - Electric blue */}
      <div className="absolute top-1/3 left-0 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-nebula-slow" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-nebula" />

      {/* Deep purple cosmic dust */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]" />

      {/* Stars field */}
      <div className="stars absolute inset-0" />
      <div className="stars-2 absolute inset-0" />
      <div className="stars-3 absolute inset-0" />

      {/* Tesla signature red horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-[0.15em] uppercase [text-shadow:_0_0_60px_rgba(220,38,38,0.4)]">
            FAQ
          </h1>
          <p className="mt-6 text-white/50 text-lg font-light max-w-2xl mx-auto">
            Everything you need to know about vibe driving and this project
          </p>
          <div className="mt-6 w-24 h-px mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, sectionIndex) => (
            <div key={section.category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-light">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-light text-white tracking-wide">
                  {section.category}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {section.questions.map((item, qIndex) => {
                  const itemId = `${sectionIndex}-${qIndex}`;
                  const isOpen = openItems.has(itemId);

                  return (
                    <div
                      key={itemId}
                      className="rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <span className="text-white/90 font-light pr-4">{item.q}</span>
                        <svg
                          className={`w-5 h-5 text-red-500 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="h-px bg-gradient-to-r from-red-500/30 to-transparent mb-4" />
                          <p className="text-white/60 leading-relaxed text-sm">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
            <svg className="w-12 h-12 mx-auto mb-4 text-red-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-light text-white mb-4">Still Have Questions?</h2>
            <p className="text-white/50 mb-6 max-w-md">
              Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-medium tracking-wider uppercase transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 text-sm tracking-wider uppercase hover:text-white transition-colors group"
          >
            <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-red-500 transition-all" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
