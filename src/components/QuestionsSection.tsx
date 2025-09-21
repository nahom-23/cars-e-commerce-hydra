'use client'

import FAQ from './FAQ'
import { ExternalLink } from 'lucide-react'

export default function QuestionsSection() {
  const faqItems = [
    {
      question: "How Do I Know If a Part Fits My Vehicle?",
      answer: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the accordion-body, though the transition does limit overflow."
    },
    {
      question: "Can I Save Multiple Vehicles in My Garage?",
      answer: "Yes, you can save multiple vehicles in your garage. Our system allows you to store vehicle information for easy part lookup and compatibility checking across all your vehicles."
    },
    {
      question: "What Does \"Ignavo\" Mean in Auto Parts?",
      answer: "Ignavo refers to a specific type of automotive component or system. This term is commonly used in technical documentation and parts catalogs to identify particular specifications or categories."
    },
    {
      question: "Are Aftermarket Parts Reliable?",
      answer: "Aftermarket parts can be highly reliable when sourced from reputable manufacturers. Many aftermarket parts meet or exceed OEM specifications and often come with warranties comparable to original parts."
    },
    {
      question: "Can I Return a Part If It Doesn't Fit?",
      answer: "Yes, we offer a comprehensive return policy for parts that don't fit. Items must be in original condition and packaging, and returns are typically accepted within 30 days of purchase."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Questions you may<br />
                be curious about.
              </h2>
              
              <div className="space-y-6 mb-8">
                
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="font-semibold text-gray-900 mb-2">🔧 Expert Support</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our automotive experts are available to help you find the right parts for your vehicle.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ Quality Guarantee</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    All parts come with manufacturer warranty and our quality assurance guarantee.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-gray-700 mb-4">
                Do you need more information?
              </p>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                More Information
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            
            {/* Enhanced Decorative Elements */}
            <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10">
              <div className="w-full h-full bg-gradient-to-tl from-blue-600 to-purple-600 rounded-full transform translate-x-12 translate-y-12"></div>
            </div>
            
            {/* Automotive themed decorative elements */}
            <div className="absolute right-6 bottom-6 w-32 h-32 opacity-20">
              <div className="w-full h-full bg-gradient-to-t from-gray-400 to-gray-300 rounded-lg transform rotate-12"></div>
            </div>
            <div className="absolute right-12 bottom-16 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="absolute right-8 bottom-12 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute right-16 bottom-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
          </div>
          
          {/* Right Column - FAQ */}
          <div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  )
}