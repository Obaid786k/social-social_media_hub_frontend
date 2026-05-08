import { Search } from "lucide-react"
import { useState } from "react"

export default function SearchBar({ onSearch, onEnter, placeholder = "Search..." }) {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (typeof onSearch === "function") {
      onSearch(value)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && typeof onEnter === "function") {
      onEnter(query)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}
