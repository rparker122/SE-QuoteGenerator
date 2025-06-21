import QuoteGenerator from "@/components/quote-generator"
import SimpleInteractiveBackground from "@/components/simple-interactive-background"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 overflow-hidden relative">
      <SimpleInteractiveBackground />
      <div className="relative z-30">
        <QuoteGenerator />
      </div>
      <CustomCursor />
    </main>
  )
}

