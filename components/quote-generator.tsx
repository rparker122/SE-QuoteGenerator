"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Quote } from "@/lib/types"
import { fetchRandomQuote } from "@/lib/quotes"
import FloatingParticles from "./floating-particles"
import { RefreshCw, QuoteIcon } from "lucide-react"

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    getNewQuote()
  }, [])

  const getNewQuote = async () => {
    setIsLoading(true)
    setRotation(rotation + 360)

    try {
      const newQuote = await fetchRandomQuote()

      // Add a small delay for better animation effect
      setTimeout(() => {
        setQuote(newQuote)
        setIsLoading(false)
      }, 600)
    } catch (error) {
      console.error("Failed to fetch quote:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-sm bg-white/10 p-8 rounded-xl shadow-2xl border border-white/20"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="mb-6 text-white/80"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <QuoteIcon size={40} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={quote?.id || "loading"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-[160px] flex flex-col justify-center"
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <motion.div
                    className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </div>
              ) : (
                <>
                  <motion.blockquote
                    className="text-xl sm:text-2xl text-white text-center mb-4 font-serif italic"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    "{quote?.text}"
                  </motion.blockquote>

                  <motion.p
                    className="text-right text-white/80 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    — {quote?.author || "Unknown"}
                  </motion.p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <Button
              onClick={getNewQuote}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-2 rounded-full font-medium flex items-center gap-2 backdrop-blur-sm"
            >
              <motion.div animate={{ rotate: rotation }} transition={{ type: "spring", stiffness: 100, damping: 10 }}>
                <RefreshCw size={18} />
              </motion.div>
              New Quote
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

