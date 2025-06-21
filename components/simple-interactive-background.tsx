"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export default function SimpleInteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Gradient animation controls
  const gradientControls = useAnimation()

  // Start gradient animation
  useEffect(() => {
    gradientControls.start({
      backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [gradientControls])

  // Generate static particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    color:
      i % 5 === 0
        ? "from-pink-300/20 to-purple-500/20"
        : i % 4 === 0
          ? "from-blue-300/20 to-indigo-500/20"
          : i % 3 === 0
            ? "from-indigo-300/20 to-cyan-500/20"
            : i % 2 === 0
              ? "from-purple-300/20 to-pink-500/20"
              : "from-cyan-300/20 to-blue-500/20",
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
  }))

  return (
    <>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={gradientControls}
        style={{
          background: "linear-gradient(120deg, #4c1d95, #7e22ce, #2563eb, #0891b2, #4c1d95)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Interactive particles container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden z-10">
        {/* Floating particles with simple animation */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-br ${particle.color} backdrop-blur-sm border border-white/10`}
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              scale: [1, 1.1, 0.9, 1.05, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.3, 0.5, 0.3, 0.6, 0.3],
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Light effect overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 z-20 pointer-events-none" />
    </>
  )
}

