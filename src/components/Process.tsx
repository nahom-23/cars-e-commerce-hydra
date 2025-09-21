export default function Process() {
  const steps = [
    {
      number: "01",
      title: "3D Conception & Design",
      description: "We start by understanding your vision and creating detailed 3D concepts and designs that bring your ideas to life."
    },
    {
      number: "02", 
      title: "Interaction Design",
      description: "Our team designs intuitive and engaging interactions that make your VR experience feel natural and immersive."
    },
    {
      number: "03",
      title: "VR World User Testing", 
      description: "We thoroughly test your VR world with real users to ensure optimal performance and user experience."
    },
    {
      number: "04",
      title: "Hydra VR Deploy",
      description: "Finally, we deploy your VR experience using our cutting-edge Hydra VR platform for maximum impact."
    }
  ]

  return (
    <section id="process" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-lg tracking-wider">HOW WE BUILD</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WITH HYDRA VR?
            </span>
          </h2>
          <p className="text-foreground/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Feugiat 
            nibh sed pulvinar proin gravida hendrerit lectus. Mi sit amet mauris commodo 
            quis imperdiet massa tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare 
            lectus sit amet est placerat in. Lectus magna fringilla urna porttitor rhoncus vitae.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-border/20 to-primary/10 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    {step.title}
                  </h3>
                  
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-secondary border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-12 border border-primary/30 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your VR Journey?
            </h3>
            <p className="text-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's work together to create an immersive virtual reality experience that will captivate your audience and bring your vision to life.
            </p>
            <button className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
              START YOUR PROJECT
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}