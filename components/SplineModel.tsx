'use client'

import { Suspense, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-red-500 border-t-transparent 
                      rounded-full animate-spin" />
    </div>
  ),
})

interface SplineModelProps {
  className?: string
  onLoad?: (spline: any) => void
}

export default function SplineModel({ className = '', onLoad }: SplineModelProps) {
  const splineRef = useRef<any>(null)

  function handleLoad(spline: any) {
    splineRef.current = spline
    onLoad?.(spline)

    // Expose globally for other components to trigger events
    if (typeof window !== 'undefined') {
      (window as any).splineApp = spline
    }
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Spline
        scene="https://prod.spline.design/NIGerLz1gzGc3cEp/scene.splinecode"
        onLoad={handleLoad}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
