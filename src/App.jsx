import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage"
import InstagramPage from "./components/pages/InstagramPage"
import TwitterPage from "./components/pages/TwitterPage"
import SearchPage from "./components/pages/SearchPage"
import ProfilePage from "./components/pages/ProfilePage"

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
        <Route path="/twitter" element={<TwitterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  )
}
