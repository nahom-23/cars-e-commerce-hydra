export default function Introduction() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <span className="text-primary font-semibold text-lg tracking-wider">INTRODUCTION</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                TO HYDRA VR
              </h2>
            </div>
            
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">
              Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Feugiat 
              nibh sed pulvinar proin gravida hendrerit lectus. Mi sit amet mauris commodo 
              quis imperdiet massa tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare 
              lectus sit amet est placerat in. Lectus magna fringilla urna porttitor rhoncus vitae.
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300">
                LET'S GET IN TOUCH
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-full h-64 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl mb-6 flex items-center justify-center">
                  <div className="w-20 h-20 border border-primary rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Experience VR</h3>
                <p className="text-foreground/70 text-center">
                  Immerse yourself in a world of endless possibilities with our cutting-edge virtual reality technology.
                </p>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-12 h-12 border border-accent rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border border-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}