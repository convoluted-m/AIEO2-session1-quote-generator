"use client"

import { Cormorant_Garamond } from "next/font/google"
import type { Quote } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeartIcon, CopyIcon, RefreshCwIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const quoteFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
})

interface QuoteCardProps {
  quote: Quote
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onNewQuote: () => void
  onCopy: () => void
  isAnimating: boolean
}

export function QuoteCard({ quote, isFavorite, onToggleFavorite, onNewQuote, onCopy, isAnimating }: QuoteCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-8 md:p-12 shadow-lg border-2 transition-all duration-500 paper-surface bg-transparent",
        isAnimating && "opacity-0 scale-95",
        !isAnimating && "opacity-100 scale-100",
      )}
    >
      <div className="relative z-20 space-y-8">
        {/* Quote Text */}
        <div className="relative pt-6 pb-8">
          <blockquote
            className={cn(
              "relative z-10 text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed text-balance",
              quoteFont.className,
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            "{quote.text}"
          </blockquote>
        </div>

        {/* Author */}
        <p className="text-lg md:text-xl text-muted-foreground font-medium">— {quote.author}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {quote.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-[#e6d4b4] text-[#4a3821] border border-[#c3a57a] shadow-[0_1px_4px_rgba(40,25,10,0.08)] backdrop-blur-[0.5px] hover:bg-[#dcc6a3] hover:border-[#b39163] active:translate-y-[0.5px] active:shadow-[inset_0_1px_2px_rgba(40,25,10,0.2)] transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <Button
            variant="outline"
            size="default"
            onClick={onNewQuote}
            className="flex items-center gap-2 bg-transparent hover:bg-[#e8d7b5] active:bg-[#dec7a1]"
          >
            <RefreshCwIcon className="h-4 w-4" />
            New Quote
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onToggleFavorite(quote.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "transition-colors hover:bg-[#e8d7b5] active:bg-[#dec7a1]",
              isFavorite && "bg-red-50 border-red-300 hover:bg-red-100",
            )}
          >
            <HeartIcon
              className={cn("h-4 w-4 transition-all", isFavorite ? "fill-red-500 stroke-red-500" : "stroke-current")}
            />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onCopy}
            aria-label="Copy quote"
            className="hover:bg-[#e8d7b5] active:bg-[#dec7a1]"
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <style jsx>{`
        .paper-surface {
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(248, 238, 220, 0.9), rgba(240, 226, 203, 0.95)),
            url("/parchment.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow:
            inset 0 0 0 1px rgba(120, 80, 30, 0.18),
            inset 0 0 24px rgba(80, 60, 30, 0.08),
            0 18px 30px rgba(25, 18, 10, 0.08);
          background-blend-mode: multiply, normal;
        }
      `}</style>
    </Card>
  )
}
