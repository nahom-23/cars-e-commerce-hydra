# Auto Parts Catalog E-commerce Platform

A comprehensive e-commerce platform for auto parts catalogs, repair manuals, and diagnostic software built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Comprehensive catalog for light cars, heavy trucks, construction machinery, engines, generators, motorbikes, agricultural machinery, Chinese vehicles, and electric cars
- **Advanced Search & Filtering**: Search by make, model, year, engine type, fuel type, transmission
- **Shopping Cart**: Full cart functionality with quantity management and persistent storage
- **Multi-language Support**: Available in English, Chinese, Arabic, French, Hindi, and more
- **Responsive Design**: Mobile-first approach with optimized user experience

### User Management
- **Three User Roles**: Super Admin, Admin, and End Users with granular permissions
- **Secure Authentication**: NextAuth.js integration with credential-based login
- **User Dashboard**: Order history, downloads, wishlist management, profile settings
- **Admin Panel**: Complete product, order, and user management interface

### E-commerce Features
- **Multiple Payment Methods**: Visa, PayPal, Cryptocurrencies, Bank Transfer, Western Union
- **Instant Digital Delivery**: Immediate download links after successful payment
- **Download Management**: 30-day download link validity with backup options
- **Order Tracking**: Real-time order status updates and history
- **Wishlist**: Save products for later purchase

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Styling**: Tailwind CSS with custom component library
- **Development Tools**: ESLint, TypeScript, Git

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── catalog/           # Product catalog
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   └── api/               # API routes
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── stores/               # Zustand state management
└── prisma/               # Database schema and migrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd auto-parts-catalog
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Configure these variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/autoparts_catalog"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit** [http://localhost:3000](http://localhost:3000)

## 🎯 Key Pages

- **Homepage** (`/`) - Hero banner, product categories, featured items
- **Catalog** (`/catalog`) - Advanced product search and filtering
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Multi-step checkout process
- **Dashboard** (`/dashboard`) - User account management
- **Admin** (`/admin`) - Administrative interface
- **Contact** (`/contact`) - Customer support and inquiries

## 🌍 Multi-language Support

Supports 10 languages with comprehensive translations:
- English (default), Chinese, Arabic, French, Hindi
- Spanish, German, Italian, Portuguese, Russian

## 💳 Payment Integration

Supports multiple payment methods:
- Credit/Debit Cards (Stripe ready)
- PayPal, Cryptocurrencies
- Bank Transfer, Western Union, MoneyGram

## 🏗️ Business Model

### Product Categories
1. **Offline Parts Catalogs** - Windows apps and PDF formats
2. **Repair Manuals** - Service documentation
3. **Diagnostic Software** - Vehicle diagnostic tools

### Vehicle Coverage
- Light Cars (Toyota, Ford, Hyundai)
- Heavy Trucks (Iveco, Isuzu)
- Construction Machinery (CAT, Komatsu, Hitachi)
- Engines (Cummins, Deutz)
- Agricultural and Electric Vehicles

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server  
npm run lint         # Run ESLint
npm run type-check   # TypeScript compiler check
```

## 🚀 Deployment

### Production Setup
1. Configure production database
2. Set environment variables
3. Set up file storage for downloads
4. Configure payment processors
5. Deploy to your preferred platform

```bash
npm run build
npm start
```

## 🔐 Security Features

- Secure authentication with NextAuth.js
- Environment variable protection
- SQL injection prevention with Prisma
- CSRF protection
- Secure payment processing
- Download link expiration

## 🎯 Performance Optimizations

- Server-side rendering (SSR)
- Static site generation where applicable
- Image optimization
- Code splitting and lazy loading
- Efficient state management
- Database query optimization

## 🤝 Support

- **24/7 Customer Support** via live chat
- **Email Support**: support@autoepcrepair.com  
- **Remote Installation** via TeamViewer
- **Multi-language** customer service

## 📈 Future Enhancements

- Mobile app development
- Advanced analytics dashboard
- AI-powered product recommendations
- Bulk order management
- API for third-party integrations
- Enhanced social media integration

---

**Professional E-commerce Platform** - Built for the automotive parts and repair industry with enterprise-grade features and global scalability.
