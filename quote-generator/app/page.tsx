"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { QuoteCard } from "@/components/quote-card"
import { QuoteHeader } from "@/components/quote-header"
import { type Quote, getRandomQuote, getQuoteById, searchQuotes } from "@/lib/quotes"
import { HeartIcon } from "lucide-react"

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [category, setCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [searchResults, setSearchResults] = useState<Quote[] | null>(null)

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favoriteQuotes")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to load favorites", e)
      }
    }
  }, [])

  // Load quote from URL or random
  useEffect(() => {
    const quoteId = searchParams.get("quote")
    if (quoteId) {
      const quote = getQuoteById(Number(quoteId))
      if (quote) {
        setCurrentQuote(quote)
        setCategory(quote.category)
        return
      }
    }
    // Load random quote if no valid ID in URL
    if (!currentQuote) {
      setCurrentQuote(getRandomQuote())
    }
  }, [searchParams])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites))
  }, [favorites])

  const handleNewQuote = () => {
    setIsAnimating(true)
    setTimeout(() => {
      let newQuote: Quote

      if (favoritesOnly && favorites.length > 0) {
        // Pick random from favorites
        const favoriteQuotes = favorites.map((id) => getQuoteById(id)).filter((q): q is Quote => q !== undefined)
        const filtered = favoriteQuotes.filter((q) => q.id !== currentQuote?.id)
        const pool = filtered.length > 0 ? filtered : favoriteQuotes
        newQuote = pool[Math.floor(Math.random() * pool.length)]
      } else if (searchResults && searchResults.length > 0) {
        // Pick from search results
        const filtered = searchResults.filter((q) => q.id !== currentQuote?.id)
        const pool = filtered.length > 0 ? filtered : searchResults
        newQuote = pool[Math.floor(Math.random() * pool.length)]
      } else {
        // Normal random based on category
        newQuote = getRandomQuote(category, currentQuote?.id)
      }

      setCurrentQuote(newQuote)
      updateURL(newQuote.id)
      setIsAnimating(false)
    }, 300)
  }

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleCopy = () => {
    if (currentQuote) {
      const text = `"${currentQuote.text}" — ${currentQuote.author}`
      navigator.clipboard.writeText(text)
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setSearchQuery("")
    setSearchResults(null)
    setIsAnimating(true)
    setTimeout(() => {
      const newQuote = getRandomQuote(newCategory)
      setCurrentQuote(newQuote)
      updateURL(newQuote.id)
      setIsAnimating(false)
    }, 300)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    const results = searchQuotes(searchQuery)
    setSearchResults(results)

    if (results.length > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        const newQuote = results[0]
        setCurrentQuote(newQuote)
        updateURL(newQuote.id)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleToggleFavoritesOnly = () => {
    const newValue = !favoritesOnly
    setFavoritesOnly(newValue)
    setSearchQuery("")
    setSearchResults(null)

    if (newValue && favorites.length > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        const favoriteQuotes = favorites.map((id) => getQuoteById(id)).filter((q): q is Quote => q !== undefined)
        const newQuote = favoriteQuotes[Math.floor(Math.random() * favoriteQuotes.length)]
        setCurrentQuote(newQuote)
        updateURL(newQuote.id)
        setIsAnimating(false)
      }, 300)
    } else if (newValue && favorites.length === 0) {
      // Don't change quote, just show message
    } else {
      // Switching back to all quotes
      setIsAnimating(true)
      setTimeout(() => {
        const newQuote = getRandomQuote(category)
        setCurrentQuote(newQuote)
        updateURL(newQuote.id)
        setIsAnimating(false)
      }, 300)
    }
  }

  const updateURL = (quoteId: number) => {
    const params = new URLSearchParams()
    params.set("quote", quoteId.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  if (!currentQuote) {
    return null
  }

  const shouldShowNoFavoritesMessage = favoritesOnly && favorites.length === 0

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-12">
        <QuoteHeader
          category={category}
          onCategoryChange={handleCategoryChange}
          favoritesOnly={favoritesOnly}
          onToggleFavoritesOnly={handleToggleFavoritesOnly}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          favoriteCount={favorites.length}
        />

        {shouldShowNoFavoritesMessage ? (
          <div className="text-center py-16 space-y-4">
            <HeartIcon className="h-16 w-16 mx-auto text-muted-foreground/50" />
            <h2 className="text-2xl font-semibold text-foreground">No favorites yet</h2>
            <p className="text-muted-foreground">Start favoriting quotes to see them here</p>
          </div>
        ) : (
          <QuoteCard
            quote={currentQuote}
            isFavorite={favorites.includes(currentQuote.id)}
            onToggleFavorite={handleToggleFavorite}
            onNewQuote={handleNewQuote}
            onCopy={handleCopy}
            isAnimating={isAnimating}
          />
        )}

        {searchResults && searchResults.length === 0 && (
          <p className="text-center text-muted-foreground">No quotes found for "{searchQuery}"</p>
        )}

        <footer className="text-center text-sm text-muted-foreground pt-8">
          <p> 2025. Crafted by convoluted-m</p>
        </footer>
      </div>
    </main>
  )
}
