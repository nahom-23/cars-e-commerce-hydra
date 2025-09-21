'use client'

import { useState } from 'react'
import { useLanguageStore } from '@/stores/languageStore'
import { languages } from '@/lib/i18n'

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        <span className="text-sm">{languages[currentLanguage as keyof typeof languages]}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[120px]">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                currentLanguage === code ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}