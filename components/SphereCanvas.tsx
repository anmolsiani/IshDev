'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform float uVelocity;
  
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normal;
    vPosition = position;
    
    vec3 pos = position;
    
    // Noise based on position and time
    float noise = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * sin(pos.z * 2.0 + uTime);
    
    // Displacement factor based on velocity and morphing progress
    float displacementFactor = 0.8 + (uVelocity * 0.0005);
    float displacement = noise * displacementFactor * uMorph;
    
    pos += normalize(position) * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Simple wireframe-like effect or consistent color
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

export default function SphereCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 12 : 8;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1); // Capped at 1 for significant performance boost
    containerRef.current.appendChild(renderer.domElement);

    // Optimized Geometry: Reduced detail from 4 to 2 (320 faces vs 5120 faces)
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uVelocity: { value: 0 },
        uColor: { value: new THREE.Color(0xFF6B2B) },
        uOpacity: { value: 0.35 }
      }
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // INSTANCED PARTICLES (Much faster than 80 Mesh objects)
    const particleCount = 80;
    const particleGeom = new THREE.SphereGeometry(0.015, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.15,
    });
    
    const instancedParticles = new THREE.InstancedMesh(particleGeom, particleMat, particleCount);
    scene.add(instancedParticles);

    const dummy = new THREE.Object3D();
    const particleData = Array.from({ length: particleCount }, () => ({
      orbitSpeed: (Math.random() - 0.5) * 0.002,
      orbitAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      pos: new THREE.Vector3().setFromSphericalCoords(
        2.5 + Math.random() * 1.5,
        Math.random() * Math.PI * 2,
        Math.acos(Math.random() * 2 - 1)
      )
    }));

    let scrollRotationY = 0;
    let scrollRotationX = 0;
    const maxScrollRotation = (60 * Math.PI) / 180;
    let scrollVelocity = 0;
    let morphValue = 0;

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        morphValue = self.progress;
        scrollVelocity = Math.abs(self.getVelocity());
        scrollRotationY = morphValue * Math.PI * 2.5;
        scrollRotationX = Math.sin(morphValue * Math.PI * 1.5) * maxScrollRotation;
      }
    });

    const startTime = performance.now();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Optimization: Skip rendering if the tab is not visible
      if (document.visibilityState === 'hidden') return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      scrollVelocity *= 0.95;

      // Update Shader Uniforms
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMorph.value = morphValue;
      material.uniforms.uVelocity.value = scrollVelocity;

      // Scene Rotations
      scene.rotation.y = scrollRotationY;
      scene.rotation.x = scrollRotationX + (scrollVelocity * 0.00002);
      
      sphere.rotation.y += 0.0005 + (scrollVelocity * 0.00005);

      // Sphere Positioning (Zig-Zag)
      const pathX = Math.sin(morphValue * Math.PI * 2) * 5;
      const pathY = THREE.MathUtils.lerp(3, -5, morphValue);
      const pathZ = THREE.MathUtils.lerp(0, -6, Math.sin(morphValue * Math.PI));
      
      sphere.position.set(pathX, pathY, pathZ);

      if (morphValue > 0.8) {
        const p2 = (morphValue - 0.8) * 5;
        sphere.position.x = THREE.MathUtils.lerp(sphere.position.x, 0, p2);
        sphere.position.y = THREE.MathUtils.lerp(sphere.position.y, 0, p2);
        sphere.scale.setScalar(THREE.MathUtils.lerp(1, 3.5, p2) + (Math.sin(elapsedTime * 4) * 0.1));
        material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.35, 0.7, p2);
        
        // Dynamic Color Shift
        const color = new THREE.Color().setHSL(0.04 + (p2 * 0.05), 1, 0.5);
        material.uniforms.uColor.value.copy(color);
      } else {
        const scaleBase = 1 + morphValue * 1.5 + (scrollVelocity * 0.0002);
        sphere.scale.setScalar(scaleBase + (Math.sin(elapsedTime * 2) * 0.05));
        material.uniforms.uOpacity.value = 0.35 + (scrollVelocity * 0.00001);
        material.uniforms.uColor.value.setHex(0xFF6B2B);
      }

      // Update Instanced Particles
      particleData.forEach((data, i) => {
        data.pos.applyAxisAngle(data.orbitAxis, data.orbitSpeed);
        dummy.position.copy(data.pos);
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      });
      instancedParticles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block" 
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden z-0 pointer-events-none opacity-40">
        <div className="w-[200px] h-[200px] rounded-full border-2 border-dashed border-[#FF6B2B] animate-[spin_20s_linear_infinite] flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full border border-[#FF6B2B] animate-[pulse_3s_ease_infinite]" />
        </div>
      </div>
    </>
  );
}
