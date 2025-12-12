"use client"

import type { Quote } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeartIcon, CopyIcon, RefreshCwIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
          <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-serif italic text-foreground leading-relaxed text-balance">
            "{quote.text}"
          </blockquote>
        </div>

        {/* Author */}
        <p className="text-lg md:text-xl text-muted-foreground font-medium">— {quote.author}</p>
        <div className="flex justify-center pb-4">
          <span
            key={quote.id}
            className="pointer-events-none inline-block h-[2px] w-80 max-w-full rounded-full bg-gradient-to-r from-[rgba(120,82,18,0.1)] via-[rgba(186,140,42,0.9)] to-[rgba(120,82,18,0.1)] shadow-[0_0_16px_rgba(150,110,28,0.55)]"
            style={{ animation: "golden-underline 1.4s ease-out forwards" }}
            aria-hidden
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {quote.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-[rgba(139,109,66,0.18)] text-[rgba(92,70,44,0.9)] border border-[rgba(123,94,60,0.3)] shadow-[0_1px_4px_rgba(40,25,10,0.08)] backdrop-blur-[0.5px] hover:bg-[rgba(139,109,66,0.26)] hover:border-[rgba(123,94,60,0.42)] active:translate-y-[0.5px] active:shadow-[inset_0_1px_2px_rgba(40,25,10,0.2)] transition-colors"
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
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCwIcon className="h-4 w-4" />
            New Quote
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onToggleFavorite(quote.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={cn("transition-colors", isFavorite && "bg-red-50 border-red-300 hover:bg-red-100")}
          >
            <HeartIcon
              className={cn("h-4 w-4 transition-all", isFavorite ? "fill-red-500 stroke-red-500" : "stroke-current")}
            />
          </Button>

          <Button variant="outline" size="icon" onClick={onCopy} aria-label="Copy quote">
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes golden-underline {
          0% {
            transform: translateX(-50%) scaleX(0.6);
            opacity: 0;
          }
          45% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(186, 140, 42, 0.65));
          }
          100% {
            transform: translateX(-50%) scaleX(1);
            opacity: 0.9;
            filter: drop-shadow(0 0 6px rgba(150, 110, 28, 0.4));
          }
        }

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
