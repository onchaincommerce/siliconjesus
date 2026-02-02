'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

interface WarpStar {
  id: number;
  x: number;
  y: number;
  z: number;
  speed: number;
}

export default function LudicrousMode() {
  const [isActive, setIsActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [warpStars, setWarpStars] = useState<WarpStar[]>([]);
  const [speed, setSpeed] = useState(0);
  const [linesOfCode, setLinesOfCode] = useState(0);
  const keysPressed = useRef<string[]>([]);
  const animationRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particleId = useRef(0);
  const starId = useRef(0);

  // Secret code: "VIBE" or press 'L' key
  const secretCode = ['v', 'i', 'b', 'e'];

  const activateLudicrousMode = useCallback(() => {
    setIsActive(true);
    setSpeed(0);
    setLinesOfCode(0);
    
    // Initialize warp stars
    const initialStars: WarpStar[] = [];
    for (let i = 0; i < 200; i++) {
      initialStars.push({
        id: starId.current++,
        x: (Math.random() - 0.5) * window.innerWidth * 3,
        y: (Math.random() - 0.5) * window.innerHeight * 3,
        z: Math.random() * 2000,
        speed: 2 + Math.random() * 8,
      });
    }
    setWarpStars(initialStars);
  }, []);

  const deactivateLudicrousMode = useCallback(() => {
    setIsActive(false);
    setWarpStars([]);
    setParticles([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Listen for secret code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Quick toggle with 'L' key
      if (e.key.toLowerCase() === 'l' && !e.ctrlKey && !e.metaKey) {
        if (isActive) {
          deactivateLudicrousMode();
        } else {
          activateLudicrousMode();
        }
        return;
      }

      // Secret VIBE code
      keysPressed.current.push(e.key.toLowerCase());
      if (keysPressed.current.length > 4) {
        keysPressed.current.shift();
      }
      
      if (keysPressed.current.join('') === secretCode.join('')) {
        if (!isActive) {
          activateLudicrousMode();
        }
        keysPressed.current = [];
      }

      // Escape to exit
      if (e.key === 'Escape' && isActive) {
        deactivateLudicrousMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, activateLudicrousMode, deactivateLudicrousMode]);

  // Show hint after 10 seconds on page
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      if (!isActive) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 5000);
      }
    }, 15000);

    return () => clearTimeout(hintTimer);
  }, [isActive]);

  // Mouse tracking for particle trail
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mousePos.current.x;
      const dy = e.clientY - mousePos.current.y;
      
      // Create trail particles
      const newParticles: Particle[] = [];
      const colors = ['#ef4444', '#f97316', '#eab308', '#22d3ee', '#a855f7'];
      
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          id: particleId.current++,
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: -dx * 0.1 + (Math.random() - 0.5) * 2,
          vy: -dy * 0.1 + (Math.random() - 0.5) * 2,
          life: 1,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      
      setParticles(prev => [...prev.slice(-100), ...newParticles]);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  // Animation loop
  useEffect(() => {
    if (!isActive) return;

    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Update speed (ramps up to ~420)
      setSpeed(prev => Math.min(prev + deltaTime * 50, 420));
      
      // Update lines of code counter
      setLinesOfCode(prev => prev + Math.floor(Math.random() * 3));

      // Update particles
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - deltaTime * 2,
          }))
          .filter(p => p.life > 0)
      );

      // Update warp stars
      setWarpStars(prev => 
        prev.map(star => {
          let newZ = star.z - star.speed * 10;
          if (newZ <= 0) {
            return {
              ...star,
              x: (Math.random() - 0.5) * window.innerWidth * 3,
              y: (Math.random() - 0.5) * window.innerHeight * 3,
              z: 2000,
            };
          }
          return { ...star, z: newZ };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  // Calculate projected star position
  const projectStar = (star: WarpStar) => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
    const scale = 800 / star.z;
    return {
      x: centerX + star.x * scale,
      y: centerY + star.y * scale,
      size: Math.max(1, 3 * scale),
      opacity: Math.min(1, scale * 0.5),
    };
  };

  return (
    <>
      {/* Subtle hint */}
      {showHint && !isActive && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] animate-pulse">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm backdrop-blur-sm">
            Press <span className="text-red-400 font-mono">L</span> or type <span className="text-cyan-400 font-mono">VIBE</span> for a surprise
          </div>
        </div>
      )}

      {/* Ludicrous Mode Overlay */}
      {isActive && (
        <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
          {/* Warp star field */}
          <svg className="absolute inset-0 w-full h-full">
            {warpStars.map(star => {
              const projected = projectStar(star);
              const prevProjected = projectStar({ ...star, z: star.z + star.speed * 10 });
              return (
                <line
                  key={star.id}
                  x1={prevProjected.x}
                  y1={prevProjected.y}
                  x2={projected.x}
                  y2={projected.y}
                  stroke="white"
                  strokeWidth={projected.size}
                  strokeOpacity={projected.opacity}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Cursor trail particles */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.life,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Vignette effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(220, 38, 38, 0.15) 100%)',
            }}
          />

          {/* Tesla-style HUD */}
          <div className="absolute inset-x-0 top-0 pointer-events-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400 text-sm font-mono tracking-wider">LUDICROUS MODE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-400 text-xs font-mono">FSD ENGAGED</span>
                </div>
              </div>
              <button 
                onClick={deactivateLudicrousMode}
                className="px-3 py-1 rounded text-white/50 hover:text-white text-sm border border-white/20 hover:border-white/40 transition-colors"
              >
                ESC to Exit
              </button>
            </div>
          </div>

          {/* Bottom HUD */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none">
            <div className="flex items-end justify-between px-8 py-6 bg-gradient-to-t from-black/80 to-transparent">
              {/* Speed gauge */}
              <div className="text-left">
                <div className="text-6xl font-bold text-white font-mono tabular-nums">
                  {Math.floor(speed)}
                </div>
                <div className="text-white/50 text-sm tracking-widest">MPH</div>
              </div>

              {/* Center status */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-8 mb-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">
                      {linesOfCode.toLocaleString()}
                    </div>
                    <div className="text-white/40 text-xs">LINES SHIPPED</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 font-mono">
                      {Math.floor(speed * 0.42)}
                    </div>
                    <div className="text-white/40 text-xs">VIBE LEVEL</div>
                  </div>
                </div>
                <div className="text-white/30 text-xs tracking-[0.3em]">
                  AUTOPILOT CODING ACTIVE
                </div>
              </div>

              {/* Battery / Range */}
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-16 h-6 rounded border border-green-500/50 p-0.5">
                    <div className="h-full w-3/4 bg-green-500 rounded-sm" />
                  </div>
                  <div className="w-2 h-3 bg-green-500/50 rounded-r" />
                </div>
                <div className="text-white/50 text-sm mt-1">247 mi</div>
              </div>
            </div>
          </div>

          {/* Side indicators */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4">
            {['Copilot', 'Claude', 'GPT-4', 'Cursor'].map((ai, i) => (
              <div key={ai} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#22d3ee', '#a855f7', '#22c55e', '#3b82f6'][i],
                    animation: `pulse ${1 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
                <span className="text-white/40 text-xs font-mono">{ai}</span>
              </div>
            ))}
          </div>

          {/* Achievement popup */}
          {speed >= 88 && speed < 90 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-bounce">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-white text-xl font-bold">1.21 GIGAWATTS!</div>
              <div className="text-white/50 text-sm">Great Scott!</div>
            </div>
          )}

          {speed >= 420 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-6xl mb-2">🚀</div>
              <div className="text-white text-2xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                MAXIMUM VIBE ACHIEVED
              </div>
              <div className="text-white/50 text-sm mt-2">You&apos;re now coding at the speed of light</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
