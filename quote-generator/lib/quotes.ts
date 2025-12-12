export interface Quote {
  id: number
  text: string
  author: string
  category: string
  tags: string[]
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "The price of our vitality is the sum of all our fears",
    author: "David Whyte",
    category: "Wisdom",
    tags: ["vitality", "fear", "courage", "life"],
  },
  {
    id: 2,
    text: "Start close in, don't take the second step or the third, start with the first thing close in, the step you don't want to take.",
    author: "David Whyte",
    category: "Wisdom",
    tags: ["journey", "beginning", "courage", "presence"],
  },
  {
    id: 3,
    text: "You must learn one thing.\nThe world was made to be free in.\nGive up all the other worlds\nExcept the one in which you belong.",
    author: "David Whyte",
    category: "Wisdom",
    tags: ["freedom", "belonging", "wisdom", "life"],
  },
  {
    id: 4,
    text: "Anything or anyone that does not bring you alive is too small for you.",
    author: "David Whyte",
    category: "Wisdom",
    tags: ["alive", "growth", "authenticity", "courage"],
  },
  {
    id: 5,
    text: "What you seek is seeking you.",
    author: "Rumi",
    category: "Wisdom",
    tags: ["seeking", "purpose", "wisdom", "spirituality"],
  },
  {
    id: 6,
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    category: "Wisdom",
    tags: ["healing", "light", "growth", "wisdom", "spirituality"],
  },
  {
    "id": 7,
    "text": "All know that the drop merges into the ocean, but few know that the ocean merges into the drop.",
    "author": "Kabir",
    "category": "Wisdom",
    "tags": ["unity", "nonduality", "spirituality", "paradox"]
  }
]


export const categories = ["All", ...Array.from(new Set(quotes.map((q) => q.category)))]

export function getQuoteById(id: number): Quote | undefined {
  return quotes.find((q) => q.id === id)
}

export function getRandomQuote(category?: string, excludeId?: number): Quote {
  const filtered =
    category && category !== "All"
      ? quotes.filter((q) => q.category === category && q.id !== excludeId)
      : quotes.filter((q) => q.id !== excludeId)

  const pool = filtered.length > 0 ? filtered : quotes
  return pool[Math.floor(Math.random() * pool.length)]
}

export function searchQuotes(query: string): Quote[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return quotes.filter(
    (q) => q.author.toLowerCase().includes(lowerQuery) || q.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}
