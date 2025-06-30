# NEWCASINO - Modern Online Casino Platform

A cutting-edge, fully responsive online casino and sports betting platform built with Next.js 14, TypeScript, and Tailwind CSS.

![NEWCASINO Banner](./public/readme-banner.png)

## 🎰 Features

### Casino Features
- **Live Casino Games** - Real-time games with live dealers
- **Slot Games** - Extensive collection of slot games from top providers
- **Table Games** - Classic casino games (Blackjack, Roulette, Poker, etc.)
- **Virtual Games** - Virtual sports and racing games
- **Drops & Wins** - Promotional tournaments with prize pools

### Sports Betting
- **Live Betting** - Real-time odds and in-play betting
- **Pre-match Betting** - Comprehensive sports coverage
- **Bet Slip Management** - Advanced bet slip with singles and accumulators
- **My Bets History** - Complete betting history and tracking

### User Features
- **Secure Authentication** - JWT-based authentication system
- **Multi-Currency Support** - Currently supporting EUR with expansion ready
- **Responsive Design** - Seamless experience across all devices
- **Real-time Updates** - Live game results and betting odds
- **Wallet Management** - Integrated wallet system for deposits/withdrawals

### Admin Panel
- **User Management** - Monitor and manage user accounts
- **Game Management** - Add, remove, and configure games
- **Analytics Dashboard** - Real-time earnings and performance metrics
- **RTP Configuration** - Adjust game RTPs dynamically

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom Components
- **State Management:** React Context API
- **Forms:** React Hook Form + Zod Validation
- **Icons:** Lucide Icons
- **Image Optimization:** Next.js Image Component

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/casino-ui.git
cd casino-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NOWPAYMENTS_API_KEY=your_nowpayments_key
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
casino-ui/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── admin/             # Admin panel
│   ├── casino/            # Casino game pages
│   ├── sport/             # Sports betting pages
│   ├── api/               # API routes
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── games/            # Game-specific components
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎮 Game Integration

The platform supports integration with multiple game providers through iframe embedding. Current supported providers:
- Pragmatic Play
- Evolution Gaming
- RubyPlay
- SmartSoft
- HacksawGaming
- And more...

## 💳 Payment Integration

Ready for NOWPayments integration supporting:
- Cryptocurrency payments (BTC, ETH, USDT, etc.)
- Instant deposits and withdrawals
- Secure transaction processing
- Multi-currency conversion

## 🔒 Security Features

- JWT-based authentication
- HTTPS enforcement
- Input validation and sanitization
- Rate limiting on API endpoints
- Secure session management
- CSRF protection
- XSS prevention

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t newcasino .
docker run -p 3000:3000 newcasino
```

### Traditional Hosting
```bash
npm run build
npm start
```

## 📊 Performance

- Lighthouse Score: 95+ on all metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Image optimization with Next.js Image
- Code splitting and lazy loading

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@newcasino.com or join our Discord server.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible component primitives
- All game providers for their integration support
