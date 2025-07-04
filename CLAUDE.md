# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Architecture

This is a Next.js 15 application for Anne Silver, an Ethiopian jewelry business. The app uses the App Router with TypeScript and Tailwind CSS.

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase with typed database schema
- **Styling**: Tailwind CSS 4.x
- **UI**: Framer Motion for animations, Lucide React for icons
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Supabase Auth with SSR support

### Database Schema

The app uses two main Supabase tables:

- `jewelry_pieces` - Main product data with categories, pricing, materials
- `jewelry_images` - Associated images with display order and primary image flags

### File Structure

- `src/app/` - Next.js App Router pages including admin dashboard
- `src/components/` - Organized by feature (admin, gallery, home, layout, ui)
- `src/lib/` - Supabase client setup with both browser and server clients
- `src/types/jewelry.ts` - Complete TypeScript definitions for jewelry data

### Key Features

- Public gallery with individual jewelry piece pages
- Admin dashboard for adding/managing jewelry pieces
- Authentication-protected admin routes
- Image management with primary/secondary ordering
- Form validation using Zod schemas
- Server-side rendering with Supabase SSR

### Environment Variables Required

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Authentication Flow

Uses Supabase Auth with `AdminGuard` component protecting admin routes. Server and client Supabase clients are properly configured for SSR.
