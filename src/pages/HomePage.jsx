import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Instagram, MessageSquare, Video, Users, Zap, Globe } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function HomePage() {
    const { isLoggedIn } = useAuth()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const platforms = [
        {
            id: "instagram",
            name: "Instagram",
            icon: Instagram,
            color: "from-pink-500 to-orange-500",
            description: "Photo & video sharing",
            path: "/instagram",
            status: "active",
        },
        {
            id: "twitter",
            name: "Twitter",
            icon: MessageSquare,
            color: "from-blue-400 to-blue-600",
            description: "Tweets & thoughts",
            path: "/twitter",
            status: "active",
        },
        {
            id: "youtube",
            name: "YouTube",
            icon: Video,
            color: "from-red-500 to-red-600",
            description: "Video platform",
            path: "#",
            status: "coming",
        },
        {
            id: "linkedin",
            name: "LinkedIn",
            icon: Users,
            color: "from-blue-600 to-blue-700",
            description: "Professional network",
            path: "#",
            status: "coming",
        },
        {
            id: "tiktok",
            name: "TikTok",
            icon: Zap,
            color: "from-black to-gray-800",
            description: "Short videos",
            path: "#",
            status: "coming",
        },
        {
            id: "reddit",
            name: "Reddit",
            icon: Globe,
            color: "from-orange-500 to-orange-600",
            description: "Community discussions",
            path: "#",
            status: "coming",
        },
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                            Welcome to SocialHub
                        </span>
                    </h1>
                    <p className="text-xl text-purple-300 font-semibold">
                        Explore and discover content across your favorite social media platforms
                    </p>
                </div>

                {/* Platforms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {platforms.map((platform, index) => {
                        const Icon = platform.icon
                        const isActive = platform.status === "active"

                        return (
                            <Link
                                key={platform.id}
                                to={isActive ? platform.path : "#"}
                                className={`group transition-all duration-300 ${isActive ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="relative overflow-hidden rounded-2xl h-64 bg-linear-to-br from-slate-900 to-slate-800 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group-hover:scale-105">
                                    {/* Background linear */}
                                    <div
                                        className={`absolute inset-0 bg-linear-to-br ${platform.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                                    />

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-between p-6">
                                        <div className="flex items-start justify-between">
                                            <div className={`p-3 rounded-xl bg-linear-to-br ${platform.color} shadow-lg`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            {platform.status === "coming" && (
                                                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                                                {platform.name}
                                            </h2>
                                            <p className="text-purple-300 font-medium">{platform.description}</p>
                                        </div>

                                        {isActive && (
                                            <div className="flex items-center gap-2 text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                Explore
                                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Call to Action */}
                <div className="text-center py-8 border-t border-purple-500/20">
                    {isLoggedIn ? (
                        <p className="text-purple-300 font-semibold text-lg">Start exploring content and connect with creators</p>
                    ) : (
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link
                                to="/login"
                                className="px-8 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-8 py-3 rounded-lg border-2 border-purple-500 text-purple-300 font-bold hover:bg-purple-500/10 transition-all"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
