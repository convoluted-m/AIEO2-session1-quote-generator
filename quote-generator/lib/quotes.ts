export interface Quote {
  id: number
  text: string
  author: string
  tags: string[]
}

export const quotes: Quote[] = [
  // Andrea Gibson
  {
    id: 1,
    text: "I said to the sun, 'Tell me about the big bang.' The sun said, 'it hurts to become.'",
    author: "Andrea Gibson",
    tags: ["becoming", "transformation", "cosmos"],
  },
  {
    id: 2,
    text: "A doctor once told me I feel too much. I said, so does god. that's why you can see the grand canyon from the moon.",
    author: "Andrea Gibson",
    tags: ["feeling", "empathy", "vastness"],
  },
  {
    id: 3,
    text: "Remind me that the most fertile lands were built by the fires of volcanoes.",
    author: "Andrea Gibson",
    tags: ["resilience", "rebirth", "nature"],
  },
  {
    id: 4,
    text: "Commit to loving yourself completely. It's the most radical thing you will do in your lifetime.",
    author: "Andrea Gibson",
    tags: ["self-love", "commitment", "courage"],
  },

  // David Whyte
  {
    id: 5,
    text: "The price of our vitality is the sum of all our fears",
    author: "David Whyte",
    tags: ["vitality", "fear", "courage"],
  },
  {
    id: 6,
    text: "Start close in, don't take the second step or the third, start with the first thing close in, the step you don't want to take.",
    author: "David Whyte",
    tags: ["journey", "beginnings", "courage"],
  },
  {
    id: 7,
    text: "You must learn one thing.\nThe world was made to be free in.\nGive up all the other worlds\nExcept the one in which you belong.",
    author: "David Whyte",
    tags: ["freedom", "belonging", "life"],
  },
  {
    id: 8,
    text: "Anything or anyone that does not bring you alive is too small for you.",
    author: "David Whyte",
    tags: ["alive", "growth", "authenticity"],
  },

  // Kabir
  {
    id: 9,
    text: "All know that the drop merges into the ocean, but few know that the ocean merges into the drop.",
    author: "Kabir",
    tags: ["unity", "nonduality", "paradox"],
  },
  {
    id: 10,
    text: "The river that flows in you also flows in me.",
    author: "Kabir",
    tags: ["unity", "connection", "flow"],
  },
  {
    id: 11,
    text: "Wherever you are is the entry point",
    author: "Kabir",
    tags: ["presence", "mindfulness", "entry"],
  },
  {
    id: 12,
    text: "I felt in need of a great pilgrimage, so I sat still for three days…",
    author: "Kabir",
    tags: ["pilgrimage", "stillness", "reflection"],
  },

  // Rumi
  {
    id: 13,
    text: "What you seek is seeking you.",
    author: "Rumi",
    tags: ["seeking", "purpose", "spirituality"],
  },
  {
    id: 14,
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    tags: ["healing", "light", "growth"],
  },
  {
    id: 15,
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    author: "Rumi",
    tags: ["love", "introspection", "barriers"],
  },
  {
    id: 16,
    text: "Stop acting so small. You are the universe in ecstatic motion.",
    author: "Rumi",
    tags: ["potential", "expansion", "self-worth"],
  },
]

export const authors = ["All", ...Array.from(new Set(quotes.map((q) => q.author)))]

export function getQuoteById(id: number): Quote | undefined {
  return quotes.find((q) => q.id === id)
}

export function getRandomQuote(author?: string, excludeId?: number): Quote {
  const filtered =
    author && author !== "All"
      ? quotes.filter((q) => q.author === author && q.id !== excludeId)
      : quotes.filter((q) => q.id !== excludeId)

  const pool = filtered.length > 0 ? filtered : quotes
  return pool[Math.floor(Math.random() * pool.length)]
}

export function searchQuotes(query: string): Quote[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return quotes.filter((q) => q.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
}
