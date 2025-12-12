"use client"

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
    <header className="w-full max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance"> Words of Radiance </h1>
        <p className="text-lg text-muted-foreground">Poetry to light your way</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
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
