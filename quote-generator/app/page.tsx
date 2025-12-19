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
  const [authorFilter, setAuthorFilter] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [searchResults, setSearchResults] = useState<Quote[] | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favoriteQuotes")
    const storedAuthor = localStorage.getItem("authorFilter")
    const storedFavOnly = localStorage.getItem("favoritesOnly")
    const storedTheme = localStorage.getItem("theme")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to load favorites", e)
      }
    }
    if (storedAuthor) {
      setAuthorFilter(storedAuthor)
    }
    if (storedFavOnly) {
      setFavoritesOnly(storedFavOnly === "true")
    }
    if (storedTheme === "dark") {
      setTheme("dark")
    }
  }, [])

  // Load quote from URL or random
  useEffect(() => {
    const quoteId = searchParams.get("quote")
    if (quoteId) {
      const quote = getQuoteById(Number(quoteId))
      if (quote) {
        setCurrentQuote(quote)
        setAuthorFilter(quote.author)
        return
      }
    }
    // Load random quote if no valid ID in URL
    if (!currentQuote) {
      setCurrentQuote(getRandomQuote(authorFilter))
    }
  }, [searchParams, authorFilter])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites))
  }, [favorites])

  // Persist filters
  useEffect(() => {
    localStorage.setItem("authorFilter", authorFilter)
  }, [authorFilter])

  useEffect(() => {
    localStorage.setItem("favoritesOnly", String(favoritesOnly))
  }, [favoritesOnly])

  // Persist theme and apply class
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleNewQuote = () => {
    setIsAnimating(true)
    setTimeout(() => {
      let newQuote: Quote

      if (favoritesOnly && favorites.length > 0) {
        // Pick random from favorites
        const favoriteQuotes = favorites.map((id) => getQuoteById(id)).filter((q): q is Quote => q !== undefined)
        const favoritesByAuthor =
          authorFilter === "All" ? favoriteQuotes : favoriteQuotes.filter((q) => q.author === authorFilter)
        const filtered = favoritesByAuthor.filter((q) => q.id !== currentQuote?.id)
        const pool = filtered.length > 0 ? filtered : favoritesByAuthor
        if (pool.length === 0) {
          setIsAnimating(false)
          return
        }
        newQuote = pool[Math.floor(Math.random() * pool.length)]
      } else if (searchResults && searchResults.length > 0) {
        // Pick from search results
        const filtered = searchResults.filter((q) => q.id !== currentQuote?.id)
        const pool = filtered.length > 0 ? filtered : searchResults
        newQuote = pool[Math.floor(Math.random() * pool.length)]
      } else {
        // Normal random, avoid repeating current if possible
        newQuote = getRandomQuote(authorFilter, currentQuote?.id)
      }

      setCurrentQuote(newQuote)
      updateURL(newQuote.id)
      setIsAnimating(false)
    }, 300)
  }

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
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

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    const results = searchQuotes(searchQuery).filter((q) => authorFilter === "All" || q.author === authorFilter)
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

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults(null)
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
        const favoritesByAuthor =
          authorFilter === "All" ? favoriteQuotes : favoriteQuotes.filter((q) => q.author === authorFilter)
        if (favoritesByAuthor.length > 0) {
          const newQuote = favoritesByAuthor[Math.floor(Math.random() * favoritesByAuthor.length)]
          setCurrentQuote(newQuote)
          updateURL(newQuote.id)
        }
        setIsAnimating(false)
      }, 300)
    } else if (newValue && favorites.length === 0) {
      // Don't change quote, just show message
    } else {
      // Switching back to all quotes
      setIsAnimating(true)
      setTimeout(() => {
        const newQuote = getRandomQuote(authorFilter, currentQuote?.id)
        setCurrentQuote(newQuote)
        updateURL(newQuote.id)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleAuthorChange = (newAuthor: string) => {
    setAuthorFilter(newAuthor)
    setSearchQuery("")
    setSearchResults(null)
    setIsAnimating(true)
    setTimeout(() => {
      const newQuote = getRandomQuote(newAuthor)
      setCurrentQuote(newQuote)
      updateURL(newQuote.id)
      setIsAnimating(false)
    }, 200)
  }

  const updateURL = (quoteId: number) => {
    const params = new URLSearchParams()
    params.set("quote", quoteId.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleResetFilters = () => {
    setAuthorFilter("All")
    setSearchQuery("")
    setSearchResults(null)
  }

  if (!currentQuote) {
    return null
  }

  const shouldShowNoFavoritesMessage = favoritesOnly && favorites.length === 0
  const favoritesByAuthor =
    authorFilter === "All" ? favorites : favorites.filter((id) => getQuoteById(id)?.author === authorFilter)
  const shouldShowNoAuthorFavorites =
    favoritesOnly && favorites.length > 0 && favoritesByAuthor.filter(Boolean).length === 0
  const shouldShowNoSearchMessage = searchResults !== null && searchResults.length === 0
  const displayAuthor = authorFilter === "All" ? "All authors" : authorFilter

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl space-y-12">
        <QuoteHeader
          author={authorFilter}
          onAuthorChange={handleAuthorChange}
          favoritesOnly={favoritesOnly}
          onToggleFavoritesOnly={handleToggleFavoritesOnly}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onResetFilters={handleResetFilters}
          favoriteCount={favorites.length}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {shouldShowNoSearchMessage && (
          <p className="text-center text-sm text-[#6b4a12]">No quotes found for “{searchQuery}”.</p>
        )}
        {shouldShowNoAuthorFavorites && (
          <p className="text-center text-sm text-[#6b4a12]">
            No favorites for {displayAuthor}. Try turning off Favorites or choosing another author.
          </p>
        )}

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

        <footer className="text-center text-sm text-[#4a3821] pt-8">
          <p> 2025. Crafted by convoluted-m</p>
        </footer>
      </div>
    </main>
  )
}
