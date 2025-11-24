import { apiCall, API_ENABLED } from "./api"
import { instagramUsers, instagramPosts, twitterUsers, twitterPosts } from "./dummy-data"

export const searchService = {
  // Global search across all platforms
  globalSearch: async (query) => {
    if (API_ENABLED) {
      const data = await apiCall(`/search/global?q=${query}`)
      if (data) return data
    }

    console.log("[Search Service] Using dummy data for global search")

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

    return {
      users: filteredUsers,
      posts: filteredPosts,
      total: filteredUsers.length + filteredPosts.length,
    }
  },

  // Search users
  searchUsers: async (query) => {
    if (API_ENABLED) {
      const data = await apiCall(`/search/users?q=${query}`)
      if (data) return data
    }

    console.log("[Search Service] Using dummy data for user search")

    const allUsers = [
      ...instagramUsers.map((u) => ({ ...u, platform: "instagram" })),
      ...twitterUsers.map((u) => ({ ...u, platform: "twitter" })),
    ]

    const uniqueUsers = Array.from(new Map(allUsers.map((item) => [item.username, item])).values())

    return uniqueUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()),
    )
  },

  // Search posts
  searchPosts: async (query) => {
    if (API_ENABLED) {
      const data = await apiCall(`/search/posts?q=${query}`)
      if (data) return data
    }

    console.log("[Search Service] Using dummy data for post search")

    const allPosts = [
      ...instagramPosts.map((p) => ({ ...p, platform: "instagram" })),
      ...twitterPosts.map((p) => ({ ...p, platform: "twitter" })),
    ]

    return allPosts.filter(
      (post) =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.author.name.toLowerCase().includes(query.toLowerCase()) ||
        post.author.username.toLowerCase().includes(query.toLowerCase()),
    )
  },
}
