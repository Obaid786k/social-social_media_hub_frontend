import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./layouts/Navbar"
import Footer from "./layouts/Footer"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import InstagramPage from "./features/instagram/pages/InstagramPage"
import TwitterPage from "./features/twitter/pages/TwitterPage"
import SearchPage from "./pages/SearchPage"
import ProfilePage from "./features/dashboard/pages/ProfilePage"

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
