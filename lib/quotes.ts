import type { Quote } from "./types"

// Sample quotes data
const quotes: Quote[] = [
  {
    id: "1",
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    id: "2",
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    id: "3",
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    id: "4",
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  {
    id: "5",
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey",
  },
  {
    id: "6",
    text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron",
  },
  {
    id: "7",
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    id: "8",
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
  },
  {
    id: "9",
    text: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt",
  },
  {
    id: "10",
    text: "Always remember that you are absolutely unique. Just like everyone else.",
    author: "Margaret Mead",
  },
  {
    id: "11",
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson",
  },
  {
    id: "12",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
]

// Simulate API call with a delay
export const fetchRandomQuote = (): Promise<Quote> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      resolve(quotes[randomIndex])
    }, 500)
  })
}

