# Development Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Development Setup](#development-setup)
3. [Code Standards](#code-standards)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [API Development](#api-development)
7. [Database Schema](#database-schema)
8. [Authentication Flow](#authentication-flow)
9. [Game Integration](#game-integration)
10. [Payment Integration](#payment-integration)
11. [Performance Optimization](#performance-optimization)
12. [Security Best Practices](#security-best-practices)
13. [Testing Strategy](#testing-strategy)
14. [Deployment Process](#deployment-process)

## Architecture Overview

### Technology Stack
```
Frontend:
- Next.js 14 (App Router)
- TypeScript 5.x
- Tailwind CSS 3.x
- Radix UI Components
- React Hook Form
- Zod Validation

Backend:
- Next.js API Routes
- Prisma ORM (ready for integration)
- PostgreSQL (recommended)
- Redis (for caching)
- WebSocket (for real-time features)

Infrastructure:
- Vercel/AWS/Docker
- Cloudflare CDN
- GitHub Actions CI/CD
```

### Project Structure
```
casino-ui/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Auth group routes
│   ├── (marketing)/       # Marketing pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── casino/            # Casino section
│   └── sport/             # Sports betting
├── components/
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── games/             # Game components
│   └── forms/             # Form components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
├── services/              # API service layers
├── types/                 # TypeScript definitions
└── public/                # Static assets
```

## Development Setup

### Environment Variables
```env
# Application
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/casino_db
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=30d

# Payment Integration
NOWPAYMENTS_API_KEY=your-api-key
NOWPAYMENTS_IPN_SECRET=your-ipn-secret
NOWPAYMENTS_SANDBOX=true

# Game Providers
PRAGMATIC_API_KEY=your-api-key
EVOLUTION_API_KEY=your-api-key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXXX
MIXPANEL_TOKEN=your-mixpanel-token

# Security
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

### Database Setup
```bash
# Install PostgreSQL
# Create database
createdb casino_db

# Run migrations (when Prisma is set up)
npx prisma migrate dev

# Seed database
npm run db:seed
```

## Code Standards

### TypeScript Guidelines
```typescript
// Use explicit types for function parameters and return values
function calculatePayout(bet: number, odds: number): number {
  return bet * odds;
}

// Use interfaces for object shapes
interface User {
  id: string;
  email: string;
  balance: number;
  status: 'active' | 'suspended' | 'banned';
}

// Use enums for constants
enum GameStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}
```

### Component Guidelines
```tsx
// Use function components with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={cn(
        'rounded-md font-semibold transition-colors',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `GameCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Types: `PascalCase.types.ts` (e.g., `User.types.ts`)
- Hooks: `useCamelCase.ts` (e.g., `useAuth.ts`)
- API Routes: `kebab-case/route.ts` (e.g., `user-profile/route.ts`)

## Component Development

### Creating New Components
1. Create component file in appropriate directory
2. Define TypeScript interface for props
3. Implement component with proper error boundaries
4. Add unit tests
5. Document with JSDoc comments
6. Export from index file

### Component Template
```tsx
// filepath: components/games/SlotMachine.tsx
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SlotMachineProps {
  gameId: string;
  onWin?: (amount: number) => void;
  className?: string;
}

/**
 * SlotMachine component for casino games
 * @param {string} gameId - Unique game identifier
 * @param {Function} onWin - Callback when player wins
 * @param {string} className - Additional CSS classes
 */
export const SlotMachine: React.FC<SlotMachineProps> = ({
  gameId,
  onWin,
  className
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number[]>([0, 0, 0]);

  const spin = async () => {
    setIsSpinning(true);
    try {
      const response = await fetch('/api/games/slot/spin', {
        method: 'POST',
        body: JSON.stringify({ gameId })
      });
      const data = await response.json();
      setResult(data.result);
      if (data.win > 0) {
        onWin?.(data.win);
      }
    } catch (error) {
      console.error('Spin failed:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className={cn('slot-machine', className)}>
      {/* Component implementation */}
    </div>
  );
};
```

## State Management

### Context Structure
```tsx
// filepath: contexts/GameContext.tsx
interface GameState {
  activeGames: Game[];
  balance: number;
  currentGame: Game | null;
  isPlaying: boolean;
}

interface GameContextValue extends GameState {
  startGame: (gameId: string) => Promise<void>;
  endGame: () => void;
  placeBet: (amount: number) => Promise<BetResult>;
  updateBalance: (amount: number) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Implementation
};
```

### Global State Guidelines
- Use Context API for cross-component state
- Use local state for component-specific data
- Consider Zustand for complex state management
- Implement proper TypeScript types for all state

## API Development

### API Route Structure
```typescript
// filepath: app/api/games/[gameId]/play/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { validateRequest } from '@/lib/validation';
import { GameService } from '@/services/GameService';

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    // Authentication
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validation
    const body = await request.json();
    const validatedData = validateRequest(PlayGameSchema, body);

    // Business logic
    const gameService = new GameService();
    const result = await gameService.play(
      params.gameId,
      user.id,
      validatedData
    );

    // Response
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    return handleApiError(error);
  }
}
```

### Error Handling
```typescript
// filepath: lib/api/errors.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  
  console.error('Unexpected error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## Database Schema

### Prisma Schema (to be implemented)
```prisma
// filepath: prisma/schema.prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  username      String   @unique
  passwordHash  String
  balance       Decimal  @default(0)
  status        UserStatus @default(ACTIVE)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  profile       Profile?
  transactions  Transaction[]
  bets          Bet[]
  sessions      Session[]
}

model Game {
  id            String   @id @default(cuid())
  title         String
  slug          String   @unique
  provider      String
  type          GameType
  rtp           Decimal
  minBet        Decimal
  maxBet        Decimal
  status        GameStatus @default(ACTIVE)
  
  rounds        GameRound[]
}

model Transaction {
  id            String   @id @default(cuid())
  userId        String
  type          TransactionType
  amount        Decimal
  currency      String   @default("EUR")
  status        TransactionStatus
  reference     String?
  createdAt     DateTime @default(now())
  
  user          User     @relation(fields: [userId], references: [id])
}

model Bet {
  id            String   @id @default(cuid())
  userId        String
  gameId        String
  amount        Decimal
  odds          Decimal?
  result        BetResult?
  payout        Decimal?
  createdAt     DateTime @default(now())
  settledAt     DateTime?
  
  user          User     @relation(fields: [userId], references: [id])
  game          Game     @relation(fields: [gameId], references: [id])
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

enum GameType {
  SLOT
  TABLE
  LIVE
  SPORTS
  VIRTUAL
}

enum TransactionType {
  DEPOSIT
  WITHDRAWAL
  BET
  WIN
  BONUS
  REFUND
}
```

## Authentication Flow

### JWT Authentication Implementation
```typescript
// filepath: lib/auth/jwt.ts
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

export function generateTokens(payload: TokenPayload) {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
  
  return { accessToken, refreshToken };
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}
```

### Authentication Middleware
```typescript
// filepath: middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  
  // Protected routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const payload = verifyToken(token);
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
```

## Game Integration

### Custom Game Development Structure
```typescript
// filepath: lib/games/GameEngine.ts
export abstract class GameEngine {
  protected gameId: string;
  protected config: GameConfig;
  
  constructor(gameId: string, config: GameConfig) {
    this.gameId = gameId;
    this.config = config;
  }
  
  abstract initialize(): Promise<void>;
  abstract play(bet: number, options?: any): Promise<GameResult>;
  abstract calculatePayout(result: GameResult): number;
  abstract getRTP(): number;
  
  protected validateBet(amount: number): void {
    if (amount < this.config.minBet || amount > this.config.maxBet) {
      throw new Error('Invalid bet amount');
    }
  }
  
  protected generateProvablyFairResult(): string {
    // Implement provably fair algorithm
    return crypto.randomBytes(32).toString('hex');
  }
}
```

### Implementing Custom Games
```typescript
// filepath: lib/games/mines/MinesGame.ts
export class MinesGame extends GameEngine {
  private grid: boolean[][];
  private mineCount: number;
  
  async initialize(): Promise<void> {
    this.grid = this.generateGrid();
  }
  
  async play(bet: number, options: { positions: number[] }): Promise<GameResult> {
    this.validateBet(bet);
    
    const revealed = options.positions.map(pos => ({
      position: pos,
      isMine: this.grid[Math.floor(pos / 5)][pos % 5]
    }));
    
    const hitMine = revealed.some(r => r.isMine);
    const multiplier = hitMine ? 0 : this.calculateMultiplier(revealed.length);
    
    return {
      bet,
      multiplier,
      payout: bet * multiplier,
      result: revealed,
      seed: this.generateProvablyFairResult()
    };
  }
  
  private generateGrid(): boolean[][] {
    // Generate 5x5 grid with mines
    const grid = Array(5).fill(null).map(() => Array(5).fill(false));
    // Place mines randomly
    return grid;
  }
}
```

## Payment Integration

### NOWPayments Integration
```typescript
// filepath: lib/payments/nowpayments.ts
import { NOWPaymentsApi } from '@nowpayments/node-sdk';

export class PaymentService {
  private client: NOWPaymentsApi;
  
  constructor() {
    this.client = new NOWPaymentsApi({
      apiKey: process.env.NOWPAYMENTS_API_KEY!,
      sandbox: process.env.NOWPAYMENTS_SANDBOX === 'true'
    });
  }
  
  async createDeposit(userId: string, amount: number, currency: string = 'EUR') {
    const payment = await this.client.createPayment({
      price_amount: amount,
      price_currency: currency,
      pay_currency: 'btc', // User selected crypto
      order_id: `dep_${userId}_${Date.now()}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_API_URL}/webhooks/nowpayments`
    });
    
    // Store payment info in database
    await this.storePaymentRecord(payment);
    
    return payment;
  }
  
  async handleWebhook(payload: any, signature: string) {
    // Verify webhook signature
    if (!this.verifyWebhookSignature(payload, signature)) {
      throw new Error('Invalid webhook signature');
    }
    
    // Process payment update
    await this.updatePaymentStatus(payload);
  }
}
```

## Performance Optimization

### Optimization Strategies
1. **Image Optimization**
   - Use Next.js Image component
   - Implement lazy loading
   - Use WebP format with fallbacks
   - Optimize image sizes for different devices

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting
   - Lazy load game engines

3. **Caching Strategy**
   ```typescript
   // Redis caching example
   import { redis } from '@/lib/redis';
   
   export async function getCachedGameData(gameId: string) {
     const cached = await redis.get(`game:${gameId}`);
     if (cached) return JSON.parse(cached);
     
     const data = await fetchGameData(gameId);
     await redis.setex(`game:${gameId}`, 3600, JSON.stringify(data));
     return data;
   }
   ```

4. **Database Optimization**
   - Use indexes on frequently queried fields
   - Implement connection pooling
   - Use pagination for large datasets
   - Optimize queries with proper joins

## Security Best Practices

### Security Implementation
1. **Input Validation**
   ```typescript
   import { z } from 'zod';
   
   export const BetSchema = z.object({
     gameId: z.string().uuid(),
     amount: z.number().positive().max(10000),
     currency: z.enum(['EUR', 'USD', 'GBP'])
   });
   ```

2. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   export const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100,
     message: 'Too many requests'
   });
   ```

3. **CSRF Protection**
   ```typescript
   // Implement CSRF tokens for state-changing operations
   import { generateCSRFToken, verifyCSRFToken } from '@/lib/security/csrf';
   ```

4. **SQL Injection Prevention**
   - Use Prisma ORM with parameterized queries
   - Never concatenate user input into queries
   - Validate all inputs

## Testing Strategy

### Test Structure
```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── e2e/              # End-to-end tests
└── fixtures/         # Test data
```

### Testing Examples
```typescript
// Unit test example
describe('GameEngine', () => {
  it('should calculate correct payout', () => {
    const engine = new SlotEngine();
    const result = engine.calculatePayout({
      symbols: ['7', '7', '7'],
      bet: 10
    });
    expect(result).toBe(1000);
  });
});

// Integration test example
describe('API /games/play', () => {
  it('should process bet correctly', async () => {
    const response = await request(app)
      .post('/api/games/slot-1/play')
      .send({ bet: 10 })
      .expect(200);
    
    expect(response.body).toHaveProperty('result');
    expect(response.body).toHaveProperty('payout');
  });
});
```

## Deployment Process

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] CDN configured
- [ ] Monitoring setup (Sentry, LogRocket)
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Security audit passed

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v28
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Monitoring and Analytics

### Application Monitoring
```typescript
// Sentry integration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

// Custom error tracking
export function trackError(error: Error, context?: any) {
  Sentry.captureException(error, {
    extra: context
  });
}
```

### Analytics Implementation
```typescript
// Event tracking
export function trackEvent(eventName: string, properties?: any) {
  // Google Analytics
  gtag('event', eventName, properties);
  
  // Mixpanel
  mixpanel.track(eventName, properties);
  
  // Custom analytics
  fetch('/api/analytics/track', {
    method: 'POST',
    body: JSON.stringify({ event: eventName, properties })
  });
}
```
