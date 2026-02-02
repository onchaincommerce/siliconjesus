"use client";

import Link from "next/link";
import { useState } from "react";

const stories = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer @ Stripe",
    avatar: "SC",
    car: "Model 3 Performance",
    story: "I was skeptical at first, but now I ship more code during my 45-minute commute than I do in my first 2 hours at the office. FSD handles the Bay Area traffic while I handle the codebase.",
    stats: { commits: "2,847", miles: "12,340", saved: "180 hrs" },
    gradient: "from-red-500 to-orange-500",
  },
  {
    name: "Marcus Johnson",
    role: "Founding Engineer @ Series A Startup",
    avatar: "MJ",
    car: "Model Y Long Range",
    story: "When you're at a startup, every hour counts. Vibe driving gave me back 10 hours a week. That's the difference between shipping on time and missing deadlines.",
    stats: { commits: "5,231", miles: "28,500", saved: "420 hrs" },
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Emily Rodriguez",
    role: "Staff Engineer @ Netflix",
    avatar: "ER",
    car: "Model S Plaid",
    story: "The flow state you achieve when you're cruising at 75mph with FSD is unmatched. No Slack notifications, no shoulder taps, just pure focus. I've never been more productive.",
    stats: { commits: "1,923", miles: "8,200", saved: "95 hrs" },
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Alex Kim",
    role: "Independent Contractor",
    avatar: "AK",
    car: "Model 3 Standard",
    story: "As a freelancer, time is literally money. I bill $200/hr and my commute is 2 hours round trip. Do the math. Vibe driving pays for itself every single week.",
    stats: { commits: "3,456", miles: "19,800", saved: "285 hrs" },
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "David Park",
    role: "Tech Lead @ Google",
    avatar: "DP",
    car: "Model X",
    story: "I review PRs, write design docs, and even do 1:1s on video calls during my commute. My team doesn't even know I'm in a moving vehicle. The future is now.",
    stats: { commits: "4,102", miles: "15,600", saved: "220 hrs" },
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Jessica Taylor",
    role: "CTO @ YC Startup",
    avatar: "JT",
    car: "Model Y Performance",
    story: "I built our entire MVP during my commutes. 6 weeks of vibe driving and we had a product ready for demo day. Investors couldn't believe it was built 'in transit'.",
    stats: { commits: "8,934", miles: "6,400", saved: "150 hrs" },
    gradient: "from-pink-500 to-rose-500",
  },
];

const communityStats = [
  { label: "Active Vibers", value: "12,847", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Miles Driven", value: "2.4M+", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { label: "Lines Shipped", value: "48M+", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { label: "Hours Saved", value: "847K", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export default function Community() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

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
      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-[0.15em] uppercase [text-shadow:_0_0_60px_rgba(220,38,38,0.4)]">
            Community
          </h1>
          <p className="mt-6 text-white/50 text-lg font-light max-w-2xl mx-auto">
            Real stories from engineers who&apos;ve transformed their commute into shipping time
          </p>
          <div className="mt-6 w-24 h-px mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {communityStats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <svg className="w-6 h-6 mx-auto mb-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
              </svg>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={story.name}
              className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer ${
                expandedStory === index ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={() => setExpandedStory(expandedStory === index ? null : index)}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
                  {story.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{story.name}</h3>
                  <p className="text-white/50 text-sm truncate">{story.role}</p>
                  <p className="text-white/30 text-xs mt-1">{story.car}</p>
                </div>
              </div>

              {/* Story */}
              <p className={`text-white/60 text-sm leading-relaxed mb-4 ${
                expandedStory === index ? "" : "line-clamp-3"
              }`}>
                &ldquo;{story.story}&rdquo;
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="text-center flex-1">
                  <div className="text-white font-medium text-sm">{story.stats.commits}</div>
                  <div className="text-white/40 text-xs">Commits</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center flex-1">
                  <div className="text-white font-medium text-sm">{story.stats.miles}</div>
                  <div className="text-white/40 text-xs">Miles</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center flex-1">
                  <div className="text-white font-medium text-sm">{story.stats.saved}</div>
                  <div className="text-white/40 text-xs">Saved</div>
                </div>
              </div>

              {/* Expand indicator */}
              <div className="absolute top-4 right-4 text-white/30 group-hover:text-white/50 transition-colors">
                <svg className={`w-4 h-4 transition-transform ${expandedStory === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
            <h2 className="text-2xl font-light text-white mb-4">Share Your Story</h2>
            <p className="text-white/50 mb-6 max-w-md">
              Are you a vibe driver? We&apos;d love to hear about your experience and feature you in our community.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-medium tracking-wider uppercase transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Submit Your Story
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
