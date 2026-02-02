import Link from "next/link";

const features = [
  {
    title: "FSD Integration",
    description: "Tesla's Full Self-Driving handles navigation while you focus on what matters—shipping code. The ultimate hands-free development experience.",
    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10 M17 16V8a1 1 0 00-1-1h-4",
    color: "red",
    stats: "99.9% Attention Free",
  },
  {
    title: "Mobile Dev Studio",
    description: "Your Tesla becomes a climate-controlled, noise-isolated development environment. Premium audio for focus playlists, adjustable lighting, and ergonomic seating.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "cyan",
    stats: "68°F Always",
  },
  {
    title: "AI Pair Programming",
    description: "Claude handles code suggestions, debugging, and documentation while Tesla handles the road. Two AI systems working in perfect harmony.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    color: "purple",
    stats: "2x Ship Speed",
  },
  {
    title: "Zero Interruptions",
    description: "No Slack pings. No shoulder taps. No impromptu meetings. Just pure, uninterrupted flow state from origin to destination.",
    icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
    color: "green",
    stats: "0 Distractions",
  },
  {
    title: "Starlink Connectivity",
    description: "With Tesla's Starlink integration, maintain blazing-fast internet connectivity anywhere. Push to production from the middle of nowhere.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "blue",
    stats: "200 Mbps+",
  },
  {
    title: "Voice Commands",
    description: "Use natural voice commands to navigate your IDE, run tests, and even commit code. Your voice becomes the keyboard.",
    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    color: "pink",
    stats: "Hands-Free",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  red: { bg: "bg-red-500/20", text: "text-red-400", border: "hover:border-red-500/30", glow: "rgba(239,68,68,0.3)" },
  cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "hover:border-cyan-500/30", glow: "rgba(6,182,212,0.3)" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "hover:border-purple-500/30", glow: "rgba(168,85,247,0.3)" },
  green: { bg: "bg-green-500/20", text: "text-green-400", border: "hover:border-green-500/30", glow: "rgba(34,197,94,0.3)" },
  blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "hover:border-blue-500/30", glow: "rgba(59,130,246,0.3)" },
  pink: { bg: "bg-pink-500/20", text: "text-pink-400", border: "hover:border-pink-500/30", glow: "rgba(236,72,153,0.3)" },
};

export default function Features() {
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
            Features
          </h1>
          <p className="mt-6 text-white/50 text-lg font-light max-w-2xl mx-auto">
            Everything you need to transform your Tesla into a mobile development powerhouse
          </p>
          <div className="mt-6 w-24 h-px mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <div
                key={feature.title}
                className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 ${colors.border} transition-all duration-500 hover:bg-white/[0.07] hover:scale-[1.02]`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${colors.glow}` }}
                />
                
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 relative`}>
                  <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                
                <h3 className="text-white font-medium mb-2 text-lg">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} border border-white/10`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text', 'bg')}`} />
                  <span className={`text-xs ${colors.text} font-medium`}>{feature.stats}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
            <h2 className="text-2xl font-light text-white mb-4">Ready to Start Vibe Driving?</h2>
            <p className="text-white/50 mb-6 max-w-md">
              Join thousands of developers who&apos;ve already transformed their commute into productive coding sessions.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/"
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-medium tracking-wider uppercase transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium tracking-wider uppercase transition-all"
              >
                Learn More
              </Link>
            </div>
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
