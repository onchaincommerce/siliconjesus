'use client';

import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer @ Stripe",
    text: "Shipped a complete payment integration during my 45-minute commute. FSD handled the 101, I handled the code.",
    car: "Model 3"
  },
  {
    name: "Marcus Rodriguez",
    role: "Indie Hacker",
    text: "Built my entire SaaS MVP over two weeks of commuting. My Tesla became my mobile office. Revenue hit $10k MRR.",
    car: "Model Y"
  },
  {
    name: "Emily Zhang",
    role: "Staff Engineer @ Vercel",
    text: "Reviewed 47 PRs last month without losing a single minute of personal time. FSD + Vibe Drive = life hack.",
    car: "Model S"
  },
  {
    name: "James Okonkwo",
    role: "Startup Founder",
    text: "Pitched our Series A deck on a call while FSD cruised through LA traffic. Closed the round. Changed everything.",
    car: "Model X"
  },
  {
    name: "Priya Sharma",
    role: "DevRel @ Supabase",
    text: "Wrote documentation for three new features during a road trip. 6 hours of pure productive flow state.",
    car: "Model 3"
  },
  {
    name: "Alex Turner",
    role: "Freelance Developer",
    text: "Client deadlines used to stress me out. Now I just hop in my Tesla and code my way through traffic. Billable hours doubled.",
    car: "Model Y"
  },
  {
    name: "Nina Kowalski",
    role: "Engineering Manager",
    text: "1-on-1s during my commute, code reviews on the highway. My team thinks I have a time machine. I have a Tesla.",
    car: "Model S"
  },
  {
    name: "David Kim",
    role: "Open Source Maintainer",
    text: "Merged 200+ contributions to my project this year. Most of them reviewed while FSD navigated San Francisco.",
    car: "Model 3"
  },
  {
    name: "Olivia Martinez",
    role: "AI Researcher",
    text: "Training models takes patience. So does LA traffic. Now I do both at once. Efficiency through absurdity.",
    car: "Model X"
  },
  {
    name: "Ryan Foster",
    role: "CTO @ Early Stage Startup",
    text: "Debugged a production incident from the carpool lane. Users never noticed. My co-founder still doesn't believe me.",
    car: "Model Y"
  },
  {
    name: "Aisha Johnson",
    role: "Full Stack Developer",
    text: "Deployed to production 127 times from my driver seat this year. Zero rollbacks. FSD has better uptime than AWS.",
    car: "Model 3"
  },
  {
    name: "Michael Chang",
    role: "Tech Lead @ Netflix",
    text: "Refactored our entire auth system during a drive to Tahoe. 4 hours of uninterrupted deep work. Mountains included.",
    car: "Model S"
  }
];

export default function TestimonialCarousel() {
  const [offset, setOffset] = useState(0);
  
  // Card width + gap (500px + 32px gap)
  const cardWidth = 500;
  const gap = 32;
  const singleSetWidth = testimonials.length * (cardWidth + gap);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = prev - 1;
        // Reset seamlessly when we've scrolled through one full set
        if (Math.abs(newOffset) >= singleSetWidth) {
          return 0;
        }
        return newOffset;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [singleSetWidth]);

  // Duplicate testimonials for seamless loop (need at least 2 sets for smooth infinite scroll)
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  return (
    <div className="w-screen overflow-hidden py-10 carousel-mask">
      <div 
        className="flex gap-8 transition-none"
        style={{ 
          transform: `translateX(${offset}px)`,
          width: 'fit-content'
        }}
      >
        {allTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[500px] p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-colors duration-300"
          >
            <div className="flex items-start gap-2 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-lg">{testimonial.name}</p>
                <p className="text-white/50 text-base">{testimonial.role}</p>
              </div>
              <div className="flex items-center gap-2 text-white/30 text-base">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM18 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM8 18v-4.5H6l4-7.5v5h2l-4 7z"/>
                </svg>
                <span>{testimonial.car}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
