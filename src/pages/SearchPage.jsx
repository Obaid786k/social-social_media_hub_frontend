import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Search, ImageIcon } from "lucide-react"
import { searchService } from "../services/searchService"
import { useAuth } from "../hooks/useAuth"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [searched, setSearched] = useState(false)
  const { isLoggedIn } = useAuth()

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setUsers([])
      setPosts([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearched(true)
    const results = await searchService.globalSearch(query)
    setUsers(results.users || [])
    setPosts(results.posts || [])
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    handleSearch(query)
  }

  const filteredUsers = users
  const filteredPosts = posts

  const displayUsers = activeTab === "all" || activeTab === "users"
  const displayPosts = activeTab === "all" || activeTab === "posts"

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transition-all transform hover:scale-105 mb-8 w-fit group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>

          <h1 className="text-4xl font-black text-transparent bg-linear-to-r from-cyan-400 to-pink-400 bg-clip-text mb-4">
            Global Search
          </h1>
          <p className="text-purple-300 font-medium mb-6">Search across all platforms and users</p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search users, posts, tweets..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors text-lg"
            />
          </div>
        </div>

        {/* Tabs */}
        {searched && (
          <div className="flex gap-4 mb-8 border-b border-purple-500/20">
            {["all", "users", "posts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-bold capitalize transition-all ${activeTab === tab
                    ? "text-transparent bg-linear-to-r from-cyan-400 to-pink-400 bg-clip-text border-b-2 border-cyan-400"
                    : "text-purple-300 hover:text-purple-200"
                  }`}
              >
                {tab === "all" ? "All Results" : tab}
                {tab === "all" && (
                  <span className="ml-2 text-cyan-400">({filteredUsers.length + filteredPosts.length})</span>
                )}
                {tab === "users" && <span className="ml-2 text-cyan-400">({filteredUsers.length})</span>}
                {tab === "posts" && <span className="ml-2 text-cyan-400">({filteredPosts.length})</span>}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-purple-500/30 border-t-cyan-400 rounded-full animate-spin" />
            </div>
            <p className="text-purple-300 font-semibold mt-4">Searching...</p>
          </div>
        )}

        {searched && !loading && filteredUsers.length === 0 && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-purple-500/50 mx-auto mb-4" />
            <p className="text-xl text-purple-300 font-semibold">No results found</p>
            <p className="text-purple-400 mt-2">Try searching for different keywords</p>
          </div>
        )}

        {!searched && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-purple-500/50 mx-auto mb-4" />
            <p className="text-xl text-purple-300 font-semibold">Start searching</p>
            <p className="text-purple-400 mt-2">Search for users or posts across all platforms</p>
          </div>
        )}

        {/* Users Section */}
        {displayUsers && filteredUsers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black text-white mb-6">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.id}`}
                  className="group p-4 rounded-xl bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 group-hover:border-cyan-400 transition-colors"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-sm text-purple-400">@{user.username}</p>
                      {user.verified && <p className="text-xs text-cyan-400 font-bold mt-1">Verified</p>}
                      <p className="text-xs text-purple-300 mt-2">{user.followers} followers</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts Section */}
        {displayPosts && filteredPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Posts & Tweets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative overflow-hidden rounded-xl bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 aspect-square cursor-pointer"
                >
                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {!post.image && (
                    <div className="w-full h-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <ImageIcon className="w-8 h-8 text-white/50" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <p className="text-white font-bold text-center line-clamp-3 mb-4">{post.caption}</p>
                    <div className="flex gap-4 text-sm text-purple-300">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
