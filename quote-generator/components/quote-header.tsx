"use client"

import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, HeartIcon } from "lucide-react"
import { categories } from "@/lib/quotes"
import { cn } from "@/lib/utils"

interface QuoteHeaderProps {
  category: string
  onCategoryChange: (category: string) => void
  favoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearch: () => void
  favoriteCount: number
}

export function QuoteHeader({
  category,
  onCategoryChange,
  favoritesOnly,
  onToggleFavoritesOnly,
  searchQuery,
  onSearchChange,
  onSearch,
  favoriteCount,
}: QuoteHeaderProps) {
  return (
    <header className="w-full max-w-4xl mx-auto space-y-4">
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-foreground text-balance tracking-[0.05em]">
          Words of Radiance
        </h1>
        <p className="font-serif text-lg text-muted-foreground">Poetry to light your way</p>
      </div>

      {/* Accent image between title and controls */}
      <div className="flex justify-center">
        <div
          className="pointer-events-none opacity-85"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 94%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 94%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 94%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 94%, transparent 100%)",
            WebkitMaskComposite: "destination-in",
            maskComposite: "intersect",
          }}
        >
          <Image
            src="/book-mystic.png"
            alt="Light spilling from an open book"
            width={140}
            height={140}
            className="select-none drop-shadow-md saturate-[0.92] contrast-[0.96]"
            priority={false}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center pt-2">
        {/* Category Select */}
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="flex gap-2 flex-1">
          <Input
            type="text"
            placeholder="Search by author or tag..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="flex-1"
          />
          <Button variant="outline" size="icon" onClick={onSearch} aria-label="Search">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Favorites Toggle */}
        <Button
          variant={favoritesOnly ? "default" : "outline"}
          onClick={onToggleFavoritesOnly}
          className={cn("gap-2 transition-all", favoritesOnly && "bg-secondary hover:bg-secondary/90")}
        >
          <HeartIcon className={cn("h-4 w-4", favoritesOnly && "fill-secondary-foreground")} />
          Favorites {favoriteCount > 0 && `(${favoriteCount})`}
        </Button>
      </div>
    </header>
  )
}
