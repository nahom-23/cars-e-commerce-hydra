'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-12">
              <span className="text-primary font-semibold text-lg tracking-wider">JOIN HYDRA</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Let's Build Your VR Experience
                </span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-border/20 border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-foreground/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-border/20 border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-foreground/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-border/20 border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-foreground/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-border/20 border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-foreground/50"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-border/20 border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-foreground/50"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Tell Us Something..."
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-border/20 border border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-foreground/50 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                SEND TO HYDRA
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-border/20 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary">Pay Us a Visit</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-1">
                    <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground/80">
                      Union St, Seattle, WA 98101, United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-border/20 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary">Give Us a Call</h3>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6">
                  <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <p className="text-foreground/80">(110) 1111-1010</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-border/20 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary">Send Us a Message</h3>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6">
                  <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <p className="text-foreground/80">Contact@HydraVTech.com</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 border border-primary/30">
              <h3 className="text-xl font-bold mb-4 text-center">SOCIALIZE WITH HYDRA</h3>
              <div className="flex justify-center space-x-6">
                <button className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary">📘</span>
                </button>
                <button className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary">🐦</span>
                </button>
                <button className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary">📷</span>
                </button>
                <button className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <span className="text-primary">💼</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}