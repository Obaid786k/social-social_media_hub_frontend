import { apiCall, API_ENABLED } from "../../../services/api"
import { instagramPosts, instagramUsers } from "../../../services/dummy-data"

export const instagramService = {
  // Fetch Instagram posts
  getPosts: async (limit = 12, offset = 0) => {
    if (API_ENABLED) {
      const data = await apiCall(`/instagram/posts?limit=${limit}&offset=${offset}`)
      if (data) return data
    }
    console.log("[Instagram Service] Using dummy data for posts")
    return instagramPosts.slice(offset, offset + limit)
  },

  // Fetch Instagram users
  getUsers: async () => {
    if (API_ENABLED) {
      const data = await apiCall(`/instagram/users`)
      if (data) return data
    }
    console.log("[Instagram Service] Using dummy data for users")
    return instagramUsers
  },

  // Search Instagram posts
  searchPosts: async (query) => {
    if (API_ENABLED) {
      const data = await apiCall(`/instagram/search?q=${query}`)
      if (data) return data
    }
    console.log("[Instagram Service] Using dummy data for search")
    return instagramPosts.filter(
      (post) =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.author.name.toLowerCase().includes(query.toLowerCase()) ||
        post.author.username.toLowerCase().includes(query.toLowerCase()),
    )
  },

  // Get user profile
  getUserProfile: async (userId) => {
    if (API_ENABLED) {
      const data = await apiCall(`/instagram/users/${userId}`)
      if (data) return data
    }
    console.log("[Instagram Service] Using dummy data for user profile")
    return instagramUsers.find((user) => user.id === userId)
  },
}
