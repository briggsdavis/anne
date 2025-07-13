# Anne Silver - Ethiopian Jewelry Business

A modern Next.js web application showcasing authentic Ethiopian jewelry craftsmanship by Anne Silver. Built with Next.js 15, TypeScript, and Supabase for a complete jewelry gallery and admin management system.

## Features

- **Public Gallery**: Browse jewelry collections by category (rings, necklaces, earrings, etc.)
- **Individual Product Pages**: Detailed views with multiple images and specifications
- **Admin Dashboard**: Secure admin interface for managing jewelry inventory
- **Authentication**: Protected admin routes with Supabase Auth
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Management**: Optimized image handling with Next.js Image component
- **Form Validation**: Comprehensive input validation with Zod schemas
- **Security**: XSS protection and input sanitization

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Authentication**: Supabase Auth with SSR support
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Custom components with Framer Motion animations
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Security**: DOMPurify for XSS protection

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anne
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**

   Create the following tables in your Supabase project:

   ```sql
   -- Jewelry pieces table
   CREATE TABLE jewelry_pieces (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     category TEXT NOT NULL,
     materials TEXT[] DEFAULT '{}',
     is_sold BOOLEAN DEFAULT FALSE,
     is_featured BOOLEAN DEFAULT FALSE,
     admin_notes TEXT,
     gender TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Jewelry images table
   CREATE TABLE jewelry_images (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     jewelry_piece_id UUID REFERENCES jewelry_pieces(id) ON DELETE CASCADE,
     image_url TEXT NOT NULL,
     alt_text TEXT NOT NULL,
     is_primary BOOLEAN DEFAULT FALSE,
     display_order INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Ring sizes table (for rings category only)
   CREATE TABLE ring_sizes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     jewelry_piece_id UUID REFERENCES jewelry_pieces(id) ON DELETE CASCADE,
     size DECIMAL(3,1) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Configure Supabase Storage**

   Create a storage bucket named `jewelry-images` for image uploads.

6. **Start the development server**

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build production version
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and authentication
│   ├── api/               # API routes
│   ├── gallery/           # Public gallery pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── gallery/           # Gallery and product components
│   ├── home/              # Homepage components
│   ├── layout/            # Header, footer, navigation
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── supabase-client.ts # Browser Supabase client
│   ├── supabase-server.ts # Server Supabase client
│   ├── jewelry.ts         # Jewelry data utilities
│   └── env.ts             # Environment validation
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── styles/                # Global styles
```

## Database Schema

### Jewelry Pieces

- **id**: Unique identifier
- **title**: Jewelry piece name
- **description**: Detailed description
- **price**: Price in USD
- **category**: Type (rings, necklaces, earrings, etc.)
- **materials**: Array of materials used
- **is_sold**: Availability status
- **is_featured**: Featured on homepage
- **admin_notes**: Internal notes
- **gender**: Target gender (optional)

### Jewelry Images

- **jewelry_piece_id**: Reference to jewelry piece
- **image_url**: Supabase Storage URL
- **alt_text**: Accessibility description
- **is_primary**: Primary display image
- **display_order**: Image ordering

### Ring Sizes

- **jewelry_piece_id**: Reference to jewelry piece (rings only)
- **size**: US ring size (supports half sizes like 6.5)
- **created_at**: Timestamp

## Authentication & Admin Access

The application uses Supabase Auth for secure admin access:

1. **Admin Login**: `/admin/login`
2. **Protected Routes**: All `/admin/*` routes require authentication
3. **Route Protection**: `AdminGuard` component handles authentication checks
4. **Session Management**: Automatic session refresh and state management

## Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **Environment Validation**: Schema-based validation for environment variables
- **Authentication**: Secure admin routes with Supabase Auth
- **Error Boundaries**: Comprehensive error handling throughout the app
- **CSRF Protection**: Built-in Next.js CSRF protection

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   npx vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Configure domains** for image optimization in `next.config.ts`

### Other Platforms

The application can be deployed on any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- **Code Style**: Follow ESLint configuration
- **Type Safety**: Use TypeScript strict mode
- **Components**: Create reusable, well-documented components
- **Security**: Sanitize all user inputs
- **Performance**: Optimize images and use Next.js best practices

## Environment Variables

| Variable                        | Description                          | Required |
| ------------------------------- | ------------------------------------ | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                 | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key               | Yes      |
| `NODE_ENV`                      | Environment (development/production) | Auto-set |

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is private and proprietary to Anne Silver.

---

**Built with ❤️ for authentic Ethiopian jewelry craftsmanship**
