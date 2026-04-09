'use client';

import { Suspense, useRef, forwardRef, useImperativeHandle, useState, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Procedurally generated laptop using primitive Box geometries
export const ProceduralMac = memo(forwardRef((props: any, ref) => {
  const group = useRef<THREE.Group>(null);
  const screenHinge = useRef<THREE.Group>(null);
  const screenMesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Local state for the initial opening if no external control is provided
  const initialOpen = useRef(true);

  useImperativeHandle(ref, () => ({
    group: group.current,
    hinge: screenHinge.current
  }));
  
  useFrame((state) => {
    if (group.current) {
      // Subtly rotate the laptop based on mouse cursor position
      const t = state.clock.getElapsedTime();
      
      if (!props.isStatic) {
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 12 + 0.15 + state.pointer.y / 6, 0.08);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 12 + state.pointer.x / 4, 0.08);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (props.yOffset || 0) + Math.sin(t) / 12, 0.08);
      }
    }

    if (screenHinge.current && initialOpen.current && !props.manualControl) {
      const t = state.clock.getElapsedTime();
      if (t < 2) {
        screenHinge.current.rotation.x = THREE.MathUtils.lerp(screenHinge.current.rotation.x, -Math.PI / 2 + 0.3, 0.05);
      } else {
        initialOpen.current = false;
      }
    }

    // Animate emissive glow based on hover state
    if (screenMesh.current) {
      const targetIntensity = (hovered || props.forceHover) ? 0.6 : 0;
      const material = screenMesh.current.material as THREE.MeshStandardMaterial;
      if (Math.abs(material.emissiveIntensity - targetIntensity) > 0.001) {
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.1);
      }
    }
  });

  // Handle cursor and callback change
  useEffect(() => {
    if (hovered && !props.isOff) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
    
    if (props.onHoverChange) {
      props.onHoverChange(hovered);
    }

    return () => { document.body.style.cursor = 'default'; };
  }, [hovered, props.isOff, props.onHoverChange]);

  // Base orange color as requested
  const accentOrange = "#FF5722"; 

  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Laptop Base (Keyboard side) */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[4.2, 0.1, 3]} />
        <meshStandardMaterial color={accentOrange} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Keyboard Area Indentation */}
      <mesh position={[0, 0.01, -0.2]}>
        <boxGeometry args={[3.8, 0.02, 1.6]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.01, 0.9]}>
        <boxGeometry args={[1.2, 0.02, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Screen Hinge */}
      <group position={[0, 0, -1.4]} ref={screenHinge} rotation={[props.initialHingeX ?? 0, 0, 0]}>
        <mesh position={[0, 0.05, 1.4]}>
          <boxGeometry args={[4.2, 0.1, 3]} />
          <meshStandardMaterial color={accentOrange} metalness={0.9} roughness={0.1} />
        </mesh>
        
        <mesh position={[0, 0.01, 1.4]}>
          <boxGeometry args={[4.0, 0.02, 2.7]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Screen Display Panel with Emissive Glow */}
        <mesh position={[0, 0.005, 1.4]} ref={screenMesh}>
          <boxGeometry args={[3.8, 0.02, 2.5]} />
          <meshStandardMaterial 
            color="#111111" 
            emissive={new THREE.Color(accentOrange)} 
            emissiveIntensity={0}
          />
        </mesh>

        {/* Corrected HTML Screen Content */}
        {!props.isOff && (
          <Html
            transform
            wrapperClass="laptop-screen"
            distanceFactor={1.5}
            position={[0, -0.01, 1.4]}
            rotation-x={Math.PI / 2}
            rotation-y={0} // Fixed mirroring
          >
            <div className={`w-[1024px] h-[670px] flex items-center justify-center overflow-hidden transition-all duration-500 ${props.whiteLight ? 'bg-white' : 'bg-transparent'}`} 
                 style={{ 
                    boxShadow: props.whiteLight ? '0 0 100px #FFFFFF' : 'none', 
                    border: props.whiteLight ? '1px solid #FFFFFF' : 'none' 
                 }}>
              
              {!props.whiteLight && (
                <div className="flex flex-col items-center">
                   <div className="text-[100px] font-heading font-black text-[#FF5722] opacity-90 blur-[0.5px] leading-none text-center px-12 transition-all duration-500 transform scale-100 uppercase">
                     {hovered ? "WE'LL HANDLE IT ALL" : "HANDLE IT WITH NO WORRIES"}
                   </div>
                   <div className="w-[600px] h-[3px] bg-[#FF5722]/60 mt-8 shadow-[0_0_30px_rgba(255,87,34,0.8)]" />
                   <div className="mt-14 font-mono text-grey tracking-[1em] text-2xl opacity-50 uppercase">
                     Ishdev // Premium Interaction
                   </div>
                </div>
              )}
              
              {!props.whiteLight && (
                <>
                  <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FF5722]/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-40'}`} />
                  <div className={`absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#FF5722]/05 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-20'}`} />
                </>
              )}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}));

ProceduralMac.displayName = 'ProceduralMac';

import { TrendingUp, BarChart3, Search, Share2, Target, Mail } from 'lucide-react';

// Optimized FloatingIcon using simple Meshes instead of multi-layered Html components
function FloatingMesh({ position, color = "#FF6B2B", speed = 1, intensity = 1 }: { position: [number, number, number], color?: string, speed?: number, intensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * speed;
      meshRef.current.position.y += Math.sin(t) * 0.002 * intensity;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={intensity} position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={color} transparent opacity={0.2} wireframe />
      </mesh>
    </Float>
  );
}

export default function LaptopHero({ modelRef, whiteLight, isOff, onHoverChange }: { modelRef?: any, whiteLight?: boolean, isOff?: boolean, onHoverChange?: (hovered: boolean) => void }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 11], fov: 45 }} 
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }} 
        dpr={[1, 2]}
      >
        <ambientLight intensity={isOff ? 0.2 : 0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isOff ? 0.5 : 1} castShadow={false} />
        <pointLight position={[10, 10, -10]} intensity={isOff ? 0 : 0.8} color="#FF5722" />
        <pointLight position={[-10, 0, -10]} intensity={isOff ? 0 : 0.5} color="#FF5722" />

        <Suspense fallback={null}>
          {!isOff && (
            <group>
              <FloatingMesh position={[-6, 3, -4]} speed={1.5} intensity={0.5} />
              <FloatingMesh position={[7, 4, -5]} speed={1.2} intensity={0.6} />
              <FloatingMesh position={[-5, -4, -3]} speed={1.8} intensity={0.4} />
              <FloatingMesh position={[6, -3.5, -4]} speed={1.4} intensity={0.7} />
              <FloatingMesh position={[-3, 5, -6]} speed={1.6} intensity={0.5} />
              <FloatingMesh position={[4, -5.5, -2]} speed={1.3} intensity={0.8} />
            </group>
          )}

          <Float 
            rotationIntensity={0.2} 
            floatIntensity={0.8} 
            speed={2} 
            floatingRange={[0, 0.3]}
          >
            <ProceduralMac 
              ref={modelRef} 
              whiteLight={whiteLight} 
              isOff={isOff} 
              onHoverChange={onHoverChange} 
              position={[0, 0, 0]} 
              rotation={[0.4, 0.4, 0]} 
              initialHingeX={0} 
            />
          </Float>
          
          <Environment preset="city" />
          <ContactShadows resolution={512} position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
