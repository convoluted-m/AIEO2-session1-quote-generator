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
        "p-8 md:p-12 shadow-lg border-2 transition-all duration-500",
        isAnimating && "opacity-0 scale-95",
        !isAnimating && "opacity-100 scale-100",
      )}
    >
      <div className="space-y-8">
        {/* Quote Text */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-foreground leading-relaxed text-balance">
          "{quote.text}"
        </blockquote>

        {/* Author */}
        <p className="text-lg md:text-xl text-muted-foreground font-medium">— {quote.author}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {quote.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-sm rounded-full">
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
    </Card>
  )
}
