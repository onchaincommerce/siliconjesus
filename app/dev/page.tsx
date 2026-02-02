import Hero3DText from '../components/Hero3DText';
import TestimonialCarousel from '../components/TestimonialCarousel';
import CommuteCalculator from '../components/CommuteCalculator';

export default function DevHome() {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-start overflow-hidden bg-black">
      
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
      
      {/* Distant galaxy glow */}
      <div className="absolute top-[20%] left-[60%] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-[30%] left-[20%] w-24 h-24 bg-red-500/10 rounded-full blur-xl" />
      
      {/* Tesla signature red horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/10 to-transparent" />
      
      {/* Shooting stars */}
      <div className="shooting-star absolute top-[15%] left-[10%]" />
      <div className="shooting-star-2 absolute top-[35%] right-[20%]" />
      
      {/* Hero Section */}
      <div className="relative z-10 text-center w-full pt-16">
        <Hero3DText />
        <p className="mt-4 text-white/50 text-xl md:text-2xl tracking-[0.4em] uppercase font-light">
          Vibe Coding Meets Full Self-Driving
        </p>
        <div className="mt-8 w-24 h-px mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        
        <div className="mt-10 flex items-center justify-center gap-12 text-white/40 text-base md:text-lg tracking-[0.3em] uppercase">
          <span className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            FSD Active
          </span>
          <span className="flex items-center gap-3">
            <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            Vibe Mode On
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 px-8 max-w-6xl">
        <div className="text-center">
          <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            2.4M+
          </div>
          <div className="text-white/50 text-lg mt-3">Lines of Code Written</div>
          <div className="text-white/30 text-base mt-1">While on Autopilot</div>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            847K
          </div>
          <div className="text-white/50 text-lg mt-3">Miles Driven</div>
          <div className="text-white/30 text-base mt-1">In Vibe Mode</div>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            12.3K
          </div>
          <div className="text-white/50 text-lg mt-3">PRs Shipped</div>
          <div className="text-white/30 text-base mt-1">From Driver Seats</div>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            $47M
          </div>
          <div className="text-white/50 text-lg mt-3">Revenue Generated</div>
          <div className="text-white/30 text-base mt-1">By Mobile Devs</div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="relative z-10 mt-24 px-8 max-w-6xl w-full">
        <h2 className="text-center text-white/70 text-lg md:text-xl tracking-[0.3em] uppercase mb-14">
          How Engineers Are Leveraging FSD
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors">
            <div className="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-medium text-xl mb-3">Reclaim Commute Time</h3>
            <p className="text-white/50 text-base leading-relaxed">
              The average American spends 54 minutes commuting daily. That&apos;s 4.5 hours a week of potential deep work. FSD turns dead time into dev time.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-white font-medium text-xl mb-3">Flow State on Wheels</h3>
            <p className="text-white/50 text-base leading-relaxed">
              No Slack notifications. No tap on the shoulder. Just you, your code, and the open road. FSD creates the perfect environment for uninterrupted focus.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
            <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-medium text-xl mb-3">AI + Autopilot Synergy</h3>
            <p className="text-white/50 text-base leading-relaxed">
              Claude handles your code suggestions while Tesla handles the road. Two AIs working in harmony so you can ship faster than ever before.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Section Label */}
      <div className="relative z-10 mt-28 text-center">
        <h2 className="text-white/70 text-lg md:text-xl tracking-[0.3em] uppercase">
          What Developers Are Saying
        </h2>
        <div className="mt-4 w-32 h-px mx-auto bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </div>

      {/* Testimonial Carousel */}
      <div className="relative z-10 mt-8 w-full">
        <TestimonialCarousel />
      </div>

      {/* Productivity Calculator */}
      <div className="relative z-10 mt-28 px-8 w-full">
        <div className="text-center mb-10">
          <h2 className="text-white/70 text-lg md:text-xl tracking-[0.3em] uppercase">
            Calculate Your Potential
          </h2>
          <div className="mt-4 w-32 h-px mx-auto bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>
        <CommuteCalculator />
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-20 mb-24 text-center px-8">
        <p className="text-white/60 text-2xl md:text-3xl font-light max-w-3xl mx-auto leading-relaxed">
          The future of work isn&apos;t about where you sit. It&apos;s about what you ship.
        </p>
        <p className="mt-6 text-white/40 text-lg">
          Join thousands of engineers who&apos;ve turned their Tesla into a mobile development studio.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/50 text-base">
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            Works with Model 3, Y, S, X
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/50 text-base">
            <span className="w-3 h-3 bg-blue-500 rounded-full" />
            FSD v12+ Recommended
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/50 text-base">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            Not Legal Advice
          </div>
        </div>
      </div>
    </main>
  );
}
