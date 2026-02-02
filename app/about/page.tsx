import Link from "next/link";

export default function About() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24">
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
      <div className="relative z-10 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-[0.15em] uppercase [text-shadow:_0_0_60px_rgba(220,38,38,0.4)]">
            About
          </h1>
          <div className="mt-6 w-24 h-px mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {/* Main content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-light">01</span>
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
            </div>
            <h2 className="text-2xl font-light text-white tracking-wide mb-4">
              What is Vibe Drive?
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              Vibe Drive is a live AI-coding experiment. This entire website is being built and 
              modified in real-time by an AI agent. When the agent receives a prompt, you can 
              watch the code being written, the changes being made, and the site evolving — all 
              live, right here.
            </p>
          </section>

          {/* Section 2 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-light">02</span>
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
            </div>
            <h2 className="text-2xl font-light text-white tracking-wide mb-4">
              How It Works
            </h2>
            <p className="text-white/60 leading-relaxed font-light mb-4">
              Behind the scenes, a receiver server accepts prompts and spawns an AI coding agent.
              The agent&apos;s output streams to all connected browsers via Server-Sent Events. 
              When changes are complete, refreshing reveals the new reality.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Next.js", "SSE Events", "AI Agent", "Real-time"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs tracking-wider uppercase text-white/50 border border-white/10 rounded-full bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-light">03</span>
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
            </div>
            <h2 className="text-2xl font-light text-white tracking-wide mb-4">
              The Vision
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              This is &ldquo;vibe coding&rdquo; — the art of guiding AI to build software through 
              natural language. No manual typing, just pure creative direction. Vibe Drive 
              showcases what happens when you let go of the keyboard and trust the machine 
              to translate vision into reality.
            </p>
          </section>

          {/* Quote block */}
          <div className="relative mt-16 py-8 px-6 border-l-2 border-red-500/50 bg-gradient-to-r from-white/5 to-transparent">
            <p className="text-white/80 text-lg italic font-light leading-relaxed">
              &ldquo;The future of software isn&apos;t about writing code. 
              It&apos;s about describing what you want and watching it materialize.&rdquo;
            </p>
            <div className="mt-4 text-white/40 text-sm tracking-wider uppercase">
              — The Vibe Drive Manifesto
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
