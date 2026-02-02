'use client';

import { useState, useEffect } from 'react';

export default function CommuteCalculator() {
  const [commuteMinutes, setCommuteMinutes] = useState(30);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate derived values
  const hoursPerWeek = (commuteMinutes * 2 * daysPerWeek) / 60; // Round trip
  const hoursPerYear = hoursPerWeek * 50; // ~50 work weeks

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`w-full max-w-5xl mx-auto transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Productivity Calculator
          </h3>
          <p className="text-white/50 text-lg md:text-xl">
            See how much dev time you could reclaim
          </p>
        </div>

        {/* Input Controls - 2 columns */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {/* Commute Time Slider */}
          <div>
            <label className="block text-white/70 text-lg md:text-xl mb-4">
              One-way commute time
            </label>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="90"
                value={commuteMinutes}
                onChange={(e) => setCommuteMinutes(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8
                  [&::-webkit-slider-thumb]:h-8
                  [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-red-500
                  [&::-webkit-slider-thumb]:to-red-600
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-red-500/30
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="flex justify-between mt-3 text-base text-white/40">
                <span>10 min</span>
                <span>90 min</span>
              </div>
            </div>
            <div className="mt-5 text-center">
              <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {commuteMinutes}
              </span>
              <span className="text-white/50 text-2xl ml-3">min</span>
            </div>
          </div>

          {/* Days Per Week */}
          <div>
            <label className="block text-white/70 text-lg md:text-xl mb-4">
              Days per week
            </label>
            <div className="flex gap-4">
              {[3, 4, 5].map((days) => (
                <button
                  key={days}
                  onClick={() => setDaysPerWeek(days)}
                  className={`flex-1 py-5 rounded-2xl text-2xl font-bold transition-all ${
                    daysPerWeek === days
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                  }`}
                >
                  {days}
                </button>
              ))}
            </div>
            <p className="mt-5 text-center text-white/40 text-lg">
              {daysPerWeek === 5 ? 'Full office week' : daysPerWeek === 4 ? 'Hybrid schedule' : 'Part-time'}
            </p>
          </div>
        </div>

        {/* Results - Big and Simple */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {hoursPerWeek.toFixed(1)}
            </div>
            <div className="text-white/60 text-xl md:text-2xl mt-3">hours per week</div>
          </div>
          <div className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {Math.round(hoursPerYear)}
            </div>
            <div className="text-white/60 text-xl md:text-2xl mt-3">hours per year</div>
          </div>
        </div>

        {/* Simple Insight */}
        <div className="mt-10 text-center">
          <p className="text-white/70 text-xl md:text-2xl">
            That&apos;s <span className="text-white font-semibold">{Math.round(hoursPerYear / 40)} extra work weeks</span> of coding time annually
          </p>
        </div>
      </div>
    </div>
  );
}
