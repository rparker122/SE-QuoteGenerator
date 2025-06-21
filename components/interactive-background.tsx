"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Initialize particles state
  const [particles, setParticles] = useState(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      return {
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
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        speed: Math.random() * 0.05 + 0.02,
        x: useMotionValue(Math.random()), // Initial value doesn't matter, will be updated
        y: useMotionValue(Math.random()), // Initial value doesn't matter, will be updated
        rotate: Math.random() * 360,
      }
    })
  })

  // Mouse trail particles
  const mouseTrailParticles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: 20 - i * 1.5,
    delay: i * 0.05,
    opacity: 1 - i * 0.09,
  }))

  // Gradient animation controls
  const gradientControls = useAnimation()

  // Initialize particle positions
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = containerRef.current.offsetHeight

        setDimensions({ width, height })

        // Update initial positions based on container size
        setParticles((prevParticles) => {
          return prevParticles.map((particle) => {
            return {
              ...particle,
              initialX: particle.initialX,
              initialY: particle.initialY,
              x: particle.x,
              y: particle.y,
            }
          })
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = containerRef.current.offsetHeight

        setDimensions({ width, height })

        // Update initial positions based on container size
        particles.forEach((particle) => {
          particle.x.set((particle.initialX * width) / 100)
          particle.y.set((particle.initialY * height) / 100)
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [particles])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

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

  // Handle particle movement
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || !particles) return

    const intervalIds: NodeJS.Timeout[] = []

    particles.forEach((particle) => {
      const intervalId = setInterval(() => {
        const x = particle.x
        const y = particle.y

        const xDiff = mouseX.get() - x.get()
        const yDiff = mouseY.get() - y.get()
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

        if (distance < 300) {
          // Move away from mouse
          const angle = Math.atan2(yDiff, xDiff)
          x.set(x.get() - Math.cos(angle) * 5 * particle.speed)
          y.set(y.get() - Math.sin(angle) * 5 * particle.speed)
        } else {
          // Slowly return to original position
          x.set(x.get() + ((particle.initialX * dimensions.width) / 100 - x.get()) * 0.01)
          y.set(y.get() + ((particle.initialY * dimensions.height) / 100 - y.get()) * 0.01)
        }

        // Add some random movement
        x.set(x.get() + (Math.random() - 0.5) * 1)
        y.set(y.get() + (Math.random() - 0.5) * 1)

        // Keep particles within bounds
        if (x.get() < 0) x.set(0)
        if (x.get() > dimensions.width) x.set(dimensions.width)
        if (y.get() < 0) y.set(0)
        if (y.get() > dimensions.height) y.set(dimensions.height)
      }, 50)

      intervalIds.push(intervalId)
    })

    return () => {
      intervalIds.forEach((id) => clearInterval(id))
    }
  }, [dimensions, mouseX, mouseY, particles])

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
        {/* Floating particles that react to mouse */}
        {particles &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute rounded-full bg-gradient-to-br ${particle.color} backdrop-blur-sm border border-white/10`}
              style={{
                width: particle.size,
                height: particle.size,
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                scale: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.3, 0.5, 0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.2,
                opacity: 0.8,
                transition: { duration: 0.3 },
              }}
            />
          ))}

        {/* Mouse trail effect */}
        {mouseTrailParticles.map((particle) => (
          <motion.div
            key={`trail-${particle.id}`}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              x: mouseX,
              y: mouseY,
              opacity: particle.opacity,
            }}
            transition={{
              x: { delay: particle.delay, type: "spring", damping: 20 },
              y: { delay: particle.delay, type: "spring", damping: 20 },
            }}
          />
        ))}
      </div>

      {/* Light effect overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 z-20 pointer-events-none" />
    </>
  )
}

