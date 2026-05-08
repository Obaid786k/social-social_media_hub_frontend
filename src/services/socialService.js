import { apiCall, API_ENABLED } from "./api"
import { instagramPosts, instagramUsers, twitterUsers, twitterPosts } from "./dummy-data"

// Unified service for all social platform operations
export const socialService = {
  // ===== INSTAGRAM =====
  instagram: {
    getPosts: async (limit = 12, offset = 0) => {
      if (API_ENABLED) {
        const data = await apiCall(`/instagram/posts?limit=${limit}&offset=${offset}`)
        if (data) return data
      }
      return instagramPosts.slice(offset, offset + limit)
    },

    getUsers: async () => {
      if (API_ENABLED) {
        const data = await apiCall(`/instagram/users`)
        if (data) return data
      }
      return instagramUsers
    },

    searchUsers: async (query) => {
      if (API_ENABLED) {
        const data = await apiCall(`/instagram/users/search?q=${query}`)
        if (data) return data
      }
      return instagramUsers.filter((user) => {
        const profile = user.profile || {}
        return (
          profile.Username?.toLowerCase().includes(query.toLowerCase()) ||
          profile["Full Name"]?.toLowerCase().includes(query.toLowerCase()) ||
          profile.Biography?.toLowerCase().includes(query.toLowerCase())
        )
      })
    },

    getPostsByUser: async (userId) => {
      if (API_ENABLED) {
        const data = await apiCall(`/instagram/posts?userId=${userId}`)
        if (data) return data
      }
      return instagramPosts.filter((post) => post.author?.id === userId)
    },

    searchPosts: async (query) => {
      if (API_ENABLED) {
        const data = await apiCall(`/instagram/search?q=${query}`)
        if (data) return data
      }
      return instagramPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.author.name.toLowerCase().includes(query.toLowerCase()) ||
          post.author.username.toLowerCase().includes(query.toLowerCase()),
      )
    },
  },

  // ===== TWITTER =====
  twitter: {
    getPosts: async (limit = 12, offset = 0) => {
      if (API_ENABLED) {
        const data = await apiCall(`/twitter/posts?limit=${limit}&offset=${offset}`)
        if (data) return data
      }
      return twitterPosts.slice(offset, offset + limit)
    },

    getUsers: async () => {
      if (API_ENABLED) {
        const data = await apiCall(`/twitter/users`)
        if (data) return data
      }
      return twitterUsers
    },

    searchPosts: async (query) => {
      if (API_ENABLED) {
        const data = await apiCall(`/twitter/search?q=${query}`)
        if (data) return data
      }
      return twitterPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.author.name.toLowerCase().includes(query.toLowerCase()) ||
          post.author.username.toLowerCase().includes(query.toLowerCase()),
      )
    },
  },

  // ===== GLOBAL SEARCH =====
  search: {
    globalSearch: async (query) => {
      if (API_ENABLED) {
        const data = await apiCall(`/search/global?q=${query}`)
        if (data) return data
      }

      // Combine all users from all platforms
      const allUsers = [
        ...instagramUsers.map((u) => ({ ...u, platform: "instagram" })),
        ...twitterUsers.map((u) => ({ ...u, platform: "twitter" })),
      ]

      // Remove duplicates by username
      const uniqueUsers = Array.from(new Map(allUsers.map((item) => [item.username, item])).values())

      // Combine all posts from all platforms
      const allPosts = [
        ...instagramPosts.map((p) => ({ ...p, platform: "instagram" })),
        ...twitterPosts.map((p) => ({ ...p, platform: "twitter" })),
      ]

      // Filter users
      const filteredUsers = uniqueUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.name.toLowerCase().includes(query.toLowerCase()),
      )

      // Filter posts
      const filteredPosts = allPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.author.name.toLowerCase().includes(query.toLowerCase()) ||
          post.author.username.toLowerCase().includes(query.toLowerCase()),
      )

      return { users: filteredUsers, posts: filteredPosts }
    },
  },
}
