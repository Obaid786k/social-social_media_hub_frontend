import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email")
            return
        }

        login(email, password)
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transition-all transform hover:scale-105 mb-8 w-fit group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>

                {/* Form Container */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20">
                    <h1 className="text-3xl font-black mb-2 bg-linear-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-purple-300 mb-8 font-medium">Log in to your SocialHub account</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-purple-300 font-bold mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-purple-300 font-bold mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-purple-400 hover:text-cyan-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-linear-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-black transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-purple-300">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
