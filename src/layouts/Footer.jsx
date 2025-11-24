import { Link } from "react-router-dom"
import { Github, Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-sm font-black text-slate-950">S</span>
              </div>
              <span className="text-lg font-black bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                SocialHub
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Explore all social media in one unified space. Your gateway to connected social experiences.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/instagram"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  to="/twitter"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4 text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </span>
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 py-4 mb-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">© {currentYear} SocialHub. All rights reserved.</p>

          {/* Social Icons with Lucide - Using proper lucide-react icons */}
          <div className="flex gap-2">
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-cyan-500/20 rounded-lg text-slate-400 hover:text-cyan-400 transition-all duration-300 group border border-slate-700 hover:border-cyan-500/50"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-cyan-500/20 rounded-lg text-slate-400 hover:text-cyan-400 transition-all duration-300 group border border-slate-700 hover:border-cyan-500/50"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-cyan-500/20 rounded-lg text-slate-400 hover:text-cyan-400 transition-all duration-300 group border border-slate-700 hover:border-cyan-500/50"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-cyan-500/20 rounded-lg text-slate-400 hover:text-cyan-400 transition-all duration-300 group border border-slate-700 hover:border-cyan-500/50"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-cyan-500/20 rounded-lg text-slate-400 hover:text-cyan-400 transition-all duration-300 group border border-slate-700 hover:border-cyan-500/50"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
