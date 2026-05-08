import { Heart, MessageCircle, Share2, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function PostCard({ post, isLoggedIn }) {
  return (
    <div className="bg-card rounded-lg border border-border hover:border-accent transition-all overflow-hidden group">
      {post.image && (
        <div className="relative overflow-hidden bg-black h-96">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.content}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-6">
              <div className="text-center">
                <Heart className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white font-black">{post.likes}</span>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white font-black">{post.comments}</span>
              </div>
              <div className="text-center">
                <Share2 className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white font-black">{post.shares}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <Link
          to={`/profile/${post.author.id}`}
          className="flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity"
        >
          <img
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-foreground">{post.author.name}</span>
              {post.author.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
            </div>
            <span className="text-xs text-muted-foreground">@{post.author.username}</span>
          </div>
        </Link>

        <p className="text-foreground text-sm mb-4">{post.content}</p>

        {isLoggedIn && (
          <div className="flex gap-4 pt-3 border-t border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">{post.shares}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
