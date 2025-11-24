"use client"

import { useState, useEffect } from "react"

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    setIsLoggedIn(!!userData)
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
  }

  return { isLoggedIn, user, logout }
}
