export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/30">
              <div className="w-full h-80 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 border-2 border-white rounded-full mx-auto mb-4 animate-pulse"></div>
                  <h3 className="text-xl font-bold text-white">ABOUT HYDRA VR</h3>
                </div>
                
                <div className="absolute top-4 left-4 w-6 h-6 border border-white/50 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border border-white/50 rounded-full animate-ping delay-1000"></div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="text-primary font-semibold text-lg tracking-wider">ABOUT</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                WHY BUILD <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  WITH HYDRA?
                </span>
              </h2>
            </div>
            
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">
              Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Feugiat 
              nibh sed pulvinar proin gravida hendrerit lectus. Mi sit amet mauris commodo 
              quis imperdiet massa tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare 
              lectus sit amet est placerat in. Lectus magna fringilla urna porttitor rhoncus vitae.
            </p>

            <div className="space-y-6">
              <div className="bg-border/20 rounded-lg p-6 border border-primary/20">
                <p className="text-foreground/80 leading-relaxed">
                  Eget mi proin sed libero enim sed faucibus turpis. Nisl 
                  rhoncus mattis rhoncus urna neque viverra justo. Vivamus 
                  at augue eget arcu dictum. Ultrices gravida dictum fusce 
                  ut placerat orci. Aenean et tortor at risus viverra adipiscing at in. 
                  Mattis aliquam faucibus purus in massa. Est 
                  placerat in egestas erat imperdiet sed. Consequat semper viverra nam libero justo laoreet sit amet. Aliquam 
                  etiam erat velit scelerisque in dictum non consectetur 
                  a. Laoreet sit amet cursus sit amet. Vel eros donec ac 
                  odio tempor orci dapibus. Sem nulla pharetra diam sit 
                  amet nisl suscipit adipiscing bibendum. Leo a diam 
                  sollicitudin tempor.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300">
                LET'S GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}