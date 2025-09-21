export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-background to-primary/10 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-primary mb-4">
              HYDRA
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Building the future of virtual reality with cutting-edge technology and immersive experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">SIMULATION</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">EDUCATION</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SELF-CARE</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">OUTDOOR</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><a href="#about" className="hover:text-primary transition-colors">ABOUT</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">SERVICES</a></li>
              <li><a href="#technologies" className="hover:text-primary transition-colors">TECHNOLOGIES</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">HOW TO</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">JOIN HYDRA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">F.A.Q</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SITEMAP</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">CONDITIONS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LICENSES</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-foreground/60">
              2023 © HYDRA LANDING PAGE - BY ZINE. E. FALOUTI - ALL RIGHTS RESERVED
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-sm text-foreground/60">SOCIALIZE WITH HYDRA</span>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary text-sm">📘</span>
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary text-sm">🐦</span>
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary text-sm">📷</span>
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary text-sm">💼</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full">
              <span className="text-white font-semibold">BUILD YOUR WORLD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}