'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              HYDRA
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                ABOUT
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                SERVICES
              </a>
              <a href="#technologies" className="text-foreground hover:text-primary transition-colors font-medium">
                TECHNOLOGIES
              </a>
              <a href="#process" className="text-foreground hover:text-primary transition-colors font-medium">
                HOW TO
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                CONTACT US
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300">
              JOIN HYDRA
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary">
                ABOUT
              </a>
              <a href="#services" className="block px-3 py-2 text-foreground hover:text-primary">
                SERVICES
              </a>
              <a href="#technologies" className="block px-3 py-2 text-foreground hover:text-primary">
                TECHNOLOGIES
              </a>
              <a href="#process" className="block px-3 py-2 text-foreground hover:text-primary">
                HOW TO
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary">
                CONTACT US
              </a>
              <button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-full text-white font-semibold">
                JOIN HYDRA
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}