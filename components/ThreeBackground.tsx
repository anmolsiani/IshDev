'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  type?: 'particles' | 'energy' | 'network'
  color?: string
  className?: string
}

export default function ThreeBackground({
  type = 'particles',
  color = '#e63946',
  className = '',
}: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const sceneRef  = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    particles: THREE.Points
  } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene setup
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(
      75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000
    )
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    // Particles
    const count    = type === 'network' ? 120 : 200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)

    const rainbowColors = [
      [1, 0, 0], [1, 0.5, 0], [1, 1, 0],
      [0, 1, 0], [0, 0.5, 1], [0.5, 0, 1],
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4

      const c = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
      colors[i * 3]     = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    sceneRef.current = { renderer, scene, camera, particles }

    // Mouse interaction
    let mouseX = 0, mouseY = 0
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', handleMouse)

    // Resize
    const handleResize = () => {
      if (!canvas) return
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animate
    let time = 0
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      time += 0.005

      particles.rotation.y  += (mouseX - particles.rotation.y) * 0.05
      particles.rotation.x  += (-mouseY - particles.rotation.x) * 0.05
      particles.rotation.z  = Math.sin(time) * 0.1

      material.opacity = 0.5 + Math.sin(time * 2) * 0.15
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [type, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
