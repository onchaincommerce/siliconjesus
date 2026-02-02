'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center } from '@react-three/drei';
import * as THREE from 'three';

interface TextMeshProps {
  mousePosition: { x: number; y: number };
}

function TextMesh({ mousePosition }: TextMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const glowRef = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate target rotation based on mouse position
      targetRotation.current.y = mousePosition.x * 0.3;
      targetRotation.current.x = -mousePosition.y * 0.2;

      // Smooth interpolation for fluid movement
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.08
      );
      
      // Pulsing glow effect
      glowRef.current = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.85;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        {/* Outer glow layer - largest, most diffuse */}
        <Text
          fontSize={3.5}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
          position={[0, 0, -0.2]}
        >
          VIBE DRIVE
          <meshBasicMaterial
            color="#ff0040"
            transparent
            opacity={0.15}
          />
        </Text>
        
        {/* Mid glow layer - red/magenta */}
        <Text
          fontSize={3.42}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
          position={[0, 0, -0.13]}
        >
          VIBE DRIVE
          <meshBasicMaterial
            color="#dc2626"
            transparent
            opacity={0.25}
          />
        </Text>
        
        {/* Inner glow layer - cyan accent */}
        <Text
          fontSize={3.36}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
          position={[0, 0, -0.07]}
        >
          VIBE DRIVE
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.2}
          />
        </Text>
        
        {/* Main text - thick and bold */}
        <Text
          fontSize={3.3}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          VIBE DRIVE
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ff2255"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Text>
        
        {/* Front highlight layer for extra pop */}
        <Text
          fontSize={3.3}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
          position={[0, 0, 0.03]}
        >
          VIBE DRIVE
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
          />
        </Text>
      </Center>
    </group>
  );
}

export default function Hero3DText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate normalized position (-1 to 1) relative to container center
        const x = (clientX - centerX) / (rect.width / 2);
        const y = (clientY - centerY) / (rect.height / 2);
        
        // Clamp values
        setMousePosition({
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y))
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      setMousePosition({ x: 0, y: 0 });
    };

    const handleTouchEnd = () => {
      // Smoothly return to center when touch ends
      setMousePosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-80 cursor-pointer hero-glow overflow-visible"
      style={{ touchAction: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', overflow: 'visible' }}
      >
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.6} />
        
        {/* Main directional light - brighter */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          color="#ffffff"
        />
        
        {/* Strong red accent light from below */}
        <pointLight 
          position={[0, -4, 3]} 
          intensity={2} 
          color="#dc2626"
          distance={15}
        />
        
        {/* Cyan accent light from above */}
        <pointLight 
          position={[0, 4, 3]} 
          intensity={1.2} 
          color="#22d3ee"
          distance={15}
        />
        
        {/* Side lights for depth - stronger */}
        <pointLight 
          position={[-6, 0, 4]} 
          intensity={0.8} 
          color="#ff0055"
          distance={12}
        />
        <pointLight 
          position={[6, 0, 4]} 
          intensity={0.8} 
          color="#3b82f6"
          distance={12}
        />
        
        {/* Front facing glow light */}
        <pointLight 
          position={[0, 0, 5]} 
          intensity={0.5} 
          color="#ffffff"
          distance={10}
        />

        <TextMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
