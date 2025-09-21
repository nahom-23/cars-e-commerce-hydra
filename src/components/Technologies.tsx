export default function Technologies() {
  const technologies = [
    { name: "Unreal Engine", logo: "🎮" },
    { name: "Unity", logo: "🔷" },
    { name: "Oculus", logo: "👓" },
    { name: "3D Blender", logo: "🎨" },
    { name: "Autodesk", logo: "📐" },
    { name: "Maya", logo: "🎭" },
    { name: "PIX4D", logo: "📷" },
    { name: "Agisoft", logo: "🗺️" }
  ]

  return (
    <section id="technologies" className="py-20 bg-gradient-to-br from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TECHNOLOGIES & HARDWARE
            </span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            USED BY HYDRA VR.
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-border/20 to-primary/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center aspect-square"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {tech.logo}
              </div>
              <span className="text-xs font-semibold text-center text-foreground/80 group-hover:text-primary transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-12 border border-primary/30 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Cutting-Edge VR Technology
              </h3>
              <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                Experience the future with our state-of-the-art virtual reality hardware and software solutions. 
                From high-end VR headsets to immersive haptic feedback systems, we use only the best technology 
                to create unforgettable experiences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground/80">High-resolution displays (4K per eye)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground/80">360° spatial tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground/80">Haptic feedback integration</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-2 border-white/50 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 border border-white/70 rounded-full animate-spin-slow">
                      <div className="w-8 h-8 bg-white/80 rounded-full mt-4 ml-4"></div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-6 h-6 border border-white/60 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-4 h-4 border border-white/60 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}