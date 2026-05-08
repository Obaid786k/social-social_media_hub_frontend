import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import PostCard from "../common/PostCard"
import SearchBar from "../common/SearchBar"
import { socialService } from "../../services/socialService"
import { useAuth } from "../../hooks/useAuth"

export default function InstagramPage() {
  const [profileUser, setProfileUser] = useState(null)
  const [profilePosts, setProfilePosts] = useState([])
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchOccurred, setSearchOccurred] = useState(false)
  const { isLoggedIn } = useAuth()

  const handleSearch = async (query) => {
    setSearchOccurred(true)
    if (query.trim()) {
      setLoading(true)
      const users = await socialService.instagram.searchUsers(query)
      setLoading(false)

      const matchedUser = users?.length ? users[0] : null
      setProfileUser(matchedUser)
      setShowAllPosts(false)

      if (matchedUser) {
        const userPosts = await socialService.instagram.getPostsByUser(matchedUser.id)
        setProfilePosts(userPosts.slice(0, 3))
      } else {
        setProfilePosts([])
      }
    } else {
      setProfileUser(null)
      setProfilePosts([])
      setShowAllPosts(false)
    }
  }

  const handleViewAllPosts = async () => {
    if (!profileUser) return
    const allPosts = await socialService.instagram.getPostsByUser(profileUser.id)
    setProfilePosts(allPosts || [])
    setShowAllPosts(true)
  }

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

        <SearchBar onEnter={handleSearch} placeholder="Search Instagram username or post..." />

        {searchOccurred && !profileUser && (
          <div className="mt-8 rounded-3xl border border-red-500/20 bg-slate-900/70 p-6 text-center text-red-300">
            No Instagram profile found for that search.
          </div>
        )}

        {profileUser && (
          <div className="mt-8 rounded-3xl border border-purple-500/20 bg-slate-900/70 p-6 shadow-xl shadow-purple-500/10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={profileUser.profile?.["Profile Picture URL"] || "/woman-profile.png"}
                  alt={profileUser.profile?.["Full Name"] || "Profile"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-black text-white">{profileUser.profile?.["Full Name"]}</h2>
                    {!profileUser.profile?.["Is Verified"] && null}
                  </div>
                  <p className="text-sm text-purple-300">@{profileUser.profile?.Username}</p>
                  <p className="mt-4 max-w-2xl text-slate-300">{profileUser.profile?.Biography}</p>
                  {profileUser.profile?.["External URL"] && (
                    <a
                      href={profileUser.profile?.["External URL"]}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-cyan-300 hover:text-cyan-200"
                    >
                      {profileUser.profile?.["External URL"]}
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center md:w-80">
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-3xl font-black text-white">{profileUser.profile?.["Media Count"] ?? 0}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-purple-400">Media</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-3xl font-black text-white">{(profileUser.profile?.["Follower Count"] ?? 0).toLocaleString()}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-purple-400">Followers</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-3xl font-black text-white">{(profileUser.profile?.["Following Count"] ?? 0).toLocaleString()}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-purple-400">Following</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-purple-300">
                {showAllPosts ? `Showing all posts from @${profileUser.profile?.Username}` : `Showing ${profilePosts.length} preview post${profilePosts.length === 1 ? "" : "s"}`}
              </p>
              <button
                onClick={handleViewAllPosts}
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                {showAllPosts ? "Showing all posts" : "View all posts"}
              </button>
            </div>
          </div>
        )}

        {profileUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {profilePosts.map((post) => (
              <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        )}

        {searchOccurred && !profileUser && (
          <div className="mt-8 rounded-3xl border border-red-500/20 bg-slate-900/70 p-6 text-center text-red-300">
            No Instagram profile found for that search.
          </div>
        )}

        {!searchOccurred && (
          <div className="mt-8 rounded-3xl border border-purple-500/20 bg-slate-900/70 p-8 text-center text-slate-200">
            <p className="text-lg font-bold">Search by Instagram username</p>
            <p className="mt-2 text-sm text-purple-300">Type a username and press Enter to show profile details.</p>
          </div>
        )}
      </div>
    </div>
  )
}
