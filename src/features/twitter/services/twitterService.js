import { apiCall, API_ENABLED } from "../../../services/api"
import { twitterPosts, twitterUsers } from "../../../services/dummy-data"

export const twitterService = {
  // Fetch Twitter posts (tweets)
  getPosts: async (limit = 12, offset = 0) => {
    if (API_ENABLED) {
      const data = await apiCall(`/twitter/posts?limit=${limit}&offset=${offset}`)
      if (data) return data
    }
    console.log("[Twitter Service] Using dummy data for tweets")
    return twitterPosts.slice(offset, offset + limit)
  },

  // Fetch Twitter users
  getUsers: async () => {
    if (API_ENABLED) {
      const data = await apiCall(`/twitter/users`)
      if (data) return data
    }
    console.log("[Twitter Service] Using dummy data for users")
    return twitterUsers
  },

  // Search Twitter posts
  searchPosts: async (query) => {
    if (API_ENABLED) {
      const data = await apiCall(`/twitter/search?q=${query}`)
      if (data) return data
    }
    console.log("[Twitter Service] Using dummy data for search")
    return twitterPosts.filter(
      (post) =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.author.name.toLowerCase().includes(query.toLowerCase()) ||
        post.author.username.toLowerCase().includes(query.toLowerCase()),
    )
  },

  // Get user profile
  getUserProfile: async (userId) => {
    if (API_ENABLED) {
      const data = await apiCall(`/twitter/users/${userId}`)
      if (data) return data
    }
    console.log("[Twitter Service] Using dummy data for user profile")
    return twitterUsers.find((user) => user.id === userId)
  },
}
