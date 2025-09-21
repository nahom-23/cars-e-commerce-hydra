'use client'

export default function BrandLogos() {
  const brands = [
    "ISUZU", "PORSCHE", "DACIA", "PEUGEOT", "DACIA", "TESLA"
  ]

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center overflow-x-auto">
          <div className="flex items-center space-x-8 lg:space-x-16 min-w-max">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <span className="text-xl lg:text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors tracking-wider whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}