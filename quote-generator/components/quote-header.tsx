"use client"

import { Cormorant_Garamond } from "next/font/google"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, HeartIcon, X, Sun, Moon } from "lucide-react"
import { authors } from "@/lib/quotes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const titleFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
})

interface QuoteHeaderProps {
  author: string
  onAuthorChange: (author: string) => void
  favoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearch: () => void
  onClearSearch: () => void
  onResetFilters: () => void
  favoriteCount: number
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function QuoteHeader({
  author,
  onAuthorChange,
  favoritesOnly,
  onToggleFavoritesOnly,
  searchQuery,
  onSearchChange,
  onSearch,
  onClearSearch,
  onResetFilters,
  favoriteCount,
  theme,
  onToggleTheme,
}: QuoteHeaderProps) {
  return (
    <header className="w-full max-w-4xl mx-auto space-y-4">
      {/* Title */}
      <div className="text-center space-y-1">
        <h1
          className={cn(
            titleFont.className,
            "text-5xl md:text-6xl lg:text-7xl text-[#6b4a12] dark:text-[#d9c08a] text-balance leading-tight normal-case tracking-[0.01em]",
          )}
        >
          Words of Radiance
        </h1>
        <p className="font-serif text-lg text-[#6b4a12] dark:text-[#d9c08a] opacity-96">Poetry to light your way</p>
        <div className="flex justify-center pt-3">
          <span
            className="pointer-events-none inline-block h-[2px] w-72 max-w-full rounded-full bg-gradient-to-r from-[rgba(75,56,12,0.16)] via-[rgba(107,74,18,0.95)] to-[rgba(75,56,12,0.16)] shadow-[0_0_14px_rgba(107,74,18,0.5)]"
            aria-hidden
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center pt-2">
        {/* Author Select */}
        <Select value={author} onValueChange={onAuthorChange}>
          <SelectTrigger className="w-full md:w-48" aria-label="Filter by author">
            <SelectValue placeholder="Author (All authors)" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((name) => (
              <SelectItem key={name} value={name}>
                {name === "All" ? "All authors" : name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="flex gap-2 flex-1">
          <Input
            type="text"
            placeholder="Filter by tag (within author)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="flex-1"
            aria-label="Search quotes by tag"
          />
          {searchQuery && (
            <Button variant="outline" size="icon" onClick={onClearSearch} aria-label="Clear search">
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={onSearch} aria-label="Search">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Reset filters */}
        <Button variant="ghost" onClick={onResetFilters} aria-label="Reset author and tag filters" className="text-[#6b4a12]">
          Reset filters
        </Button>

        {/* Favorites Toggle */}
        <Button
          variant={favoritesOnly ? "default" : "outline"}
          onClick={onToggleFavoritesOnly}
          className={cn("gap-2 transition-all", favoritesOnly && "bg-secondary hover:bg-secondary/90")}
        >
          <HeartIcon className={cn("h-4 w-4", favoritesOnly && "fill-secondary-foreground")} />
          Favorites {favoriteCount > 0 && `(${favoriteCount})`}
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="hover:bg-[#e8d7b5] active:bg-[#dec7a1]"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}
