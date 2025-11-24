import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import PostCard from "../../../components/PostCard"
import SearchBar from "../../../components/SearchBar"
import { instagramService } from "../services/instagramService"
import { useAuth } from "../../../hooks/useAuth"

export default function InstagramPage() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const data = await instagramService.getPosts(12, 0)
      setPosts(data || [])
      setFilteredPosts(data || [])
      setLoading(false)
    }
    loadPosts()
  }, [])

  const handleSearch = async (query) => {
    if (query.trim()) {
      const results = await instagramService.searchPosts(query)
      setFilteredPosts(results || [])
    } else {
      setFilteredPosts(posts)
    }
  }

  const loadMore = async () => {
    setLoading(true)
    const newPosts = await instagramService.getPosts(12, posts.length)
    if (newPosts && newPosts.length > 0) {
      const updatedPosts = [...posts, ...newPosts]
      setPosts(updatedPosts)
      if (filteredPosts === posts) {
        setFilteredPosts(updatedPosts)
      }
      setHasMore(newPosts.length === 12)
    } else {
      setHasMore(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
        loadMore()
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasMore, loading, posts, filteredPosts])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-black transition-all transform hover:scale-105 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>
          <h1 className="text-4xl font-black text-transparent bg-linear-to-r from-pink-400 to-orange-400 bg-clip-text">
            Instagram
          </h1>
          <div className="w-20" />
        </div>

        <SearchBar onSearch={handleSearch} placeholder="Search Instagram posts..." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-black">No posts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
