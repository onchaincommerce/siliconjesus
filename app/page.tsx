'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const taglines = [
    "Jesus was a chip manufacturer",
    "Jensen Huang is hot",
    "Silicon is my dad"
  ];
  
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  // Bouncing logo state
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 });
  const [logoVelocity, setLogoVelocity] = useState({ x: 2, y: 2 });
  const [isBouncing, setIsBouncing] = useState(false);
  const [logoSize, setLogoSize] = useState({ width: 200, height: 200 });
  const animationRef = useRef<number | undefined>(undefined);
  
  // Easter egg state
  const [logoClicked, setLogoClicked] = useState(false);
  const [breadUnlocked, setBreadUnlocked] = useState(false);

  const fullText = taglines[currentTaglineIndex];

  // Handle responsive logo size
  useEffect(() => {
    const updateLogoSize = () => {
      const isMobile = window.innerWidth < 768;
      const size = isMobile ? 120 : 200;
      const speed = isMobile ? 1.5 : 2;
      setLogoSize({ width: size, height: size });
      setLogoVelocity({ x: speed, y: speed });
    };

    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  // Bouncing only starts when logo is clicked (removed auto-start)

  // Initialize logo position at top center
  useEffect(() => {
    const centerX = (window.innerWidth - logoSize.width) / 2;
    const topY = 50; // Start near the top
    setLogoPos({ x: centerX, y: topY });
  }, [logoSize]);

  // Bouncing animation
  useEffect(() => {
    if (!isBouncing) return;

    const animate = () => {
      setLogoPos((prev) => {
        const newX = prev.x + logoVelocity.x;
        const newY = prev.y + logoVelocity.y;

        let newVelX = logoVelocity.x;
        let newVelY = logoVelocity.y;

        // Check boundaries and bounce
        if (newX <= 0 || newX + logoSize.width >= window.innerWidth) {
          newVelX = -newVelX;
        }
        if (newY <= 0 || newY + logoSize.height >= window.innerHeight) {
          newVelY = -newVelY;
        }

        setLogoVelocity({ x: newVelX, y: newVelY });

        return {
          x: Math.max(0, Math.min(newX, window.innerWidth - logoSize.width)),
          y: Math.max(0, Math.min(newY, window.innerHeight - logoSize.height))
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isBouncing, logoVelocity, logoSize]);

  // Handle logo click - start bouncing, then unlock bread (easter egg)
  const handleLogoClick = () => {
    // First click: start bouncing
    if (!isBouncing) {
      setIsBouncing(true);
      return;
    }
    
    // Second click (while bouncing): unlock bread
    if (!logoClicked) {
      setLogoClicked(true);
      setBreadUnlocked(true);
    }
    
    // Change tagline
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * taglines.length);
    } while (newIndex === currentTaglineIndex && taglines.length > 1);
    
    // Reset typewriter state completely
    setIsDeleting(true); // Start deleting current text
    setTimeout(() => {
      setCurrentTaglineIndex(newIndex);
      setDisplayText('');
      setCharIndex(0);
      setIsDeleting(false);
      setShowCursor(true);
    }, displayText.length * 20); // Wait for delete animation
  };
  
  // Handle bread click - navigate to shop
  const handleBreadClick = () => {
    if (breadUnlocked) {
      window.location.href = '/shop';
    }
  };
  
  // Handle tagline click - change tagline
  const handleTaglineClick = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * taglines.length);
    } while (newIndex === currentTaglineIndex && taglines.length > 1);
    
    // Reset typewriter state completely
    setIsDeleting(true); // Start deleting current text
    setTimeout(() => {
      setCurrentTaglineIndex(newIndex);
      setDisplayText('');
      setCharIndex(0);
      setIsDeleting(false);
      setShowCursor(true);
    }, displayText.length * 20); // Wait for delete animation
  };

  // Blinking cursor effect
  useEffect(() => {
    if (charIndex === fullText.length && !isDeleting) {
      // Blink cursor a few times when typing is complete
      let blinkCount = 0;
      const blinkInterval = setInterval(() => {
        setShowCursor(prev => !prev);
        blinkCount++;
        if (blinkCount >= 6) { // 3 full blinks
          clearInterval(blinkInterval);
          setShowCursor(true);
        }
      }, 400);
      return () => clearInterval(blinkInterval);
    } else {
      setShowCursor(true);
    }
  }, [charIndex, fullText.length, isDeleting]);

  // Typewriter effect - loops the SAME tagline unless clicked
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    if (!isDeleting && charIndex === fullText.length) {
      // Pause at end before deleting (retyping same text)
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      // Start typing the SAME tagline again (no random change)
      const timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setDisplayText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, fullText]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Hidden Easter Egg: Click to start bouncing, click again to unlock bread */}
      <div 
        className={`bouncing-logo ${isBouncing ? 'logo-glow' : 'logo-no-glow'}`}
        style={{ 
          left: `${logoPos.x}px`, 
          top: `${logoPos.y}px`,
          width: `${logoSize.width}px`,
          height: `${logoSize.height}px`,
          zIndex: 50,
          cursor: 'default'
        }}
        onClick={handleLogoClick}
      >
        <Image 
          src="/siliconjesus_logo2.png"
          alt="Silicon Jesus"
          width={logoSize.width}
          height={logoSize.height}
          priority
        />
      </div>

      {/* Main Content - Centered */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {/* Typewriter tagline with blinking underscore - clickable to change */}
        <div 
          className="text-xl md:text-2xl text-center opacity-90 min-h-[3rem] flex items-center justify-center cursor-pointer hover:opacity-100 transition-opacity"
          onClick={handleTaglineClick}
        >
          <span>{displayText}</span>
          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
        </div>
      </div>

      {/* Hidden Easter Egg: Clickable after logo is clicked twice */}
      <div 
        className="mb-8"
        style={{ cursor: 'default' }}
        onClick={handleBreadClick}
      >
        <Image 
          src="/loafy.png"
          alt="Loafy"
          width={150}
          height={150}
          className="opacity-70"
        />
      </div>

      {/* Copyright */}
      <div className="text-center space-y-2">
        <Link 
          href="/table" 
          className="text-xs opacity-30 hover:opacity-70 transition-opacity cursor-pointer block"
        >
          tile table
        </Link>
        <p className="text-xs opacity-50">
          © 2025 Silicon Jesus
        </p>
      </div>
    </div>
  );
}
